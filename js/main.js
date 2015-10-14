console.log("main.js loaded");
//==========================GLOBAL VARIABLES=======================================
//var playerPoints = [0, 0, 0, 0, 0, 0]
var currentTurn, cardColor, $colorTarget
var $mainCard = $('<div id="deckDefault" class="card xlarge back">')
var redCards = ["dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02"]
var blackCards = ["cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
var $playersArray, $playerName1, $playerName2, $playerName3, $playerName4, $playerName5, $playerName6
var $gameRule, $redButton, $blackButton, $lowerButton, $higherButton
var counter = -1;
//============================GLOBAL FUNCTIONS=====================================
var getPlayerNames = function() {
	$playersArray = []
	$playerName1 = [$('#player-name1').val()]
	$playerName2 = [$('#player-name2').val()]
	$playerName3 = [$('#player-name3').val()]
	$playerName4 = [$('#player-name4').val()]
	$playerName5 = [$('#player-name5').val()]
	$playerName6 = [$('#player-name6').val()]
	if ($playerName1[0]) {
		$playersArray.push($playerName1)
	} 
	if ($playerName2[0]) {
		$playersArray.push($playerName2)
	}
	if ($playerName3[0]) {
		$playersArray.push($playerName3)
	}
	if ($playerName4[0]) {
		$playersArray.push($playerName4)
	}
	if ($playerName5[0]) {
		$playersArray.push($playerName5)
	}
	if ($playerName6[0]) {
		$playersArray.push($playerName6)
	}
	console.log($playersArray);
}

var getRule = function() {
	$('.playerNameDiv, #beginGame').hide("slow");
	$('#description').text("Make a rule or punishment for the winner of the game to follow. Be as nice or mean as you dare!");
	$('#playerArea').append($('<input id="ruleInput"> <div id="ruleButtons">'));
	$('#ruleButtons').append($('<button id="myRuleButton"> My Rule is Awesome </button>'));
	//<button id="randomRule"> Randomize Me Bro</button>
}

var setupFirstRound = function() {
	//$('#myRuleButton').click(function() {
		$gameRule = $('#ruleInput').val();
		console.log($gameRule);

		$('#ruleInput, #ruleButtons').hide("slow");
		$('#description').text("Will your card be red or black? Select a color to choose");
		$('.pageTitle').text("Up the River | Round 1");

		$('#playerArea').append('<div id="playerList">');
		for (var i = 0; i < $playersArray.length; i++) {
			$('#playerList').append($('<h3>').append($playersArray[i]));
			//($('<p class="points">Points:</p>')).insertAfter($('#playerList h3:nth-child(' + (i++) + ')'));
			console.log($playersArray[i]);
		}
		$redButton = $('<div class="red">').addClass("colorButtons");
		$blackButton = $('<div class="black">').addClass("colorButtons");
		$('#cardArea').append($redButton);
		$('#cardArea').append($blackButton);
	//}
}

var determineTurn = function() {
		counter++;
		//reset round of turns
		if (counter > ($playersArray.length - 1)) {
			counter = -1;
		}
		// $playersArray.forEach(function(event, index){
		// 	if (event === currentTurn) counter++ 
		// 	if (counter === $playersArray.length) {
		// 		counter = 0;
		// 	}
		// });
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

var setupMainCard = function() {
	$('#playerArea').append('<div id="cardArea">');
	$('#cardArea').append($mainCard);
}

var drawCard = function(){
			var lastClass = $mainCard.attr('class').split(' ').pop();
			$mainCard.removeClass(lastClass);
			$mainCard.addClass(pickRandom);
}

var playRound1 = function() {
		//
			$('.colorButtons').click(function(evt) {
			 	drawCard();
			 	determineTurn();
			 	compareColor();
				//console.log(evt.target);

				$colorTarget = $(evt.target);

				if (($colorTarget).hasClass("red") && cardColor === "red"){
					console.log("Red was the right guess");
					currentTurn.push(0);
				} else if (($colorTarget).hasClass("red") && cardColor === "black") {
					console.log("Red was the wrong guess");
					currentTurn.push(1);
				} else if (($colorTarget).hasClass("black") && cardColor === "black") {
					console.log("black was the right guess");
					currentTurn.push(0);
				} else if (($colorTarget).hasClass("black") && cardColor === "red") {
					console.log("black was the wrong guess");
					currentTurn.push(1);
				}
				//move to next round
				if (counter > ($playersArray.length -2)) {
				setupSecondRound();
				//$('#playerArea').append('<button class="nextRound">We wanna drink more!</button>');
				}
			 });
}

//Round 1 compare color
var compareColor = function() {
	for (i=0; i < redCards.length; i++) {
		if ($mainCard.hasClass(redCards[i])) {
			//console.log('card is red AF');
			cardColor = "red";
		}	
	}
	for (i=0; i < blackCards.length; i++) {
		if ($mainCard.hasClass(blackCards[i])) {
			//console.log('card is black dawg');
			cardColor = "black";
		}	
	}
}

var setupSecondRound = function() {
	$('.colorButtons').hide("slow");
	$lowerButton = $('<div class="lower">-</div>').addClass("higherLowerButtons");
	$higherButton = $('<div class="higher">+</div>').addClass("higherLowerButtons");
	$('#cardArea').append($lowerButton);
	$('#cardArea').append($higherButton);
	$('.pageTitle').text("Up the River | Round 2");
	$('#description').text("Will your card be higher or lower? Select a button to choose");
}

var playRound2 = function() {
	$('.higherLowerButtons').click(function(){
		console.log("Start round 2 mofo");
	});
}

//=========================RUN GAME========================================
function startGame() {
	getPlayerNames();
	getRule();
	$('#myRuleButton').click(function() {
	 	setupMainCard();
	 	setupFirstRound();
	 	playRound1();
	});
	playRound2();
}



$('#beginGame').click(startGame);


