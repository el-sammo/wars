(function() {
	'use strict';

	var app = angular.module('app');

	///
	// Controllers: Score
	///

	app.controller('ScoreController', controller);
	
	controller.$inject = [
		'$scope', '$http', 'messenger', '$rootScope',
		'$window', '$routeParams', 'layoutMgmt',
		'deviceMgr', 'trdMgmt', 'customerMgmt',
		'tournamentMgmt'
	];

	function controller(
		$scope, $http, messenger, $rootScope,
		$window, $routeParams, layoutMgmt,
		deviceMgr, trdMgmt, customerMgmt,
		tournamentMgmt
	) {

		if(deviceMgr.isBigScreen()) {
			$scope.bigScreen = true;
		} else {
			$scope.bigScreen = false;
		}

		$scope.exacta = '';
		$scope.trifecta = '';
		$scope.superfecta = '';
		$scope.pentafecta = '';
		$scope.dailyDouble = '';
		$scope.pick3 = '';
		$scope.pick4 = '';
		$scope.pick5 = '';
		$scope.pick6 = '';
		$scope.pick7 = '';
		$scope.pick8 = '';
		$scope.pick9 = '';
		$scope.pick10 = '';

		$scope.show1st = false;
		$scope.show1stFirstTie = false;
		$scope.show1stSecondTie = false;
		$scope.show2nd = false;
		$scope.show2ndFirstTie = false;
		$scope.show2ndSecondTie = false;
		$scope.show3rd = false;
		$scope.show3rdFirstTie = false;
		$scope.show3rdSecondTie = false;
		$scope.show4th = false;
		$scope.show4thFirstTie = false;
		$scope.show4thSecondTie = false;
		$scope.show5th = false;
		$scope.show5thFirstTie = false;
		$scope.show5thSecondTie = false;
		$scope.showExactaAA = false;
		$scope.showExactaAB = false;
		$scope.showExactaBA = false;
		$scope.showExactaBB = false;
		$scope.showTrifecta = false;
		$scope.showTrifectaAAA = false;
		$scope.showTrifectaAAB = false;
		$scope.showTrifectaABA = false;
		$scope.showTrifectaABB = false;
		$scope.showTrifectaBAA = false;
		$scope.showTrifectaBAB = false;
		$scope.showTrifectaBBA = false;
		$scope.showTrifectaBBB = false;
		$scope.showSuperfectaAAAA = false;
		$scope.showSuperfectaAAAB = false;
		$scope.showSuperfectaAABA = false;
		$scope.showSuperfectaAABB = false;
		$scope.showSuperfectaABAA = false;
		$scope.showSuperfectaABAB = false;
		$scope.showSuperfectaABBA = false;
		$scope.showSuperfectaABBB = false;
		$scope.showSuperfectaBAAA = false;
		$scope.showSuperfectaBAAB = false;
		$scope.showSuperfectaBABA = false;
		$scope.showSuperfectaBABB = false;
		$scope.showSuperfectaBBAA = false;
		$scope.showSuperfectaBBAB = false;
		$scope.showSuperfectaBBBA = false;
		$scope.showSuperfectaBBBB = false;
		$scope.showPentafectaAAAAA = false;
		$scope.showPentafectaAAAAB = false;
		$scope.showPentafectaAAABA = false;
		$scope.showPentafectaAAABB = false;
		$scope.showPentafectaAABAA = false;
		$scope.showPentafectaAABAB = false;
		$scope.showPentafectaAABBA = false;
		$scope.showPentafectaAABBB = false;
		$scope.showPentafectaABAAA = false;
		$scope.showPentafectaABAAB = false;
		$scope.showPentafectaABABA = false;
		$scope.showPentafectaABABB = false;
		$scope.showPentafectaABBAA = false;
		$scope.showPentafectaABBAB = false;
		$scope.showPentafectaABBBA = false;
		$scope.showPentafectaABBBB = false;
		$scope.showPentafectaBAAAA = false;
		$scope.showPentafectaBAAAB = false;
		$scope.showPentafectaBAABA = false;
		$scope.showPentafectaBAABB = false;
		$scope.showPentafectaBABAA = false;
		$scope.showPentafectaBABAB = false;
		$scope.showPentafectaBABBA = false;
		$scope.showPentafectaBABBB = false;
		$scope.showPentafectaBBAAA = false;
		$scope.showPentafectaBBAAB = false;
		$scope.showPentafectaBBABA = false;
		$scope.showPentafectaBBABB = false;
		$scope.showPentafectaBBBAA = false;
		$scope.showPentafectaBBBAB = false;
		$scope.showPentafectaBBBBA = false;
		$scope.showPentafectaBBBBB = false;
		$scope.showDouble = false;
		$scope.showDoubleAlt = false;
		$scope.showPickThree = false;
		$scope.showPickThreeAlt = false;
		$scope.showPickFour = false;
		$scope.showPickFourAlt = false;
		$scope.showPickFourConsolation = false;
		$scope.showPickFive = false;
		$scope.showPickFiveAlt = false;
		$scope.showPickFiveConsolation = false;
		$scope.showPickSix = false;
		$scope.showPickSixAlt = false;
		$scope.showPickSixConsolation = false;
		$scope.showPickSeven = false;
		$scope.showPickSevenAlt = false;
		$scope.showPickEight = false;
		$scope.showPickEightAlt = false;
		$scope.showPickNine = false;
		$scope.showPickNineAlt = false;
		$scope.showPickTen = false;
		$scope.showPickTenAlt = false;

		var sessionPromise = customerMgmt.getSession();
		sessionPromise.then(function(sessionData) {
			if(sessionData.customerId) {
				$scope.customerId = sessionData.customerId;
				var getCustomerPromise = customerMgmt.getCustomer(sessionData.customerId);
				getCustomerPromise.then(function(customerData) {
					if(!customerData.admin) {
						$window.location.href = '/';
						return;
					}
				});
			} else {
				$window.location.href = '/';
				return;
			}

			var rpPcs = $routeParams.id.split('-');

			var trId = rpPcs[0];
			var raceNum = rpPcs[1];

			$scope.trId = trId;
			$scope.raceNum = raceNum;
			$scope.trdData = [];

			var getTrdPromise = trdMgmt.getTrd(trId);
			getTrdPromise.then(function(trdData) {

				var favoriteIndicated = false;

				trdData.races.forEach(function(race) {
					if(race.number == $scope.raceNum) {
						race.entries.forEach(function(entry) {
							if(entry.favorite) {
								$scope.favorite = entry.number;
								favoriteIndicated = true;
							}
						});
					}
				});

				if(!favoriteIndicated) {
					alert('the favorite hasn\'t been indicated - go back and indicate a favorite');
					$window.location.href = '/app/tournament/' + $scope.trId;
				}

				$scope.trdData = trdData;
				var checkDouble = false;
				var checkPick3 = false;
				var checkPick4 = false;
				var checkPick5 = false;
				var checkPick6 = false;
				var checkPick7 = false;
				var checkPick8 = false;
				var checkPick9 = false;
				var checkPick10 = false;
				if(raceNum > 1) {
					checkDouble = true;
				}
				if(raceNum > 2) {
					checkPick3 = true;
				}
				if(raceNum > 3) {
					checkPick4 = true;
				}
				if(raceNum > 4) {
					checkPick5 = true;
				}
				if(raceNum > 5) {
					checkPick6 = true;
				}
				if(raceNum > 6) {
					checkPick7 = true;
				}
				if(raceNum > 7) {
					checkPick8 = true;
				}
				if(raceNum > 8) {
					checkPick9 = true;
				}
				if(raceNum > 9) {
					checkPick10 = true;
				}
				$scope.trdData.races.forEach(function(race) {
					if(checkDouble) {
						if(race.number == (raceNum - 1)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Daily Double') {
									$scope.doubleFirst = race.score.firstNumber;
								}
							});
						}
					}
					if(checkPick3) {
						if(race.number == (raceNum - 2)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 3') {
									$scope.pick3First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick3First && race.number == (raceNum - 1)) {
							$scope.pick3Second = race.score.firstNumber;
						}
					}
					if(checkPick4) {
						if(race.number == (raceNum - 3)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 4') {
									$scope.pick4First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick4First && race.number == (raceNum - 2)) {
							$scope.pick4Second = race.score.firstNumber;
						}
						if($scope.pick4First && race.number == (raceNum - 1)) {
							$scope.pick4Third = race.score.firstNumber;
						}
					}
					if(checkPick5) {
						if(race.number == (raceNum - 4)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 5') {
									$scope.pick5First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick5First && race.number == (raceNum - 3)) {
							$scope.pick5Second = race.score.firstNumber;
						}
						if($scope.pick5First && race.number == (raceNum - 2)) {
							$scope.pick5Third = race.score.firstNumber;
						}
						if($scope.pick5First && race.number == (raceNum - 1)) {
							$scope.pick5Fourth = race.score.firstNumber;
						}
					}
					if(checkPick6) {
						if(race.number == (raceNum - 5)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 6') {
									$scope.pick6First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick6First && race.number == (raceNum - 4)) {
							$scope.pick6Second = race.score.firstNumber;
						}
						if($scope.pick6First && race.number == (raceNum - 3)) {
							$scope.pick6Third = race.score.firstNumber;
						}
						if($scope.pick6First && race.number == (raceNum - 2)) {
							$scope.pick6Fourth = race.score.firstNumber;
						}
						if($scope.pick6First && race.number == (raceNum - 1)) {
							$scope.pick6Fifth = race.score.firstNumber;
						}
					}
					if(checkPick7) {
						if(race.number == (raceNum - 6)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 7') {
									$scope.pick7First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick7First && race.number == (raceNum - 5)) {
							$scope.pick7Second = race.score.firstNumber;
						}
						if($scope.pick7First && race.number == (raceNum - 4)) {
							$scope.pick7Third = race.score.firstNumber;
						}
						if($scope.pick7First && race.number == (raceNum - 3)) {
							$scope.pick7Fourth = race.score.firstNumber;
						}
						if($scope.pick7First && race.number == (raceNum - 2)) {
							$scope.pick7Fifth = race.score.firstNumber;
						}
						if($scope.pick7First && race.number == (raceNum - 1)) {
							$scope.pick7Sixth = race.score.firstNumber;
						}
					}
					if(checkPick8) {
						if(race.number == (raceNum - 7)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 8') {
									$scope.pick8First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick8First && race.number == (raceNum - 6)) {
							$scope.pick8Second = race.score.firstNumber;
						}
						if($scope.pick8First && race.number == (raceNum - 5)) {
							$scope.pick8Third = race.score.firstNumber;
						}
						if($scope.pick8First && race.number == (raceNum - 4)) {
							$scope.pick8Fourth = race.score.firstNumber;
						}
						if($scope.pick8First && race.number == (raceNum - 3)) {
							$scope.pick8Fifth = race.score.firstNumber;
						}
						if($scope.pick8First && race.number == (raceNum - 2)) {
							$scope.pick8Sixth = race.score.firstNumber;
						}
						if($scope.pick8First && race.number == (raceNum - 1)) {
							$scope.pick8Seventh = race.score.firstNumber;
						}
					}
					if(checkPick9) {
						if(race.number == (raceNum - 8)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 9') {
									$scope.pick9First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick9First && race.number == (raceNum - 7)) {
							$scope.pick9Second = race.score.firstNumber;
						}
						if($scope.pick9First && race.number == (raceNum - 6)) {
							$scope.pick9Third = race.score.firstNumber;
						}
						if($scope.pick9First && race.number == (raceNum - 5)) {
							$scope.pick9Fourth = race.score.firstNumber;
						}
						if($scope.pick9First && race.number == (raceNum - 4)) {
							$scope.pick9Fifth = race.score.firstNumber;
						}
						if($scope.pick9First && race.number == (raceNum - 3)) {
							$scope.pick9Sixth = race.score.firstNumber;
						}
						if($scope.pick9First && race.number == (raceNum - 2)) {
							$scope.pick9Seventh = race.score.firstNumber;
						}
						if($scope.pick9First && race.number == (raceNum - 1)) {
							$scope.pick9Eighth = race.score.firstNumber;
						}
					}
					if(checkPick10) {
						if(race.number == (raceNum - 9)) {
							race.wagers.forEach(function(wager) {
								if(wager.wager === 'Pick 10') {
									$scope.pick10First = race.score.firstNumber;
								}
							});
						}
						if($scope.pick10First && race.number == (raceNum - 8)) {
							$scope.pick10Second = race.score.firstNumber;
						}
						if($scope.pick10First && race.number == (raceNum - 7)) {
							$scope.pick10Third = race.score.firstNumber;
						}
						if($scope.pick10First && race.number == (raceNum - 6)) {
							$scope.pick10Fourth = race.score.firstNumber;
						}
						if($scope.pick10First && race.number == (raceNum - 5)) {
							$scope.pick10Fifth = race.score.firstNumber;
						}
						if($scope.pick10First && race.number == (raceNum - 4)) {
							$scope.pick10Sixth = race.score.firstNumber;
						}
						if($scope.pick10First && race.number == (raceNum - 3)) {
							$scope.pick10Seventh = race.score.firstNumber;
						}
						if($scope.pick10First && race.number == (raceNum - 2)) {
							$scope.pick10Eighth = race.score.firstNumber;
						}
						if($scope.pick10First && race.number == (raceNum - 1)) {
							$scope.pick10Ninth = race.score.firstNumber;
						}
					}

					if(race.number == raceNum) {
						$scope.race = race;
						race.wagers.forEach(function(wager) {
							if(wager.wager === 'Win') {
								$scope.show1st = true;
							}
							if(wager.wager === 'Place') {
								$scope.show2nd = true;
							}
							if(wager.wager === 'Show') {
								$scope.show3rd = true;
							}
							if(wager.wager === 'Exacta') {
								$scope.showExactaAA = true;
							}
							if(wager.wager === 'Trifecta') {
								$scope.showTrifectaAAA = true;
							}
							if(wager.wager === 'Superfecta') {
								$scope.show4th = true;
								$scope.showSuperfectaAAAA = true;
							}
							if(wager.wager === 'Pentafecta') {
								$scope.show5th = true;
								$scope.showPentafectaAAAAA = true;
							}
							if($scope.doubleFirst) {
								$scope.showDailyDouble = true;
							}
							if($scope.pick3First) {
								$scope.showPickThree = true;
							}
							if($scope.pick4First) {
								$scope.showPickFour = true;
							}
							if($scope.pick5First) {
								$scope.showPickFive = true;
							}
							if(wager.wager === 'Pick 6') {
								$scope.showPickSix = true;
								$scope.showPickSixAlt = true;
							}
							if(wager.wager === 'Pick 7') {
								$scope.showPickSeven = true;
							}
							if(wager.wager === 'Pick 8') {
								$scope.showPickEight = true;
							}
							if(wager.wager === 'Pick 9') {
								$scope.showPickNine = true;
							}
							if(wager.wager === 'Pick 10') {
								$scope.showPickTen = true;
							}
						});
					}
				});
			});
		});

		$scope.getJockey = function(whichJockey) {
			var finderMap = [];
			finderMap['first'] = $scope.firstNumber;
			finderMap['first1stTie'] = $scope.first1stTieNumber;
			finderMap['first2ndTie'] = $scope.first2ndTieNumber;
			finderMap['second'] = $scope.secondNumber;
			finderMap['second1stTie'] = $scope.second1stTieNumber;
			finderMap['second2ndTie'] = $scope.second2ndTieNumber;
			finderMap['third'] = $scope.thirdNumber;
			finderMap['third1stTie'] = $scope.third1stTieNumber;
			finderMap['third2ndTie'] = $scope.third2ndTieNumber;
			finderMap['fourth'] = $scope.fourthNumber;
			finderMap['fourth1stTie'] = $scope.fourth1stTieNumber;
			finderMap['fourth2ndTie'] = $scope.fourth2ndTieNumber;
			finderMap['fifth'] = $scope.fifthNumber;
			finderMap['fifth1stTie'] = $scope.fifth1stTieNumber;
			finderMap['fifth2ndTie'] = $scope.fifth2ndTieNumber;

			var getNumber = finderMap[whichJockey];

			$scope.race.entries.forEach(function(entry) {
				if(entry.number == getNumber) {
					if(whichJockey === 'first') {
						$scope.firstJockey = entry.jockey;
						$scope.firstName = entry.name;
					}
					if(whichJockey === 'first1stTie') {
						$scope.first1stTieJockey = entry.jockey;
						$scope.first1stTieName = entry.name;
					}
					if(whichJockey === 'first2ndTie') {
						$scope.first2ndTieJockey = entry.jockey;
						$scope.first2ndTieName = entry.name;
					}
					if(whichJockey === 'second') {
						$scope.secondJockey = entry.jockey;
						$scope.secondName = entry.name;
					}
					if(whichJockey === 'second1stTie') {
						$scope.second1stTieJockey = entry.jockey;
						$scope.second1stTieName = entry.name;
					}
					if(whichJockey === 'second2ndTie') {
						$scope.second2ndTieJockey = entry.jockey;
						$scope.second2ndTieName = entry.Name;
					}
					if(whichJockey === 'third') {
						$scope.thirdJockey = entry.jockey;
						$scope.thirdName = entry.name;
					}
					if(whichJockey === 'third1stTie') {
						$scope.third1stTieJockey = entry.jockey;
						$scope.third1stTieName = entry.name;
					}
					if(whichJockey === 'third2ndTie') {
						$scope.third2ndTieName = entry.name;
					}
					if(whichJockey === 'fourth') {
						$scope.fourthJockey = entry.jockey;
						$scope.fourthName = entry.name;
					}
					if(whichJockey === 'fourth1stTie') {
						$scope.fourth1stTieJockey = entry.jockey;
						$scope.fourth1stTieName = entry.name;
					}
					if(whichJockey === 'fourth2ndTie') {
						$scope.fourth2ndTieJockey = entry.jockey;
						$scope.fourth2ndTieName = entry.name;
					}
					if(whichJockey === 'fifth') {
						$scope.fifthJockey = entry.jockey;
						$scope.fifthName = entry.name;
					}
					if(whichJockey === 'fifth1stTie') {
						$scope.fifth1stTieJockey = entry.jockey;
						$scope.fifth1stTieName = entry.name;
					}
					if(whichJockey === 'fifth2ndTie') {
						$scope.fifth2ndTieJockey = entry.name;
						$scope.fifth2ndTieName = entry.name;
					}
				}
			});
		};

		$scope.updateExotics = function(posAndVal) {
			var pavPcs = posAndVal.split('-');
			var pos = pavPcs[0];
			var val = pavPcs[1];

			if(pos === 'first') {
				if($scope.showExactaAA) {
					$scope.updateExacta(pos, val);
				}
				if($scope.showTrifectaAAA) {
					$scope.updateTrifecta(pos, val);
				}
				if($scope.showSuperfectaAAAA) {
					$scope.updateSuperfecta(pos, val);
				}
				if($scope.showPentafectaAAAAA) {
					$scope.updatePentafecta(pos, val);
				}

				if($scope.showDailyDouble) {
					$scope.updateDailyDouble();
				}
				if($scope.pick3First) {
					$scope.updatePick3();
				}
				if($scope.pick4First) {
					$scope.updatePick4();
				}
				if($scope.pick5First) {
					$scope.updatePick5();
				}
				if($scope.pick6First) {
					$scope.updatePick6();
				}
				if($scope.pick7First) {
					$scope.updatePick7();
				}
				if($scope.pick8First) {
					$scope.updatePick8();
				}
				if($scope.pick9First) {
					$scope.updatePick9();
				}
				if($scope.pick10First) {
					$scope.updatePick10();
				}
			}

			if(pos === 'second') {
				if($scope.showExactaAA) {
					$scope.updateExacta(pos, val);
				}
				if($scope.showTrifectaAAA) {
					$scope.updateTrifecta(pos, val);
				}
				if($scope.showSuperfectaAAAA) {
					$scope.updateSuperfecta(pos, val);
				}
				if($scope.showPentafectaAAAAA) {
					$scope.updatePentafecta(pos, val);
				}
			}

			if(pos === 'third') {
				if($scope.showTrifectaAAA) {
					$scope.updateTrifecta(pos, val);
				}
				if($scope.showSuperfectaAAAA) {
					$scope.updateSuperfecta(pos, val);
				}
				if($scope.showPentafectaAAAAA) {
					$scope.updatePentafecta(pos, val);
				}
			}

			if(pos === 'fourth') {
				if($scope.showSuperfectaAAAA) {
					$scope.updateSuperfecta(pos, val);
				}
				if($scope.showPentafectaAAAAA) {
					$scope.updatePentafecta(pos, val);
				}
			}

			if(pos === 'fifth') {
				if($scope.showPentafectaAAAAA) {
					$scope.updatePentafecta(pos, val);
				}
			}
		}

		$scope.updateExacta = function(pos, val) {
			if($scope.exacta.length > 1){
				$scope.exactaPcs = $scope.exacta.split('/');
				if(pos === 'first') {
					if(val === 'firstNumber') {
						$scope.exactaPcs[0] = $scope.firstNumber;
					}
				}
				if(pos === 'second') {
					if(val === 'secondNumber') {
						$scope.exactaPcs[1] = $scope.secondNumber;
					}
				}
			} else {
				$scope.exactaPcs = [];
			}
			if(pos === 'first') {
				if(val === 'firstNumber') {
					$scope.exactaPcs.push($scope.firstNumber);
				}
				if($scope.exactaPcs[1] === undefined) {
					$scope.exactaPcs[1] = '';
				}
			}
			if(pos === 'second') {
				if(val === 'secondNumber') {
					$scope.exactaPcs.push('');
					$scope.exactaPcs.push($scope.secondNumber);
				}
				if($scope.exactaPcs[0] === undefined) {
					$scope.exactaPcs[0] = '';
				}
			}
			$scope.exacta = 
				$scope.exactaPcs[0] + '/' + 
				$scope.exactaPcs[1];
		}

		$scope.updateTrifecta = function(pos, val) {
			if($scope.trifecta.length > 1){
				$scope.trifectaPcs = $scope.trifecta.split('/');
				if(pos === 'first') {
					if(val === 'firstNumber') {
						$scope.trifectaPcs[0] = $scope.firstNumber;
					}
				}
				if(pos === 'second') {
					if(val === 'secondNumber') {
						$scope.trifectaPcs[1] = $scope.secondNumber;
					}
				}
				if(pos === 'third') {
					if(val === 'thirdNumber') {
						$scope.trifectaPcs[2] = $scope.thirdNumber;
					}
				}
			} else {
				$scope.trifectaPcs = [];
			}
			if(pos === 'first') {
				if(val === 'firstNumber') {
					$scope.trifectaPcs.push($scope.firstNumber);
				}
				if($scope.trifectaPcs[1] === undefined) {
					$scope.trifectaPcs[1] = '';
				}
				if($scope.trifectaPcs[2] === undefined) {
					$scope.trifectaPcs[2] = '';
				}
			}
			if(pos === 'second') {
				if(val === 'secondNumber') {
					$scope.trifectaPcs.push('');
					$scope.trifectaPcs.push($scope.secondNumber);
				}
				if($scope.trifectaPcs[0] === undefined) {
					$scope.trifectaPcs[0] = '';
				}
				if($scope.trifectaPcs[2] === undefined) {
					$scope.trifectaPcs[2] = '';
				}
			}
			if(pos === 'third') {
				if(val === 'thirdNumber') {
					$scope.trifectaPcs.push('');
					$scope.trifectaPcs.push('');
					$scope.trifectaPcs.push($scope.thirdNumber);
				}
				if($scope.trifectaPcs[0] === undefined) {
					$scope.trifectaPcs[0] = '';
				}
				if($scope.trifectaPcs[1] === undefined) {
					$scope.trifectaPcs[1] = '';
				}
			}
			$scope.trifecta = 
				$scope.trifectaPcs[0] + '/' + 
				$scope.trifectaPcs[1] + '/' + 
				$scope.trifectaPcs[2];
		}

		$scope.updateSuperfecta = function(pos, val) {
			if($scope.superfecta.length > 1){
				$scope.superfectaPcs = $scope.superfecta.split('/');
				if(pos === 'first') {
					if(val === 'firstNumber') {
						$scope.superfectaPcs[0] = $scope.firstNumber;
					}
				}
				if(pos === 'second') {
					if(val === 'secondNumber') {
						$scope.superfectaPcs[1] = $scope.secondNumber;
					}
				}
				if(pos === 'third') {
					if(val === 'thirdNumber') {
						$scope.superfectaPcs[2] = $scope.thirdNumber;
					}
				}
				if(pos === 'fourth') {
					if(val === 'fourthNumber') {
						$scope.superfectaPcs[3] = $scope.fourthNumber;
					}
				}
			} else {
				$scope.superfectaPcs = [];
			}
			if(pos === 'first') {
				if(val === 'firstNumber') {
					$scope.superfectaPcs.push($scope.firstNumber);
				}
				if($scope.superfectaPcs[1] === undefined) {
					$scope.superfectaPcs[1] = '';
				}
				if($scope.superfectaPcs[2] === undefined) {
					$scope.superfectaPcs[2] = '';
				}
				if($scope.superfectaPcs[3] === undefined) {
					$scope.superfectaPcs[3] = '';
				}
			}
			if(pos === 'second') {
				if(val === 'secondNumber') {
					$scope.superfectaPcs.push('');
					$scope.superfectaPcs.push($scope.secondNumber);
				}
				if($scope.superfectaPcs[0] === undefined) {
					$scope.superfectaPcs[0] = '';
				}
				if($scope.superfectaPcs[2] === undefined) {
					$scope.superfectaPcs[2] = '';
				}
				if($scope.superfectaPcs[3] === undefined) {
					$scope.superfectaPcs[3] = '';
				}
			}
			if(pos === 'third') {
				if(val === 'thirdNumber') {
					$scope.superfectaPcs.push('');
					$scope.superfectaPcs.push('');
					$scope.superfectaPcs.push($scope.thirdNumber);
				}
				if($scope.superfectaPcs[0] === undefined) {
					$scope.superfectaPcs[0] = '';
				}
				if($scope.superfectaPcs[1] === undefined) {
					$scope.superfectaPcs[1] = '';
				}
				if($scope.superfectaPcs[3] === undefined) {
					$scope.superfectaPcs[3] = '';
				}
			}
			if(pos === 'fourth') {
				if(val === 'fourthNumber') {
					$scope.superfectaPcs.push('');
					$scope.superfectaPcs.push('');
					$scope.superfectaPcs.push('');
					$scope.superfectaPcs.push($scope.fourthNumber);
				}
				if($scope.superfectaPcs[0] === undefined) {
					$scope.superfectaPcs[0] = '';
				}
				if($scope.superfectaPcs[1] === undefined) {
					$scope.superfectaPcs[1] = '';
				}
				if($scope.superfectaPcs[2] === undefined) {
					$scope.superfectaPcs[2] = '';
				}
			}
			$scope.superfecta = 
				$scope.superfectaPcs[0] + '/' + 
				$scope.superfectaPcs[1] + '/' + 
				$scope.superfectaPcs[2] + '/' + 
				$scope.superfectaPcs[3];
		}

		$scope.updatePentafecta = function(pos, val) {
			if($scope.pentafecta.length > 1) {
				$scope.pentafectaPcs = $scope.pentafecta.split('/');
				if(pos === 'first') {
					if(val === 'firstNumber') {
						$scope.pentafectaPcs[0] = $scope.firstNumber;
					}
				}
				if(pos === 'second') {
					if(val === 'secondNumber') {
						$scope.pentafectaPcs[1] = $scope.secondNumber;
					}
				}
				if(pos === 'third') {
					if(val === 'thirdNumber') {
						$scope.pentafectaPcs[2] = $scope.thirdNumber;
					}
				}
				if(pos === 'fourth') {
					if(val === 'fourthNumber') {
						$scope.pentafectaPcs[3] = $scope.fourthNumber;
					}
				}
				if(pos === 'fifth') {
					if(val === 'fifthNumber') {
						$scope.pentafectaPcs[4] = $scope.fifthNumber;
					}
				}
			} else {
				$scope.pentafectaPcs = [];
			}
			if(pos === 'first') {
				if(val === 'firstNumber') {
					$scope.pentafectaPcs.push($scope.firstNumber);
				}
				if($scope.pentafectaPcs[1] === undefined) {
					$scope.pentafectaPcs[1] = '';
				}
				if($scope.pentafectaPcs[2] === undefined) {
					$scope.pentafectaPcs[2] = '';
				}
				if($scope.pentafectaPcs[3] === undefined) {
					$scope.pentafectaPcs[3] = '';
				}
				if($scope.pentafectaPcs[4] === undefined) {
					$scope.pentafectaPcs[4] = '';
				}
			}
			if(pos === 'second') {
				if(val === 'secondNumber') {
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push($scope.secondNumber);
				}
				if($scope.pentafectaPcs[0] === undefined) {
					$scope.pentafectaPcs[0] = '';
				}
				if($scope.pentafectaPcs[2] === undefined) {
					$scope.pentafectaPcs[2] = '';
				}
				if($scope.pentafectaPcs[3] === undefined) {
					$scope.pentafectaPcs[3] = '';
				}
				if($scope.pentafectaPcs[4] === undefined) {
					$scope.pentafectaPcs[4] = '';
				}
			}
			if(pos === 'third') {
				if(val === 'thirdNumber') {
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push($scope.thirdNumber);
				}
				if($scope.pentafectaPcs[0] === undefined) {
					$scope.pentafectaPcs[0] = '';
				}
				if($scope.pentafectaPcs[1] === undefined) {
					$scope.pentafectaPcs[1] = '';
				}
				if($scope.pentafectaPcs[3] === undefined) {
					$scope.pentafectaPcs[3] = '';
				}
				if($scope.pentafectaPcs[4] === undefined) {
					$scope.pentafectaPcs[4] = '';
				}
			}
			if(pos === 'fourth') {
				if(val === 'fourthNumber') {
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push($scope.fourthNumber);
				}
				if($scope.pentafectaPcs[0] === undefined) {
					$scope.pentafectaPcs[0] = '';
				}
				if($scope.pentafectaPcs[1] === undefined) {
					$scope.pentafectaPcs[1] = '';
				}
				if($scope.pentafectaPcs[2] === undefined) {
					$scope.pentafectaPcs[2] = '';
				}
				if($scope.pentafectaPcs[4] === undefined) {
					$scope.pentafectaPcs[4] = '';
				}
			}
			if(pos === 'fifth') {
				if(val === 'fifthNumber') {
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push('');
					$scope.pentafectaPcs.push($scope.fifthNumber);
				}
				if($scope.pentafectaPcs[0] === undefined) {
					$scope.pentafectaPcs[0] = '';
				}
				if($scope.pentafectaPcs[1] === undefined) {
					$scope.pentafectaPcs[1] = '';
				}
				if($scope.pentafectaPcs[2] === undefined) {
					$scope.pentafectaPcs[2] = '';
				}
				if($scope.pentafectaPcs[3] === undefined) {
					$scope.pentafectaPcs[3] = '';
				}
			}
			$scope.pentafecta = 
				$scope.pentafectaPcs[0] + '/' + 
				$scope.pentafectaPcs[1] + '/' + 
				$scope.pentafectaPcs[2] + '/' + 
				$scope.pentafectaPcs[3] + '/' + 
				$scope.pentafectaPcs[4];
		}

		$scope.updateDailyDouble = function() {
			$scope.dailyDouble = 
				$scope.doubleFirst + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick3 = function() {
			$scope.pick3 = 
				$scope.pick3First + '/' + 
				$scope.pick3Second + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick4 = function() {
			$scope.pick4 = 
				$scope.pick4First + '/' + 
				$scope.pick4Second + '/' + 
				$scope.pick4Third + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick5 = function() {
			$scope.pick5 = 
				$scope.pick5First + '/' + 
				$scope.pick5Second + '/' + 
				$scope.pick5Third + '/' + 
				$scope.pick5Fourth + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick6 = function() {
			$scope.pick6 = 
				$scope.pick6First + '/' + 
				$scope.pick6Second + '/' + 
				$scope.pick6Third + '/' + 
				$scope.pick6Fourth + '/' + 
				$scope.pick6Fifth + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick7 = function() {
			$scope.pick7 = 
				$scope.pick7First + '/' + 
				$scope.pick7Second + '/' + 
				$scope.pick7Third + '/' + 
				$scope.pick7Fourth + '/' + 
				$scope.pick7Fifth + '/' + 
				$scope.pick7Sixth + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick8 = function() {
			$scope.pick8 = 
				$scope.pick8First + '/' + 
				$scope.pick8Second + '/' + 
				$scope.pick8Third + '/' + 
				$scope.pick8Fourth + '/' + 
				$scope.pick8Fifth + '/' + 
				$scope.pick8Sixth + '/' + 
				$scope.pick8Seventh + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick9 = function() {
			$scope.pick9 = 
				$scope.pick9First + '/' + 
				$scope.pick9Second + '/' + 
				$scope.pick9Third + '/' + 
				$scope.pick9Fourth + '/' + 
				$scope.pick9Fifth + '/' + 
				$scope.pick9Sixth + '/' + 
				$scope.pick9Seventh + '/' + 
				$scope.pick9Eighth + '/' + 
				$scope.firstNumber;
		}

		$scope.updatePick10 = function() {
			$scope.pick10 = 
				$scope.pick10First + '/' + 
				$scope.pick10Second + '/' + 
				$scope.pick10Third + '/' + 
				$scope.pick10Fourth + '/' + 
				$scope.pick10Fifth + '/' + 
				$scope.pick10Sixth + '/' + 
				$scope.pick10Seventh + '/' + 
				$scope.pick10Eighth + '/' + 
				$scope.pick10Ninth + '/' + 
				$scope.firstNumber;
		}

		$scope.score = function() {
			var score = {};
			score.trId = $scope.trId;
			score.raceNum = $scope.raceNum;
			score.firstNumber = $scope.firstNumber;
			score.firstName = $scope.firstName;
			score.firstJockey = $scope.firstJockey;
			score.firstWinPrice = $scope.firstWinPrice;

			if($scope.firstPlacePrice) {
				score.firstPlacePrice = $scope.firstPlacePrice;
			}

			if($scope.firstShowPrice) {
				score.firstShowPrice = $scope.firstShowPrice;
			}

			if($scope.secondNumber) {
				score.secondNumber = $scope.secondNumber;
				score.secondName = $scope.secondName;
				score.secondJockey = $scope.secondJockey;
				score.secondPlacePrice = $scope.secondPlacePrice;
				if($scope.secondShowPrice) {
					score.secondShowPrice = $scope.secondShowPrice;
				}
				score.exacta = $scope.exacta;
				if($scope.exactaPrice1Base) {
					score.exactaPrice = parseFloat($scope.exactaPrice1Base * 2);
				}
				if($scope.exactaPrice2Base) {
					score.exactaPrice = parseFloat($scope.exactaPrice2Base);
				}
			}

			if($scope.thirdNumber) {
				score.thirdNumber = $scope.thirdNumber;
				score.thirdName = $scope.thirdName;
				score.thirdJockey = $scope.thirdJockey;
				score.thirdShowPrice = $scope.thirdShowPrice;
				score.trifecta = $scope.trifecta;
				if($scope.trifectaPricePoint2Base) {
					score.trifectaPrice = parseFloat($scope.trifectaPricePoint2Base * 10);
				}
				if($scope.trifectaPricePoint5Base) {
					score.trifectaPrice = parseFloat($scope.trifectaPricePoint5Base * 4);
				}
				if($scope.trifectaPrice1Base) {
					score.trifectaPrice = parseFloat($scope.trifectaPrice1Base * 2);
				}
				if($scope.trifectaPrice2Base) {
					score.trifectaPrice = parseFloat($scope.trifectaPrice2Base);
				}
			}

			if($scope.fourthNumber) {
				score.fourthNumber = $scope.fourthNumber;
				score.fourthName = $scope.fourthName;
				score.fourthJockey = $scope.fourthJockey;
			}

			if($scope.fifthNumber) {
				score.fifthNumber = $scope.fifthNumber;
				score.fifthName = $scope.fifthName;
				score.fifthJockey = $scope.fifthJockey;
			}

			if($scope.superfectaPricePoint1Base) {
				score.superfecta = $scope.superfecta;
				score.superfectaPrice = parseFloat($scope.superfectaPricePoint1Base * 20);
			}
			if($scope.superfectaPricePoint2Base) {
				score.superfecta = $scope.superfecta;
				score.superfectaPrice = parseFloat($scope.superfectaPricePoint2Base * 10);
			}
			if($scope.superfectaPricePoint5Base) {
				score.superfecta = $scope.superfecta;
				score.superfectaPrice = parseFloat($scope.superfectaPricePoint5Base * 4);
			}
			if($scope.superfectaPrice1Base) {
				score.superfecta = $scope.superfecta;
				score.superfectaPrice = parseFloat($scope.superfectaPrice1Base * 2);
			}
			if($scope.superfectaPrice2Base) {
				score.superfecta = $scope.superfecta;
				score.superfectaPrice = parseFloat($scope.superfectaPrice2Base);
			}

			if($scope.pentafectaPricePoint1Base) {
				score.pentafecta = $scope.pentafecta;
				score.pentafectaPrice = parseFloat($scope.pentafectaPricePoint1Base * 20);
			}
			if($scope.pentafectaPricePoint2Base) {
				score.pentafecta = $scope.pentafecta;
				score.pentafectaPrice = parseFloat($scope.pentafectaPricePoint2Base * 10);
			}
			if($scope.pentafectaPricePoint5Base) {
				score.pentafecta = $scope.pentafecta;
				score.pentafectaPrice = parseFloat($scope.pentafectaPricePoint5Base * 4);
			}
			if($scope.pentafectaPrice1Base) {
				score.pentafecta = $scope.pentafecta;
				score.pentafectaPrice = parseFloat($scope.pentafectaPrice1Base * 2);
			}
			if($scope.pentafectaPrice2Base) {
				score.pentafecta = $scope.pentafecta;
				score.pentafectaPrice = parseFloat($scope.pentafectaPrice2Base);
			}

			if($scope.dailyDoublePrice1Base) {
				score.dailyDouble = $scope.dailyDouble;
				score.dailyDoublePrice = parseFloat($scope.dailyDoublePrice1Base * 2);
			}
			if($scope.dailyDoublePrice2Base) {
				score.dailyDouble = $scope.dailyDouble;
				score.dailyDoublePrice = parseFloat($scope.dailyDoublePrice2Base);
			}

			if($scope.pick3PricePoint2Base) {
				score.pick3 = $scope.pick3;
				score.pick3Price = parseFloat($scope.pick3PricePoint2Base * 10);
			}
			if($scope.pick3PricePoint5Base) {
				score.pick3 = $scope.pick3;
				score.pick3Price = parseFloat($scope.pick3PricePoint5Base * 4);
			}
			if($scope.pick3Price1Base) {
				score.pick3 = $scope.pick3;
				score.pick3Price = parseFloat($scope.pick3Price1Base * 2);
			}
			if($scope.pick3Price2Base) {
				score.pick3 = $scope.pick3;
				score.pick3Price = parseFloat($scope.pick3Price2Base);
			}

			if($scope.pick4PricePoint2Base) {
				score.pick4 = $scope.pick4;
				score.pick4Price = parseFloat($scope.pick4PricePoint2Base * 10);
			}
			if($scope.pick4PricePoint5Base) {
				score.pick4 = $scope.pick4;
				score.pick4Price = parseFloat($scope.pick4PricePoint5Base * 4);
			}
			if($scope.pick4Price1Base) {
				score.pick4 = $scope.pick4;
				score.pick4Price = parseFloat($scope.pick4Price1Base * 2);
			}
			if($scope.pick4Price2Base) {
				score.pick4 = $scope.pick4;
				score.pick4Price = parseFloat($scope.pick4Price2Base);
			}

			if($scope.pick5PricePoint2Base) {
				score.pick5 = $scope.pick5;
				score.pick5Price = parseFloat($scope.pick5PricePoint2Base * 10);
			}
			if($scope.pick5PricePoint5Base) {
				score.pick5 = $scope.pick5;
				score.pick5Price = parseFloat($scope.pick5PricePoint5Base * 4);
			}
			if($scope.pick5Price1Base) {
				score.pick5 = $scope.pick5;
				score.pick5Price = parseFloat($scope.pick5Price1Base * 2);
			}
			if($scope.pick5Price2Base) {
				score.pick5 = $scope.pick5;
				score.pick5Price = parseFloat($scope.pick5Price2Base);
			}

			if($scope.pick6PricePoint2Base) {
				score.pick6 = $scope.pick6;
				score.pick6Price = parseFloat($scope.pick6PricePoint2Base * 10);
			}
			if($scope.pick6PricePoint5Base) {
				score.pick6 = $scope.pick6;
				score.pick6Price = parseFloat($scope.pick6PricePoint5Base * 4);
			}
			if($scope.pick6Price1Base) {
				score.pick6 = $scope.pick6;
				score.pick6Price = parseFloat($scope.pick6Price1Base * 2);
			}
			if($scope.pick6Price2Base) {
				score.pick6 = $scope.pick6;
				score.pick6Price = parseFloat($scope.pick6Price2Base);
			}

			if($scope.pick6ConsolationPrice) {
				score.pick6Consolation = $scope.pick6Consolation;
				score.pick6ConsolationPrice = $scope.pick6ConsolationPrice;
			}

			if($scope.pick7Price) {
				score.pick7 = $scope.pick7;
				score.pick7Price = $scope.pick7Price;
			}

			if($scope.pick8Price) {
				score.pick8 = $scope.pick8;
				score.pick8Price = $scope.pick8Price;
			}

			if($scope.pick9Price) {
				score.pick9 = $scope.pick9;
				score.pick9Price = $scope.pick9Price;
			}

			if($scope.pick10Price) {
				score.pick10 = $scope.pick10;
				score.pick10Price = $scope.pick10Price;
			}

			$scope.race.score = score;

			var newRaces = [];

			$scope.trdData.races.forEach(function(race) {
				if(race.number === $scope.race.number) {
					newRaces.push($scope.race);
				} else {
					newRaces.push(race);
				}
			});

			var shouldScoreTournament = false;
			var racesCount = $scope.trdData.races.length;
			if(parseInt(score.raceNum) == racesCount) {
				shouldScoreTournament = true;
			}

//			shouldScoreTournament = true // <-- debug code

			$scope.trdData.races = newRaces;

			var scoreTrdPromise = trdMgmt.scoreTrd({trdData: $scope.trdData, trId: $scope.trId, raceNum: $scope.raceNum, customerId: $scope.customerId});
			scoreTrdPromise.then(function(scoreTrdPromiseResponse) {
				if(scoreTrdPromiseResponse.data.success) {
					var tournamentId = scoreTrdPromiseResponse.data.acIds[0];
					if(shouldScoreTournament) {
						var scoreTournament = tournamentMgmt.scoreTournament(tournamentId);
						scoreTournament.then(function(scoreTournamentResponse) {
							$window.location.href = location.origin + "/app/";
						});
					} else {
						$window.location.href = location.origin + "/app/";
					}
				} else {
console.log('response:');
console.log(response);
				}
			});
		}

	}
}());
