if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'EMAIL_ONLY' //  One of 'USERNAME_AND_EMAIL', 'USERNAME_AND_OPTIONAL_EMAIL', 'USERNAME_ONLY', or 'EMAIL_ONLY' (default).
  });

   Meteor.subscribe("listings");
    Meteor.subscribe("classifieds");

var trimInput = function(val) {
    return val.replace(/^\s*|\s*$/g, "");
  }

  Template.admin_login.events({
    'submit #login-form': function (e,t) {
      e.preventDefault();

      var email = t.find('#login-email').value
      ,password = t.find('#login-password').value;


      var email = trimInput(email);

      Meteor.loginWithPassword(email, password, function(err){
        if (err) {
          console.log("there was an error with log in")
        } else {
          console.log("user is logged in")
        }
      });
      return false;



    }
  });


  Router.map(function() { 
        this.route('home', {path: '/'});
        this.route('jobListings', {path: '/job-listings'});
        this.route('classifieds',{path: '/classifieds'}); 
        this.route('advertise',{path: '/advertise'});
        this.route('contactUs',{path: '/contactUs'}); 
        this.route('admin',{
          path: '/admin',
          before: function() {
            if (!Meteor.user()) {
              this.render('admin_login');
              this.stop();
            }
          }
        });        
  });

  Template.addJobListing.events = {
      'submit' : function (event, tmpl) {
         event.preventDefault();
      

      var newPost = {
        employerName: $("#employerName").val(),
        positionTitle: $("#positionTitle").val(),
        contactEmail: $("#contactEmail").val(),
        applicationUrl: $("#applicationUrl").val(),
        expiration: $("#expiration").val(),
        jobDescription: $("#jobDescription").val()
      };




      $("#newJob").trigger('reset');
      Listings.insert(newPost);
      
      }
  };

  Template.addClassified.events = {
    'submit' : function (event, tmpl) {
        event.preventDefault();

        var newClassified = {
          title: $("#classifiedTitle").val(),
          information: $("#classifiedDescription").val(),
          contact: $("#classifiedContact").val(),
          expiration:$("#expiration_classified").val()
        };

        $("#newClassified").trigger('reset');

        Classifieds.insert(newClassified);

    }
  }

  Template.adminJobPosts.events = {
    'click .btnFileDelete': function() {
        if (confirm('Are you sure you want to delete this listing?'))
          Listings.remove(this._id);
      }
  }

  Template.adminClassifiedPosts.events = {
    'click .btnFileDelete': function() {
        if (confirm('Are you sure you want to remove this classified?'))
          Classifieds.remove(this._id);
      }
  }
  Template.adminJobPosts.alistings = function () {
    return Listings.find({});
  };
  Template.adminClassifiedPosts.acListings = function () {
    return Classifieds.find({});
  };

  Template.jobPosts.listings = function () {
    return Listings.find({});
  };

  Template.classifiedPosts.cListings = function () {
    return Classifieds.find({});
  };

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Meteor.users.find().count() === 0) {
      Accounts.createUser({
        password: 'ilooklikecornelwest',
        email: 'dfriedman007@gmail.com'
      
      });
    }
  });



  Meteor.publish("listings", function(){
    return Listings.find({});
  });

  Meteor.publish("classifieds", function(){
    return Classifieds.find({});
  });
}
