console.log("main.js loaded");
//==========================GLOBAL VARIABLES=======================================
//var playerPoints = [0, 0, 0, 0, 0, 0]
var currentTurn, cardColor, $colorTarget, lastClass, giveDrinksTarget, disableInputButtons,
	cardHighOrLow, inBetween, outside, onTheFence, cardTweener,
	heartsButton, spadesButton, diamondsButton, clubsButton, card4suit,
	$playersArray, $playerName1, $playerName2, $playerName3, $playerName4, $playerName5, $playerName6,
	$gameRule, $redButton, $blackButton, $lowerButton, $higherButton, shouldWait, round
var $mainCard = $('<div id="deckDefault" class="card xlarge back">')
var redCards = ["dA","dK","dQ","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hK","hQ","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02"]
var blackCards = ["cA","cK","cQ","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sK","sQ","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
var counter = -1;
var numberDrinks = 0;
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

//Require input at the beginning to start game.

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
	
}

var getRule = function() { 
	$('.playerNameDiv, #beginGame').fadeOut();
	setTimeout(function() {
		$('#description').text("Make a rule or punishment for the winner of the game to follow. Be as nice or mean as you dare!");
		$('#playerArea').append($('<input id="ruleInput" type="text"> <div id="ruleButtons">')).hide().fadeIn();
		$('#ruleButtons').append($('<button id="myRuleButton"> My Rule is Awesome </button>')).hide().fadeIn();
		//ICEBOX <button id="randomRule"> Randomize Me Bro</button>
		$('#myRuleButton').click(function() {
			if ($('#ruleInput').val() === "") { 
				window.alert("Are you drunk already? Make sure you enter a rule!");
			} else {
				setupPlayerTurn();
				setupMainCard();
				setupFirstRound();
				playRound1(); 
			}
		});	
	}, 400);
}

var giveDrinks = function(number) {
	disableInputButtons = true;
	$('.userInputButtons div').css({backgroundColor: "grey"});
	// $('.userInputButtons').fadeOut();
	$('.pointAdder').fadeIn();
	$('.pointAdder').fadeIn();
	$('.pointAdder').unbind().click(function(evt) {
		numberDrinks++
		$giveDrinksTarget = $(evt.target);
		var iClass = $giveDrinksTarget.parent().attr('class')[6];
		if (($giveDrinksTarget).hasClass("addPointsButton" + iClass)){
			$playersArray[iClass][1] += 1;
			$('#points' + iClass).text("Drinks: " + $playersArray[iClass][1]);	
		} 
		if (number === numberDrinks) {
			$('.pointAdder').fadeOut();
			// $('.userInputButtons').fadeIn();
			$('.userInputButtons div').css({backgroundColor: ""});
			disableInputButtons = false;
			displayTurn();
			numberDrinks = 0;
		}
	});
}

var setupFirstRound = function() {
	$gameRule = $('#ruleInput').val();
	$('#ruleInput, #ruleButtons').hide();
	$('#description').text("Will your card be red or black? Select a color to choose.").hide().fadeIn();
	$('.pageTitle').text("Round 1").hide().fadeIn();
	$('#playerArea').append('<div id="playerList">');
	for (var i = 0; i < $playersArray.length; i++) {
		$($('<div>').addClass("player" + i)).appendTo('#playerList').css({clear: "left" });
		$($('<h3>').text($playersArray[i][0])).appendTo('.player' + i);
		$($('<p>').attr('id', 'message' + i)).appendTo('.player' + i).css({marginTop: ".3em" });
		$($('<p>').attr('id', 'points' + i)).appendTo('.player' + i).css({clear: "both" });
		$($('<div class="pointAdder">+</div>').addClass("addPointsButton" + i)).prependTo('.player' + i).hide();
		$($('<div>').addClass("playerCards" + i)).appendTo('.player' + i).css({clear: "both", marginBottom: "8em"});
	}
	$redButton = $('<div class="red">').addClass("colorButtons");
	$blackButton = $('<div class="black">').addClass("colorButtons");
	$('.userInputButtons').append($redButton);
	$('.userInputButtons').append($blackButton);
}

var determineTurn = function() {
	$("#message" + counter).text("");
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
}
var setupPlayerTurn = function() {
	$('#playerArea').append('<div id="cardArea">');
	$('#cardArea').append('<h2 class="currentPlayer">');
	$('.currentPlayer').text("It's " + $playersArray[0][0] + "'s Turn");
	$('#description').remove();
	$('#cardArea').append('<div id="description">')
}
var setupMainCard = function() {
	$('#cardArea').append('<div class="userInputButtons">');
	$('#cardArea').append($mainCard);
}
var displayTurn = function() {
	if (counter === $playersArray.length -1) {
		$('.currentPlayer').text("It's " + $playersArray[0][0] + "'s Turn");
		shouldWait = "no";
	} else {
		$('.currentPlayer').text("It's " + $playersArray[counter + 1][0] + "'s Turn");
		shouldWait = "yes";
	}
	if (counter > ($playersArray.length -2) && shouldWait === "no") {
		if (round === 1) {
			setupSecondRound();
			playRound2();
		} else if (round === 2) {
			setupThirdRound();
			playRound3();
		} else if (round === 3) {
			setupFourthRound();
			playRound4();
		} else if (round === 4) {
			upTheRiver();
		}
	}
}
var addPlayerCard = function() {
	$mainCard = $($('<div class="card">').addClass(pickRandom)).appendTo('.playerCards' + counter).css({float: "left" });
}

