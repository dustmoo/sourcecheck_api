/**
* Organization.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

	  	//Organization Name
	    name : 	{ type: 'STRING' },

	    //Source Association
	    sources : {
	            collection: 'source',
	            via: 'organizations'
	        },
	    //Self association because we can be owned or own
	    owns : {
	    	collection: 'organization',
	    	via: 'owned_by',
	        dominant: true
	    },

	    owned_by : {
	    	collection: 'organization',
	    	via: 'owns'
	    }
	    
    },

};

