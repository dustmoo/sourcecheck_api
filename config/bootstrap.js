/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

/*module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};*/

module.exports.bootstrap = function (cb) {

// After we create our sources, we will store them here to associate with our organizations
var storeSources = []; 

var sources = [{host: 'advance.net'},{host: 'yahoo.com'},{host: 'tumblr.com'},{host: 'condenast.co.uk'},{host: 'www.reddit.com'},{host: 'reddit.com'},{host: 'm.bbc.co.uk'},{host: 'bbc.co.uk'}];
var organizations = [{ name: 'Reddit'}, { name: 'Yahoo'}, { name: 'Tumblr'}, { name: 'Advance Publications'}, { name: 'Condé Nast'}, { name: 'British Broadcasting Corporation'}];

// This does the actual associating.
// It takes one Organization then iterates through the array of newly created Sources, adding each one to it's join table
var associateSources = function(oneOrganization,cb){
  var thisOrganization = oneOrganization;
  var callback = cb;

//Ownership: This is a self association.
if (thisOrganization.name == "Condé Nast") {
	Organization.findOne({name:"Advance Publications"}).exec(function(error, org){
		Organization.update({id: thisOrganization.id}, {owned_by: org.id}).exec(function(){console.log("Ownership Set")});
		Organization.update({id: org.id}, {owns: thisOrganization.id}).exec(function(){console.log("Ownership Set")});
	});
}

  storeSources.forEach(function(thisSource,index){
  	switch(thisSource.host) {
		case 'advance.net':
			if (thisOrganization.name == 'Advance Publications'){
				associate(thisOrganization,thisSource);
			}
			break;
		case 'yahoo.com':
			if (thisOrganization.name == 'Yahoo'){
				associate(thisOrganization,thisSource);
			}
			break;
		case 'tumblr.com':
			if (thisOrganization.name == 'Tumblr'){
				associate(thisOrganization,thisSource);
			}
			break;
		case 'condenast.co.uk':
			if (thisOrganization.name == 'Condé Nast'){
				associate(thisOrganization,thisSource);
			}
			break;
		case 'www.reddit.com':
			if (thisOrganization.name == 'Condé Nast'){
				associate(thisOrganization,thisSource);
			}
			break;
		case 'reddit.com':
			if (thisOrganization.name == 'Condé Nast'){
				associate(thisOrganization,thisSource);
			}
			break;
		case 'm.bbc.co.uk':
			if (thisOrganization.name == 'British Broadcasting Corporation'){
				associate(thisOrganization,thisSource);
			}
			break;
		case 'bbc.co.uk':
			if (thisOrganization.name == 'British Broadcasting Corporation'){
				associate(thisOrganization,thisSource);
			}
			break;
	}
    
    if (index === storeSources.length-1)
      return callback(thisOrganization.name);
  })
};


// This callback is run after all of the Organizations are created.
// It sends each new pet to 'associate' with our Sources  
var afterOrganization = function(err,newOrganizations){
  while (newOrganizations.length){
    var thisOrganization = newOrganizations.pop();
    var callback = function(organizationID){
      console.log('Done with organization ',organizationID)
    }
    associateSources(thisOrganization,callback)
  }
  console.log('Sourcechek API Bootstrapped!! Exiting.');

  // This callback lets us leave bootstrap.js and continue lifting our app!
  return cb()
};


//Association Logic
var associate = function(thisOrganization,thisSource) {
	console.log('Associating ',thisOrganization.name,'with',thisSource.host);
    thisSource.organizations.add(thisOrganization.id);
    thisSource.save(console.log);
}

// This callback is run after all of our Sources are created.
// It takes the returned Source and stores it in our storeSources array for later.
var afterSource = function(err,newSources){
  while (newSources.length)
    storeSources.push(newSources.pop())

  Organization.create(organizations).exec(afterOrganization)
};


Source.create(sources).exec(afterSource)

};