var updatePoints = function() {
	$('#points' + counter).text("Drinks: " + $playersArray[counter][1]);
}

var playRound1 = function() {
	$('.colorButtons').click(function(evt) {
		if (disableInputButtons) {
			evt.preventDefault();
			return;
		}
		round = 1;
		determineTurn();
		addPlayerCard();
		compareColor();
		$colorTarget = $(evt.target);
		if (($colorTarget).hasClass("red") && cardColor === "red"){
			$('#message' + counter).append("You were right, now dish out a drink.");
			currentTurn[1] += 0;
			giveDrinks(1);
		} else if (($colorTarget).hasClass("red") && cardColor === "black") {
			$('#message' + counter).append("You were wrong. Drink up bruh.");
			currentTurn[1] += 1;
			displayTurn();
		} else if (($colorTarget).hasClass("black") && cardColor === "black") {
			$('#message' + counter).append("You were right, now dish out a drink.");
			currentTurn[1] += 0;
			giveDrinks(1);
		} else if (($colorTarget).hasClass("black") && cardColor === "red") {
			$('#message' + counter).append("You were wrong. Drink up bruh.");
			currentTurn[1] += 1;
			displayTurn();
		}
		//move to next round
		updatePoints();
	});
}

var compareColor = function() {
	for (i=0; i < redCards.length; i++) {
		if ($mainCard.hasClass(redCards[i])) {
			cardColor = "red";
		}	
	}
	for (i=0; i < blackCards.length; i++) {
		if ($mainCard.hasClass(blackCards[i])) {
			cardColor = "black";
		}	
	}
}

var setupSecondRound = function() {
	$('.colorButtons').hide();
	$lowerButton = $('<div class="lower">-</div>').addClass("higherLowerButtons");
	$higherButton = $('<div class="higher">+</div>').addClass("higherLowerButtons");
	$('.userInputButtons').append($lowerButton);
	$('.userInputButtons').append($higherButton);
	$('.pageTitle').text("Round 2");
	$('#description').text("Will your card be higher or lower? Select a button to choose.");
}

var compareLowerHigher = function() {
	var $cards = $(".playerCards" + counter + " div");
	var card1 = cardNumbers[$($cards[0]).attr("class").split(" ")[1]];
	var card2 = cardNumbers[$($cards[1]).attr("class").split(" ")[1]];
	if (card1 > card2) {
		cardHighOrLow = "low";
	} else if (card1 < card2) {
		cardHighOrLow = "high";
	} else  {
		cardHighOrLow = "even";
	}
}

var playRound2 = function() {
	$('.higherLowerButtons').click(function(evt){
		if (disableInputButtons) {
			evt.preventDefault();
			return;
		}
		round = 2;
		determineTurn();
		addPlayerCard();
		compareLowerHigher();
		higherLowerTarget = $(evt.target);
		if ((higherLowerTarget).hasClass("lower") && cardHighOrLow === "low"){
			$('#message' + counter).append("You were right, now dish out 2 drinks.");
			currentTurn[1] += 0;
			giveDrinks(2);
		} else if ((higherLowerTarget).hasClass("lower") && cardHighOrLow === "high") {
			$('#message' + counter).append("You were wrong. Drink up x2 bruh.");
			currentTurn[1] += 2;
			displayTurn();
		} else if ((higherLowerTarget).hasClass("lower") && cardHighOrLow === "even") {
			$('#message' + counter).append("Sucks to suck. Drink double(x4).");
			currentTurn[1] += 4; 
			displayTurn();
		} else if ((higherLowerTarget).hasClass("higher") && cardHighOrLow === "high") {
			$('#message' + counter).append("You were right, now dish out 2 drinks.");
			currentTurn[1] += 0;
			giveDrinks(2);
		} else if ((higherLowerTarget).hasClass("higher") && cardHighOrLow === "low") {
			$('#message' + counter).append("You were wrong. Drink up x2 bruh.");
			currentTurn[1] += 2;
			displayTurn();
		} else if ((higherLowerTarget).hasClass("higher") && cardHighOrLow === "even") {
			$('#message' + counter).append("Sucks to suck. Drink double(x4).");
			currentTurn[1] += 4;
			displayTurn();
		}
		updatePoints();
	});
}

var setupThirdRound = function() {
	$('.higherLowerButtons').hide();
	inBetween = $('<div class="inBetween">><</div>').addClass("tweener");
	outside = $('<div class="outside"><></div>').addClass("tweener");
	onTheFence = $('<div class="onTheFence">||</div>').addClass("tweener");
	$('.userInputButtons').append(inBetween);
	$('.userInputButtons').append(outside);
	$('.userInputButtons').append(onTheFence);
	$('.pageTitle').text("Round 3");
	$('#description').text("Will your card be inbetween, outside, or on the fence? Select a button to choose.");
}

