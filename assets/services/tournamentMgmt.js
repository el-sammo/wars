(function() {
	'use strict';

	var app = angular.module('app');

	///
	// Tournament Management
	///

	app.factory('tournamentMgmt', service);
	
	service.$inject = [
		'$http', '$q', '$sce', 'configMgr', 'querystring'
	];
	
	function service(
		$http, $q, $sce, configMgr, querystring
	) {
		var tournament;
		var registerTournamentPromise;
		var unRegisterTournamentPromise;
		var getTournamentResultsByCustomerIdPromise;
		var getTournamentsByCustomerIdPromise;
		var getTournamentsByDatePromise;
		var getLeadersPromise;
		var getCustomerTournamentCreditsPromise;
		var updateTournamentCustomersCreditsPromise;
		var updateTSCreditsPromise;
		var closeTournamentPromise;
		var unCloseTournamentPromise;
		var scoreTournamentPromise;

		var service = {
			getTournament: function(tournamentId) {
				var url = '/tournaments/' + tournamentId;
				return $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			registerTournament: function(tournamentId, customerId) {
				var params = tournamentId +'-'+ customerId;
				var url = '/tournaments/register/' + params;
				registerTournamentPromise = $http.get(url).then(function(res) {
					return res;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return registerTournamentPromise;
			},

			unRegisterTournament: function(tournamentId, customerId) {
				var params = tournamentId +'-'+ customerId;
				var url = '/tournaments/unRegister/' + params;
				unRegisterTournamentPromise = $http.get(url).then(function(res) {
					return res;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return unRegisterTournamentPromise;
			},

			getTournamentsByCustomerId: function(customerId) {
console.log('getTournamentsByCustomerId() called');
				var url = '/tournaments/byCustomerId/' + customerId;
				getTournamentsByCustomerIdPromise = $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return getTournamentsByCustomerIdPromise;
			},

			getTournamentResultsByCustomerId: function(customerId) {
console.log('getTournamentResultsByCustomerId() called');
				var url = '/tournaments/resultsByCustomerId/' + customerId;
				getTournamentResultsByCustomerIdPromise = $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return getTournamentResultsByCustomerIdPromise;
			},

			getTournamentsByDate: function(date) {
				var url = '/tournaments/byDate/' + date;
				getTournamentsByDatePromise = $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return getTournamentsByDatePromise;
			},

			getLeaders: function(tournamentId) {
console.log('getLeaders() called');
				var url = '/tournaments/leaders/' + tournamentId;
				getLeadersPromise = $http.get(url).then(function(leaders) {
					return leaders.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return getLeadersPromise;
			},

			getCustomerTournamentCredits: function(tournyCustomerId) {
				var url = '/tournamentstandings/customerTournamentCredits/' + tournyCustomerId;
				getCustomerTournamentCreditsPromise = $http.get(url).then(function(res) {
					return res.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return getCustomerTournamentCreditsPromise;
			},

			updateTournamentCustomersCredits: function(finalRaceId, acIds) {
console.log('updateTournamentCustomersCredits() called');
				var url = '/tournaments/updateTCC/' + finalRaceId;
				return $http.put(url, acIds).success(
					function(data, status, headers, config) {
						if(status >= 400) {
							return $q.reject(data);
						}
						return {success: true};
					}
				).catch(function(err) {
					console.log('PUT ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			updateTSCredits: function(tournyId, customerId, credits) {
				var url = '/tournaments/updateTSCredits/' + tournyId+'-'+customerId+'-'+credits;
				updateTSCreditsPromise =  $http.get(url).then(function(response) {
					return response.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return updateTSCreditsPromise;
			},

			closeTournament: function(trackId) {
				var url = '/tournaments/closeTournament/' + trackId;
				closeTournamentPromise = $http.get(url).then(function(response) {
					return response.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return closeTournamentPromise;
			},

			unCloseTournament: function(trackId) {
				var url = '/tournaments/unCloseTournament/' + trackId;
				unCloseTournamentPromise = $http.get(url).then(function(response) {
					return response.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return unCloseTournamentPromise;
			},

			scoreTournament: function(tournamentId) {
				var url = '/tournaments/scoreTournament/' + tournamentId;
				scoreTournamentPromise = $http.get(url).then(function(response) {
					return response.data;
				}).catch(function(err) {
					console.log('GET ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});

				return scoreTournamentPromise;
			},

			createCustomTournament: function(tournamentData) {
				var url = '/tournaments/createCustomTournament';
				return $http.post(url, tournamentData).success(
					function(data, status, headers, config) {
						if(status >= 400) {
							return $q.reject(data);
						}
						return tournament;
					}
				).catch(function(err) {
					console.log('POST ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			},

			updateTournament: function(tournamentData) {
				var url = '/tournaments/' + tournamentData.id;
				return $http.put(url, tournamentData).success(
					function(data, status, headers, config) {
						if(status >= 400) {
							return $q.reject(data);
						}
						mergeIntoTournament(data, true);
						return tournament;
					}
				).catch(function(err) {
					console.log('PUT ' + url + ': ajax failed');
					console.error(err);
					return $q.reject(err);
				});
			}

		};

		function mergeIntoTournament(data, replace) {
			if(! tournament) {
				tournament = data;
				return;
			}

			// Delete all original keys
			if(replace) {
				angular.forEach(tournament, function(val, key) {
					delete tournament[key];
				});
			}

			angular.forEach(data, function(val, key) {
				tournament[key] = val;
			});
		};

		return service;
	}

}());
