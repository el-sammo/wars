(function() {
"use strict";

var app = angular.module('app');

///
// Controllers: Home
///

app.controller('HomeController', controller);

controller.$inject = [
	'$scope', '$http', '$routeParams', '$rootScope', '$location', 
	'$modal', '$timeout', '$window',

	'signupPrompter', 'deviceMgr', 'layoutMgmt',
	'customerMgmt', 'trdMgmt', 'wagerMgmt', 'tournamentMgmt',
	'messenger', 
	'lodash',
	// in angular, there are some angular-defined variables/functions/behaviors
	// that are prefaced with the dollar sign ($)
];

function controller(
	$scope, $http, $routeParams, $rootScope, $location,
	$modal, $timeout, $window,
	signupPrompter, deviceMgr, layoutMgmt, 
	customerMgmt, trdMgmt, wagerMgmt, tournamentMgmt,
	messenger, 
	_
) {
	///
	// Variable declaration
	///

	var todayDate;
	var legMap, partMap, amountMap, wagerAbbrevMap;

	// create an array with 52 cards
	var createDeck = function() {
		var deck = [];
		for(var i = 1; i < 53; i++) {
			deck.push(i);
		}
		return deck;
	}

	// shuffle the deck
	var shuffleDeck = function(deck) {
		deck.sort(function(a, b) {
			return 0.5 - Math.random()
		});
		return deck;
	}

	// return an object containing the dealt card and the rest of the deck
	var dealCard = function(deck) {
		var card = deck.splice(0,1);
		return {deck: deck, card: card};
	}

	var newDeck = createDeck();
	var shuffledDeck = shuffleDeck(newDeck);
	var dealResult = dealCard(shuffledDeck);
	var dealtCard = dealResult.card;
	var remainingDeck = dealResult.deck;

	///
	// Run initialization
	///

	init();


	///
	// Initialization
	///

	function init() {
//		initDate();
//		initTournaments();
//
//		$scope.logIn = layoutMgmt.logIn;
//		$scope.signUp = layoutMgmt.signUp;
//		$scope.logOut = layoutMgmt.logOut;
//
//		$scope.account = account;
//		$scope.showTournamentDetails = showTournamentDetails;
//		$scope.showTournamentLeaders = showTournamentLeaders;
//		$scope.tournamentRegister = tournamentRegister;
//		$scope.setActiveTournament = setActiveTournament;


		// write code to represent a deck of cards with operations to shuffle the deck and to deal one card
		
		var createDeck = function(){
		  var deck = [];
		  	for(var i = 1;i < 53; i++){
				deck.push(i);
			}
			console.log(deck);
		};

		createDeck();


		// For debugging
		$scope.debugLog = debugLog;

		$rootScope.$on('customerLoggedIn', onCustomerLoggedIn);
	}

	function initDate() {
		var dateObj = new Date();
		var year = dateObj.getFullYear();
		var month = (dateObj.getMonth() + 1);
		var date = dateObj.getDate();

		if(month < 10) {
			month = '0' + month;
		}

		if(date < 10) {
			date = '0' + date;
		}

		todayDate = year + month + date;

		// debug code
		todayDate = 20160727;
	}

	function initTournaments() {
		tournamentMgmt.getTournamentsByDate(todayDate).then(
			onGetTournaments
		);
	}

	///
	// Event handlers
	///
	
	function onCustomerLoggedIn(evt, args) {
		$scope.customerId = args;
		$scope.showLogin = false;
		$scope.showLogout = true;
		$scope.showSignup = false;

		var getCustomerPromise = customerMgmt.getCustomer($scope.customerId);
		getCustomerPromise.then(function(customer) {
			$scope.customer = customer;
		});
	}

	function onGetTournaments(currentTournamentsData) {
		var dateObj = new Date();
		var nowMills = dateObj.getTime();
		currentTournamentsData.forEach(function(tournament) {
			tournament.mtp = parseInt((tournament.startTime - nowMills) / 1000);
		});
		$scope.currentTournaments = currentTournamentsData;
console.log($scope.currentTournaments);

		customerMgmt.getSession().then(function(sessionData) {

			if(sessionData.customerId) {
				$rootScope.customerId = sessionData.customerId;
				$scope.customerId = $rootScope.customerId;
				$scope.showLogin = false;
				$scope.showSignup = false;
				$scope.showLogout = true;

				var getCustomerPromise = customerMgmt.getCustomer($scope.customerId);
				getCustomerPromise.then(function(customer) {
					$scope.customer = customer;
				});

			} else {
				$scope.showLogin = true;
				$scope.showSignup = true;
				$scope.showLogout = false;
			}

			var tournaments = [];
			$scope.currentTournaments.forEach(function(tournament) {
				var tournamentData = {};
				tournamentData.id = tournament.id;
				tournamentData.name = tournament.name;
				tournamentData.entryFee = tournament.entryFee;
				tournamentData.siteFee = tournament.siteFee;
				tournamentData.customersCount = tournament.customers.length;
				tournamentData.max = tournament.max;
				if(tournament.closed) {
					if(tournament.scored) {
						tournamentData.tournamentStatus = 'Finished';
					} else {
						tournamentData.tournamentStatus = 'In Progress';
					}
				} else {
					if(tournament.customers.length == tournament.max) {
						tournamentData.tournamentStatus = 'Full';
					} else {
						tournamentData.tournamentStatus = 'Registering';
					}
				}
				tournaments.push(tournamentData);
			});
			$scope.tournamentsData = tournaments;
		});
	}

	///
	// Balance methods
	///
	
	function updateBalance() {
		var getSessionPromise = customerMgmt.getSession();
		getSessionPromise.then(function(sessionData) {
			if(sessionData.customerId) {
				var getCustomerPromise = customerMgmt.getCustomer(sessionData.customerId);
				getCustomerPromise.then(function(customer) {
					$scope.customer = customer;
				});
			}
		});
	}


	///
	// View methods
	///


	function account() {
		if(!$scope.customerId) {
			layoutMgmt.logIn();
		} else {
			$location.path('/account');
		}
	}

	function showTournamentDetails(tournyId) {
		var dateObj = new Date();
		var now = dateObj.toString();
console.log('now: '+now);
		var offsetMinutes = dateObj.getTimezoneOffset();
console.log('offsetMinutes: '+offsetMinutes);
		var getTournamentPromise = tournamentMgmt.getTournament(tournyId);
		getTournamentPromise.then(function(tournamentData) {
			$scope.tournamentData = tournamentData;

		});
		if(!$scope.showLeaders) {
			$scope.showTournament = true;
		}
	}

	function showTournamentLeaders(tournyId) {
		$scope.showLeaders = true;
		var getLeadersPromise = tournamentMgmt.getLeaders(tournyId);
		getLeadersPromise.then(function(leadersData) {
			$scope.tournamentLeadersDataTournamentName = leadersData[leadersData.length - 1];
			leadersData.pop();
			var leaderBoardData = [];
			leadersData.forEach(function(leader) {
				var getCustomerPromise = customerMgmt.getCustomer(leader.customerId);
				getCustomerPromise.then(function(customerData) {
					var thisLeader = {};
					thisLeader.id = leader.customerId;
					thisLeader.fName = customerData.fName;
					thisLeader.lName = customerData.lName;
					thisLeader.city = customerData.city;
					thisLeader.username = customerData.username;
					thisLeader.credits = leader.credits;
					leaderBoardData.push(thisLeader);
				});
			});
			$scope.leadersData = leaderBoardData;
		});
		$scope.showTournamentDetails(tournyId);
	}

	function tournamentRegister(tournyId) {
// TODO debug this, including handling errors
		if(!$scope.customerId) {
			layoutMgmt.logIn();
		} else {
			var registerTournamentPromise = tournamentMgmt.registerTournament(tournyId, $scope.customerId);
			registerTournamentPromise.then(function(response) {
console.log('response.data:');
console.log(response.data);
			});
		}
	}

	function setActiveTournament(tournament) {
		$window.location.href = location.origin + "/app/tournament/" + tournament.id;
	}

	function getMinToPost(postTime) {
		var d = new Date();
		var nowMills = d.getTime();
		var difference = (postTime - nowMills);
		if(difference > 0) {
			return ' ('+parseInt(difference / 60000) + ' M)';
		} else {
			return;
		}
	}

	setTimeout(function() { 
		initTournaments();
	}, 60000);

	///
	// Debugging methods
	///
	
	function debugLog(msg) {
		var args = Array.prototype.slice.call(arguments);
		console.log.apply(console, args);
	}
}

}());
