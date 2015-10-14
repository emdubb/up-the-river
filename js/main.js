console.log("main.js loaded");

var playerPoints = [0, 0, 0, 0, 0, 0]
var counter, currentTurn, cardColor, $colorTarget;
var $mainCard = $('<div id="deckDefault" class="card xlarge back">');
var redCards = ["dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02"]
var blackCards = ["cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
//put variable above and then return the value on click

	var $playersArray
	var $playerName1
	var $playerName2
	var $playerName3
	var $playerName4
	var $playerName5
	var $playerName6

function startGame() {
	$playersArray = [];
	$playerName1 = $('#player-name1').val();
	$playerName2 = $('#player-name2').val();
	$playerName3 = $('#player-name3').val();
	$playerName4 = $('#player-name4').val();
	$playerName5 = $('#player-name5').val();
	$playerName6 = $('#player-name6').val();
	if ($playerName1) {
		$playersArray.push($playerName1)
	} 
	if ($playerName2) {
		$playersArray.push($playerName2)
	}
	if ($playerName3) {
		$playersArray.push($playerName3)
	}
	if ($playerName4) {
		$playersArray.push($playerName4)
	}
	if ($playerName5) {
		$playersArray.push($playerName5)
	}
	if ($playerName6) {
		$playersArray.push($playerName6)
	}
	//var $playersArray = [$playerName1, $playerName2, $playerName3, $playerName4, $playerName5, $playerName6];
	console.log($playersArray);

	$('.playerNameDiv, #beginGame').hide("slow");
	$('#description').text("Make a rule or punishment for the winner of the game to follow. Be as nice or mean as you dare!");
	$('#playerArea').append($('<input id="ruleInput"> <div id="ruleButtons">'));
	$('#ruleButtons').append($('<button id="myRuleButton"> My Rule is Awesome </button>'));
	//<button id="randomRule"> Randomize Me Bro</button>
	$('#myRuleButton').click(function() {
		var $gameRule = $('#ruleInput').val();
		console.log($gameRule);

		$('#ruleInput, #ruleButtons').hide(function() {
			});
		$('#description').text("Will your card be red or black? Select a color to choose");

		$('#playerArea').append('<div id="playerList">')
		for (var i = 0; i < $playersArray.length; i++) {
			$('#playerList').append($('<h3>').append($playersArray[i]));
			//($('<p class="points">Points:</p>')).insertAfter($('#playerList h3:nth-child(' + (i++) + ')'));
			console.log($playersArray[i]);
		}
		//Determine Turn
		counter = 0;
		var nextTurn = function(){
			$playersArray.forEach(function(event, index){
				if (event === currentTurn) counter++;
				if (counter === $playersArray.length) {
					counter = 0;
				}
			});
			switch (counter) {
				case 1:
					currentTurn = $playersArray[1];
					break;
				case 2:
					currentTurn = $playersArray[2];
					break;
				case 3:
					currentTurn = $playersArray[3];
					break;
				case 4:
					currentTurn = $playersArray[4];
					break;
				case 5:
					currentTurn = $playersArray[5];
					break;
				default:
					currentTurn = $playersArray[0];
					break;
			}
			console.log('current turn is ' + currentTurn);
			console.log('counter is ' + counter);
		}

//Round 1 ===============================================================================

		var $redButton = $('<div class="red">').addClass("colorButtons");
		var $blackButton = $('<div class="black">').addClass("colorButtons");

		$('#playerArea').append('<div id="cardArea">');
		$('#cardArea').append($redButton);
		$('#cardArea').append($blackButton);

		//Make card
		
		$('#cardArea').append($mainCard);

		//Draw a card
		var drawCard = function(){
			var lastClass = $mainCard.attr('class').split(' ').pop();
			$mainCard.removeClass(lastClass);
			$mainCard.addClass(pickRandom);
			//$mainCard.removeClass('back');
		}

		var compareColor = function() {
			for (i=0; i < redCards.length; i++) {
				if ($mainCard.hasClass(redCards[i])) {
					console.log('card is red AF');
					cardColor = "red";
				}	
			}
			for (i=0; i < blackCards.length; i++) {
				if ($mainCard.hasClass(blackCards[i])) {
					console.log('card is black dawg');
					cardColor = "black";
				}	
			}
		}

		var round1 = function() {
			currentTurn
		}

		 $('.colorButtons').click(function(evt) {
		 	drawCard();
		 	nextTurn();
		 	compareColor();
			console.log(evt.target);
			$colorTarget = $(evt.target);
			
				if (($colorTarget).hasClass("red") && cardColor === "red"){
					console.log("Red was the right guess");
				} else if (($colorTarget).hasClass("red") && cardColor === "black") {
					console.log("Red was the wrong guess");
				} else if (($colorTarget).hasClass("black") && cardColor === "black") {
					console.log("black was the right guess");
				} else if (($colorTarget).hasClass("black") && cardColor === "red") {
					console.log("black was the wrong guess");
				} else {
					console.log("you fucked up, bruh");
				}
			
			
		 });
	})
}

$('#beginGame').click(startGame);