var playRound3 = function() {
	$('.tweener').click(function(evt){
		if (disableInputButtons) {
			evt.preventDefault();
			return;
		}
		round = 3;
		determineTurn();
		addPlayerCard();
		compareTweener();
		tweenerTarget = $(evt.target);
		if ((tweenerTarget).hasClass("inBetween") && cardTweener === "inBetween"){
			$('#message' + counter).append("You were right, now dish out 3 drinks.");
			giveDrinks(3);
		} else if ((tweenerTarget).hasClass("outside") && cardTweener === "outside") {
			$('#message' + counter).append("You were right, now dish out 3 drinks.");
			giveDrinks(3);
		} else if ((tweenerTarget).hasClass("onTheFence") && cardTweener === "onTheFence") {
			$('#message' + counter).append("You were right you handsome devil, now dish out double(6).");
			//currently does not allow dishing out 6
			giveDrinks(3);
		} else if ((tweenerTarget).hasClass("inBetween") && cardTweener === "onTheFence") {
			$('#message' + counter).append("Sucks to suck. Drink double(x6).");
			currentTurn[1] += 6;
			displayTurn();
		} else if ((tweenerTarget).hasClass("outside") && cardTweener === "onTheFence") {
			$('#message' + counter).append("Sucks to suck. Drink double(x6).");
			currentTurn[1] += 6;
			displayTurn();
		} else {
			$('#message' + counter).append("You were wrong. Drink up x3 bruh.");
			currentTurn[1] += 3;
			displayTurn(); 
		}
		updatePoints();
	});
}

var compareTweener = function() {
	var $cards = $(".playerCards" + counter + " div");
	var card1 = cardNumbers[$($cards[0]).attr("class").split(" ")[1]];
	var card2 = cardNumbers[$($cards[1]).attr("class").split(" ")[1]];
	var card3 = cardNumbers[$($cards[2]).attr("class").split(" ")[1]];

	if ((card3 > card2 && card3 > card1) || (card3 < card2 && card3 < card1)) {
		cardTweener = "outside";
	} else if (card3 === card2 || card3 === card1){
		cardTweener = "onTheFence";
	} else {
		cardTweener = "inBetween";
	}
}

var setupFourthRound = function() {
	$('.tweener').hide();
	heartsButton = $('<div class="hearts">H</div>').addClass("suitsButtons");
	clubsButton = $('<div class="clubs">C</div>').addClass("suitsButtons");
	spadesButton = $('<div class="spades">S</div>').addClass("suitsButtons");
	diamondsButton = $('<div class="diamonds">D</div>').addClass("suitsButtons");
	$('.userInputButtons').append(heartsButton);
	$('.userInputButtons').append(clubsButton);
	$('.userInputButtons').append(diamondsButton);
	$('.userInputButtons').append(spadesButton);
	$('.pageTitle').text("Round 4");
	$('#description').text("What suit will your card be? Select a button to choose.");
}

var playRound4 = function() {
	$('.suitsButtons').click(function(evt){
		if (disableInputButtons) {
			evt.preventDefault();
			return;
		}
		round = 4;
		determineTurn();
		addPlayerCard();
		getSuit();
		suitsTarget = $(evt.target);
		if ((suitsTarget).hasClass("hearts") && card4suit === "h"){
			$('#message' + counter).append("You were right, now dish out 4 drinks.");
			giveDrinks(4);
		} else if ((suitsTarget).hasClass("clubs") && card4suit === "c") {
			$('#message' + counter).append("You were right, now dish out 4 drinks.");
			giveDrinks(4);
		} else if ((suitsTarget).hasClass("diamonds") && card4suit === "d") {
			$('#message' + counter).append("You were right, now dish out 4 drinks.");
			giveDrinks(4);
		} else if ((suitsTarget).hasClass("spades") && card4suit === "s") {
			$('#message' + counter).append("You were right, now dish out 4 drinks.");
			giveDrinks(4);
		} else {
			$('#message' + counter).append("You were wrong. Drink up x4 bruh.");
			currentTurn[1] += 4; 
			displayTurn();
		}
		updatePoints();
	});
}

var getSuit = function() {
	var $cards = $(".playerCards" + counter + " div");
	card4suit = $($cards[3]).attr("class").split(" ")[1][0];
}

var upTheRiver = function() {
	$(".suitsButtons").hide("slow");
	$('#description').text($gameRule);

	$('#deckDefault').removeClass('back');
	$('#deckDefault').addClass(pickRandom);

	$('.currentPlayer').text("Cards that match");
}
//=========================RUN GAME========================================
function startGame() {
	
	getRule();
}


$('#beginGame').click(function() {
	getPlayerNames();
	if ($playersArray.length > 1) {
		startGame();
	} else {
		window.alert("Woah, nobody likes to drink alone! Grab some friends and add thier names.");
	}
});


