Listings = new Meteor.Collection("listings");

Classifieds = new Meteor.Collection("classifieds");


Listings.allow({
	'insert': function(userId, doc) {           
		return true;
	},
  'remove': function (userId, doc) {
    // can only change your own documents
    return true;
  }     
});

Classifieds.allow({
	'insert': function(userId, doc) {           
		return true;
	},
  'remove': function (userId, doc) {
    // can only change your own documents
    return true;
  }     
});