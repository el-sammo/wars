/**
 * TournamentsController
 *
 * @description :: Server-side logic for managing tournaments
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var _ = require('lodash');
var Promise = require('bluebird');

var serverError = 'An error occurred. Please try again later.';

var httpAdapter = 'http';
var extra = {};

module.exports = {
	byName: function(req, res) {
		Tournaments.find({name: req.params.id}).sort({
			name: 'asc', entryFee: 'asc'
		}).limit(30).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byEntryFee: function(req, res) {
		Tournaments.find({entryFee: req.params.id}).sort({
			name: 'asc', entryFee: 'asc'
		}).limit(30).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byCustomerId: function(req, res) {
		var reqPcs = req.params.id.split('-');
		var customerId = reqPcs[0];
		var today = reqPcs[1];
		Tournaments.find({tournyDate: today}).sort({
			name: 'asc', entryFee: 'asc'
		}).then(function(tournaments) {
			var customerTournaments = [];
			tournaments.forEach(function(tournament) {
				tournament.customers.forEach(function(customer) {
					if(customer.customerId === customerId) {
						customerTournaments.push(tournament);
					}
				});
			});
			res.send(JSON.stringify(customerTournaments));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byDate: function(req, res) {
		Tournaments.find({tournyDate: req.params.id}).sort({
			startTime: 'asc', name: 'asc', entryFee: 'asc'
		}).limit(30).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	leaders: function(req, res) {
		if(req.params.id) {
			return tournamentLeaders(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid tournament data'}));
		}
	},
	
	updateTCC: function(req, res) {
		if(req.body) {
			return updateTournamentCustomersCredits(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid updateTCC data'}));
		}
	},
	
	updateTSCredits: function(req, res) {
		if(req.params.id) {
			return updateTournamentStandingsCustomerCredits(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid updateTCC data'}));
		}
	},
	
	resultsByCustomerId: function(req, res) {
		if(req.params.id) {
			return getResultsByCustomerId(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid updateTCC data'}));
		}
	},
	
	closeTournament: function(req, res) {
		if(req.params.id) {
			return closeValidTournament(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid track data'}));
		}
	},
	
	unCloseTournament: function(req, res) {
		if(req.params.id) {
			return unCloseValidTournament(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid track data'}));
		}
	},
	
	scoreTournament: function(req, res) {
		if(req.params.id) {
			return scoreValidTournament(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid track data'}));
		}
	},
	
	register: function(req, res) {
		var rpiPcs = req.params.id.split('-');
		if(rpiPcs.length > 1) {
			return tournamentRegister(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid registration data'}));
		}
	},
	
	unRegister: function(req, res) {
		var rpiPcs = req.params.id.split('-');
		if(rpiPcs.length > 1) {
			return tournamentUnregister(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid unregistration data'}));
		}
	},
	
	createCustomTournament: function(req, res) {
		if(req.body) {
			var missingPcs = [];
			if(!req.body.assocTrackId) {
				missingPcs.push('assocTrackId');
			}
			if(!req.body.name) {
				missingPcs.push('name');
			}
			if(!req.body.tournyDate) {
				missingPcs.push('tournyDate');
			}
			if(!req.body.max) {
				missingPcs.push('max');
			}
			if(!req.body.entryFee) {
				missingPcs.push('entryFee');
			}
			if(!req.body.siteFee) {
				missingPcs.push('siteFee');
			}
			if(!req.body.startTime) {
				missingPcs.push('startTime');
			}
			if(!req.body.customers) {
				missingPcs.push('customers');
			}
			if(!req.body.credits) {
				missingPcs.push('credits');
			}
			if(!req.body.pubPriv) {
				missingPcs.push('pubPriv');
			}
			if(missingPcs.length) {
console.log(' ');
console.log('missingPcs:');
console.log(missingPcs);
			}
			return createValidCustomTournament(req, res);
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Invalid createCustomTournament data'}));
		}
	},
	
  datatables: function(req, res) {
    var options = req.query;

    Tournaments.datatables(options).then(function(results) {
      res.send(JSON.stringify(results));
    }).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
    });
  }
};

function tournamentRegister(req, res, self) {
	var rpiPcs = req.params.id.split('-');
	var tournamentId = rpiPcs[0];
	var customerId = rpiPcs[1];
	return Tournaments.find({id: tournamentId}).then(function(results) {
		var tournamentData = results[0];
		var MournamentMax;
		if(tournamentData.max == 99999) {
			tournamentMax = 999999999999;
		} else {
			tournamentMax = tournamentData.max;
		}

		if(tournamentData.closed) {
			return res.send(JSON.stringify({success: false, failMsg: 'Closed'}));
		}
		var customerFound = false;
		tournamentData.customers.forEach(function(customer) {
			if(customer === customerId) {
				customerFound = true;
			}
		});
		if(customerFound) {
			return res.send(JSON.stringify({success: false, failMsg: 'Already Registered'}));
		}
		var totalFee = parseFloat(parseFloat(tournamentData.entryFee) + parseFloat(tournamentData.siteFee));
		if(tournamentData.customers.length < tournamentMax) {
			return TournamentsService.getCustomerBalance(customerId).then(function(balanceData) {
				if(balanceData.balance >= totalFee) {
					return TournamentsService.updateCustomerBalance(customerId, balanceData.balance, totalFee, 'subtract').then(function(customerData) {
						if(customerData.success) {
							tournamentData.customers.push(customerId);
							return Tournaments.update({id: tournamentData.id}, {customers: tournamentData.customers}, false, false).then(function(result) {
								return TournamentsService.addCustomer(tournamentData.id, customerId, tournamentData.credits).then(function(tsData) {
									res.send(JSON.stringify(tsData));
								});
							}).catch(function(err) {
								res.json({error: 'Server error'}, 500);
								console.error(err);
								throw err;
							});
						}
						return res.send(JSON.stringify({success: false, failMsg: 'Customer Balance Error'}));
					}).catch(function(err) {
						res.json({error: 'Server error'}, 500);
						console.error(err);
						throw err;
					});	
				} else {
					return res.send(JSON.stringify({success: false, failMsg: 'Insufficient Funds '+totalFee}));
				}
			}).catch(function(err) {
				res.json({error: 'Server error'}, 500);
				console.error(err);
				throw err;
			});
		} else {
			return res.send(JSON.stringify({success: false, failMsg: 'Full'}));
		}
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}
function tournamentUnregister(req, res, self) {
	var rpiPcs = req.params.id.split('-');
	var tournamentId = rpiPcs[0];
	var customerId = rpiPcs[1];
	return Tournaments.find({id: tournamentId}).then(function(results) {
		var tournamentData = results[0];
		if(tournamentData.closed) {
			return res.send(JSON.stringify({success: false, failMsg: 'Closed'}));
		}
		var customerFound = false;
		tournamentData.customers.forEach(function(customer) {
			if(customer === customerId) {
				customerFound = true;
			}
		});
		if(!customerFound) {
			return res.send(JSON.stringify({success: false, failMsg: 'Not Registered'}));
		}
		var totalFee = parseFloat(parseFloat(tournamentData.entryFee) + parseFloat(tournamentData.siteFee));
		return TournamentsService.getCustomerBalance(customerId).then(function(balanceData) {
			return TournamentsService.updateCustomerBalance(customerId, balanceData.balance, totalFee, 'add').then(function(customerData) {
				if(customerData.success) {
					var newCustomers = [];
					tournamentData.customers.forEach(function(customer) {
						if(customer !== customerId) {
							newCustomers.push(customer);
						}
					});
					return Tournaments.update({id: tournamentData.id}, {customers: newCustomers}, false, false).then(function(result) {
						return TournamentsService.removeCustomer(tournamentData.id, customerId).then(function(tsData) {
							res.send(JSON.stringify(tsData));
						});
					}).catch(function(err) {
						res.json({error: 'Server error'}, 500);
						console.error(err);
						throw err;
					});
				}
				return res.send(JSON.stringify({success: false, failMsg: 'Customer Balance Error'}));
			}).catch(function(err) {
				res.json({error: 'Server error'}, 500);
				console.error(err);
				throw err;
			});	
		}).catch(function(err) {
			res.json({error: 'Server error'}, 500);
			console.error(err);
			throw err;
		});
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}


function tournamentLeaders(req, res, self) {
// TODO check this
console.log('tournamentLeaders() called');
	var tournamentId = req.params.id;
	return Tournaments.find({id: tournamentId}).then(function(results) {
		var tournamentLeadersData = [];
		results[0].customers.sort(dynamicSort("credits"));
		results[0].customers.reverse();
		results[0].customers.forEach(function(customer) {
			tournamentLeadersData.push({customerId: customer.customerId, credits: customer.credits})
		});
		tournamentLeadersData.push(results[0].name);
		res.send(JSON.stringify(tournamentLeadersData));
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}

function updateTournamentCustomersCredits(req, res, self) {
console.log('updateTournamentCustomersCredits() called');
// TODO check this
	var finalRaceId = req.params.id;
	var acIds = req.body;
	var tournamentId = acIds[0];
	acIds.reverse();
	acIds.pop();
console.log('acIds:');
console.log(acIds);
	return TournamentsService.getWagers(finalRaceId).then(function(wagersData) {
		var wagers = wagersData.wagers;
		var newCustomers = [];
		acIds.forEach(function(customerId) {
			var newCustomer = {};
			newCustomer.customerId = customerId;
			newCustomer.credits = 0;
			wagers.forEach(function(wager) {
				if(wager.customerId === newCustomer.customerId) {
					newCustomer.credits = (newCustomer.credits + parseFloat(wager.result));
				}
			});
			newCustomers.push(newCustomer);
		});
		var finalCustomers = [];
		Tournaments.find({id: tournamentId}).then(function(getTournamentData) {
			getTournamentData[0].customers.forEach(function(gtTC) {
				var finalCustomer = {};
				finalCustomer.customerId = gtTC.customerId;
				finalCustomer.credits = parseFloat(gtTC.credits);
				newCustomers.forEach(function(newCustomerData) {
					if(newCustomerData.customerId === finalCustomer.customerId) {
						finalCustomer.credits = (parseFloat(finalCustomer.credits) + parseFloat(newCustomerData.credits));
					}
				});
				finalCustomers.push(finalCustomer);
			});
		});

		return Tournaments.update(
			{id: tournamentId},
			{customers: finalCustomers},
			false,
			false
		).then(function(results) {
			var tournamentData = results[0];
			res.send(JSON.stringify(tournamentData.customers));
			return {success: true, updatedTournamentData: tournamentData};
		}).catch(function(err) {
			return {error: 'Server error'};
			console.error(err);
			throw err;
		});
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}

function getResultsByCustomerId(req, res, self) {
	var customerId = req.params.id;
	return TournamentsService.getTournamentResultsByCustomerId(customerId).then(function(gtrResponse) {
		if(gtrResponse.success) {
			res.send(JSON.stringify(gtrResponse.resultsData));
		}
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}

function updateTournamentStandingsCustomerCredits(req, res, self) {
	var rpPcs = req.params.id.split('-');
	var tournamentId = rpPcs[0];
	var customerId = rpPcs[1];
	var credits = rpPcs[2];
	return TournamentsService.updateTS(tournamentId, customerId, credits).then(function(utsResponse) {
		res.send(JSON.stringify(utsResponse));
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}

function closeValidTournament(req, res, self) {
	var tournamentId = req.params.id;
	return Tournaments.update(
		{id: tournamentId},
		{closed: true},
		false,
		false
	).then(function(updateResponse) {
		res.send(JSON.stringify(updateResponse[0]));
	}).catch(function(err) {
		return {error: 'Server error'};
		console.error(err);
		throw err;
	});
}

function unCloseValidTournament(req, res, self) {
	var tournamentId = req.params.id;
	return Tournaments.update(
		{id: tournamentId},
		{closed: false},
		false,
		false
	).then(function(updateResponse) {
		res.send(JSON.stringify(updateResponse[0]));
	}).catch(function(err) {
		return {error: 'Server error'};
		console.error(err);
		throw err;
	});
}

function scoreValidTournament(req, res, self) {
	var tournamentId = req.params.id;
	return Tournaments.update(
		{id: tournamentId},
		{scored: true},
		false,
		false
	).then(function(scoreResponse) {
		var tournamentData = scoreResponse[0];
// TODO
// update tournamentstandings
		TournamentsService.getFinalStandings(
			tournamentId,
			tournamentData.name,
			tournamentData.tournyDate,
			tournamentData.credits,
			tournamentData.entryFee,
			tournamentData.siteFee,
			tournamentData.customers
		);
		res.send(JSON.stringify(tournamentData));
	}).catch(function(err) {
		return {error: 'Server error'};
		console.error(err);
		throw err;
	});
}

function createValidCustomTournament(req, res, self) {
	return TournamentsService.createCustomTournament(req.body).then(function(ictResponse) {
		if(ictResponse.success) {
			return TournamentsService.getCustomerBalance(req.body.customers[0]).then(function(balanceData) {
				var dTotal = parseFloat(req.body.entryFee + req.body.siteFee);
				if(balanceData.balance >= dTotal) {
					return TournamentsService.updateCustomerBalance(req.body.customers[0], balanceData.balance, dTotal, 'subtract').then(function(customerData) {
						if(customerData.success) {
							res.send({success: true, tournamentData: ictResponse.tournamentData});
						} else {
console.log(' ');
console.log('error updating customer balance in createValidCustomTournament-TournamentsService.updateCustomerBalance');
console.log(' ');
							res.send({success: false});
						}
					});
				} else {
console.log(' ');
console.log('customer balance('+balanceData.balance+') less than dTotal ('+dTotal+') - this should ***NEVER*** happen');
console.log(' ');
					res.send({success: false});
				}
			});
		} else {
			res.send({success: false});
		}
	}).catch(function(err) {
    return {error: 'Server error'};
    console.error(err);
    throw err;
	});
}

function dynamicSort(property) {
	var sortOrder = 1;
	if(property[0] === "-") {
		sortOrder = -1;
		property = property.substr(1);
	}
	return function (a,b) {
		var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
		return result * sortOrder;
	}
}

