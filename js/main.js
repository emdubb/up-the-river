console.log("main.js loaded");

var playerPoints = [0, 0, 0, 0, 0, 0]
var counter, currentTurn;
//put variable above and then return the value on click

function startGame() {
	var $playersArray = [];
	var $playerName1 = $('#player-name1').val();
	var $playerName2 = $('#player-name2').val();
	var $playerName3 = $('#player-name3').val();
	var $playerName4 = $('#player-name4').val();
	var $playerName5 = $('#player-name5').val();
	var $playerName6 = $('#player-name6').val();
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

		var $redButton = $('<div id="red">');
		var $blackButton = $('<div id="black">');

		$('#playerArea').append('<div id="cardArea">');
		$('#cardArea').append($redButton);
		$('#cardArea').append($blackButton);

		//Make card
		var $mainCard = $('<div id="deckDefault" class="card xlarge back">');
		$('#cardArea').append($mainCard);

		//Draw a card
		var drawCard = function(){
			var lastClass = $mainCard.attr('class').split(' ').pop();
			$mainCard.removeClass(lastClass);
			$mainCard.addClass(pickRandom);
			//$mainCard.removeClass('back');
		}

		var compareColor = function() {
		 	if($mainCard.attr('class') = 
		 		"dA"||"dK"||"dQ"||"dJ"||"d10"||"d09"||"d08"||"d07"||"d06"||"d05"||"d04"||"d03"||"d02"|| 
		 		"hA"||"hK"||"hQ"||"hJ"||"h10"||"h09"||"h08"||"h07"||"h06"||"h05"||"h04"||"h03"||"h02"){
		 		console.log("card is red");
		 	} else {
		 		console.log("card is black");
		 	}}

		 $redButton.click(function() {
		 	drawCard();
		 	nextTurn();
		 	compareColor();
		 });
		// $blackButton.click(drawCard(););
		
	})
}

$('#beginGame').click(startGame);


