/**
* Tournaments.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var tablize = require('sd-datatables');

module.exports = {

  attributes: {
    assocTrackId: {
      type: 'string',
      required: true
		},
    name: {
      type: 'string',
      required: true
		},
    tournyDate: {
      type: 'integer',
      required: true
		},
    max: {
      type: 'integer',
      required: true
		},
    entryFee: {
      type: 'float',
      required: true
		},
    siteFee: {
      type: 'float',
      required: true
		},
    credits: {
      type: 'float',
      required: true
		},
    closed: {
      type: 'boolean',
      required: true
		}
  }

};

tablize(module.exports);

