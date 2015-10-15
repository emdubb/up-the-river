console.log("main.js loaded");
//==========================GLOBAL VARIABLES=======================================
//var playerPoints = [0, 0, 0, 0, 0, 0]
var currentTurn, cardColor, $colorTarget, lastClass, cardHighOrLow, inBetween, outside, onTheFence
var $mainCard = $('<div id="deckDefault" class="card xlarge back">')
var redCards = ["dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02"]
var blackCards = ["cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
var $playersArray, $playerName1, $playerName2, $playerName3, $playerName4, $playerName5, $playerName6
var $gameRule, $redButton, $blackButton, $lowerButton, $higherButton
var counter = -1;
var cardNumbers = {
	h02: 1, d02: 1, c02: 1, s02: 1,
	h03: 2, d03: 2, c03: 2, s03: 2,
	h04: 3, d04: 3, c04: 3, s04: 3,
	h05: 4, d05: 4, c05: 4, s05: 4,
	h06: 5, d06: 5, c06: 5, s06: 5,
	h07: 6, d07: 6, c07: 6, s07: 6,
	h08: 7, d08: 7, c08: 7, s08: 7,
	h09: 8, d09: 8, c09: 8, s09: 8,
	h10: 9, d10: 9, c10: 9, s10: 9,
	hJ: 10, dJ: 10, cJ: 10, sJ: 10,
	hQ: 11, dQ: 11, cQ: 11, sQ: 11,
	hK: 12, dK: 12, cK: 12, sK: 12,
	hA: 13, dA: 13, cA: 13, sA: 13
};


//============================GLOBAL FUNCTIONS=====================================
var getPlayerNames = function() {
	$playersArray = []
	$playerName1 = [$('#player-name1').val(), 0]
	$playerName2 = [$('#player-name2').val(), 0]
	$playerName3 = [$('#player-name3').val(), 0]
	$playerName4 = [$('#player-name4').val(), 0]
	$playerName5 = [$('#player-name5').val(), 0]
	$playerName6 = [$('#player-name6').val(), 0]
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
			$($('<div>').addClass("player" + i)).appendTo('#playerList');
			$($('<h3>').text($playersArray[i][0])).appendTo('.player' + i);
			$($('<p>').attr('id', 'points' + i)).appendTo('.player' + i);
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
			counter = 0;
		}
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
	// console.log('current turn is ' + currentTurn);
	// console.log('counter is ' + counter);
}

var setupMainCard = function() {
	$('#playerArea').append('<div id="cardArea">');
	$('#cardArea').append($mainCard);
}

var drawCard = function(){
			lastClass = $mainCard.attr('class').split(' ').pop();
			$mainCard.removeClass(lastClass);
			$mainCard.addClass(pickRandom);
			lastClass = $mainCard.attr('class').split(' ').pop();
}
var addPlayerCard = function() {
	//-1 is player1 at index 0
	$($('<div class="card">').addClass(lastClass)).appendTo('.player' + counter);
}

var updatePoints = function() {
	$('#points' + counter).text("Points: " + $playersArray[counter][1]);
}

var playRound1 = function() {
		//
			$('.colorButtons').click(function(evt) {
			 	drawCard();
			 	determineTurn();
			 	addPlayerCard();
			 	compareColor();
				//console.log(evt.target);

				$colorTarget = $(evt.target);

				if (($colorTarget).hasClass("red") && cardColor === "red"){
					console.log("Red was the right guess");
					currentTurn[1] = 0;
				} else if (($colorTarget).hasClass("red") && cardColor === "black") {
					console.log("Red was the wrong guess");
					currentTurn[1] = 1;
				} else if (($colorTarget).hasClass("black") && cardColor === "black") {
					console.log("black was the right guess");
					currentTurn[1] = 0;
				} else if (($colorTarget).hasClass("black") && cardColor === "red") {
					console.log("black was the wrong guess");
					currentTurn[1] = 1;
				}
				//move to next round
				updatePoints();
				if (counter > ($playersArray.length -2)) {
				setupSecondRound();
				playRound2();
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
	$('.higherLowerButtons').click(function(evt){
		// console.log("Start round 2");
		drawCard();
		determineTurn();
		addPlayerCard();
		compareLowerHigher();

		higherLowerTarget = $(evt.target);

		if ((higherLowerTarget).hasClass("lower") && cardHighOrLow === "low"){
					console.log("Lower was the right guess");
					//currentTurn[1] = 0;
				} else if ((higherLowerTarget).hasClass("lower") && cardHighOrLow === "high") {
					console.log("Lower was the wrong guess");
					currentTurn[1] = +2;
				} else if ((higherLowerTarget).hasClass("lower") && cardHighOrLow === "even") {
					console.log("Its a tie (lguess)");
					currentTurn[1] = +3; 
				} else if ((higherLowerTarget).hasClass("higher") && cardHighOrLow === "high") {
					console.log("Higher was the right guess");
					//currentTurn[1] = 0;
				} else if ((higherLowerTarget).hasClass("higher") && cardHighOrLow === "low") {
					console.log("Higher was the wrong guess");
					currentTurn[1] = +2;
				} else if ((higherLowerTarget).hasClass("higher") && cardHighOrLow === "even") {
					console.log("Its a tie (hguess)");
					currentTurn[1] = +3;
				}
				updatePoints();
				//move to next round
				if (counter > ($playersArray.length -2)) {
	 			setupThirdRound();
				//playRound3();
				}
	});
}

var setupThirdRound = function() {
	$('.higherLowerButtons').hide("slow");
	inBetween = $('<div class="inBetween">><</div>').addClass("tweener");
	outside = $('<div class="outside"><></div>').addClass("tweener");
	onTheFence = $('<div class="onTheFence">||</div>').addClass("tweener");
	$('#cardArea').append(inBetween);
	$('#cardArea').append(outside);
	$('#cardArea').append(onTheFence);
	$('.pageTitle').text("Up the River | Round 3");
	$('#description').text("Will your card be inbetween, outside, or on the fence? Select a button to choose");
}

var compareLowerHigher = function() {
	console.log("compareLowerHigher is running");
	var $cards = $(".player" + counter + " div");

	var card1 = cardNumbers[$($cards[0]).attr("class").split(" ")[1]];
	var card2 = cardNumbers[$($cards[1]).attr("class").split(" ")[1]];

	console.log($cards, card1, card2);

	if (card1 > card2) {
		cardHighOrLow = "low";
	} else if (card1 < card2) {
		cardHighOrLow ="high";
	} else {
		cardHighOrLow="even";
	}
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
	
}



$('#beginGame').click(startGame);


