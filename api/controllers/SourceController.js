/**
 * SourcesController
 *
 * @description :: The Sources controler is our main API interface to interact with Sources.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//Main info API Call

	check: function(req,res) {
		//To Do: Add error handling, work through deep assocations.
		var host = req.param('host');
		var to_send = {};

		//Find source that matches host
		Source.findOne({host: host}).populate("organizations").then(function(source){
			source.owner_ids = [];
			for (var i = source.organizations.length - 1; i >= 0; i--) {
				source.owner_ids = source.organizations[i].id;
			};
			var orgOwners = Organization.find({
				id: _.pluck(source.organizations, 'id')
				//_.pluck: Retrieves the value of a 'user' property from all elements in the post.comments collection.
			})
			.then(function(orgOwners){
/*
				for (var i = orgOwners.length - 1; i >= 0; i--) {
					orgOwners[i].owner_ids = [];
					//Parse Owners
					for (var o = orgOwners[i].owners.length - 1; o >= 0; o--) {
						orgOwners[i].owner_ids.push(orgOwners[i].owners[o].id)
					};
				};*/


				source.fixed_orgs = orgOwners;
				res.send(200, source);
				//var new_source = {organizations: orgOwners, host: source.host, createdAt: source.createdAt, updatedAt: source.updatedAt, id: source.id};
				//res.send(200, new_source);
			});
		});
	}
	
};

