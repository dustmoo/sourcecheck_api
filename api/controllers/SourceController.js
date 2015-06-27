/**
 * SourceController
 *
 * @description :: Server-side logic for managing sources
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//Main info API Call

	check: function(req,res) {
		//To Do: Add error handling, work through deep assocations.
		var host = req.param('host');
		Source.findOne({host: host}).populate("organizations").exec(function(error, source){
				
			if(error) {
		        sails.log.error("ERR:", error);
		    }

		    //console.log(source);

		    res.send(200, source.toJSON());
		});
	}
	
};

