console.log("main.js loaded");

$('#beginGame').click(function(){
	var $playerName1 = $('#player-name1').val();
	var $playerName2 = $('#player-name2').val();
	var $playerName3 = $('#player-name3').val();
	var $playerName4 = $('#player-name4').val();
	var $playerName5 = $('#player-name5').val();
	var $playerName6 = $('#player-name6').val();
	var $playersArray = [$playerName1, $playerName2, $playerName3, $playerName4, $playerName5, $playerName6]
	console.log($playersArray);

	$('.playerNameDiv, #beginGame').hide(function() {
	});

	$('#description').text("Make a rule or punishment for the winner of the game to follow. Be as nice or mean as you dare!");
	$('#playerArea').append($('<input id="ruleInput"> <div id="ruleButtons">'));
	$('#ruleButtons').append($('<button id="myRuleButton"> My Rule is Awesome </button>'));
	//<button id="randomRule"> Randomize Me Bro</button>

	$('#myRuleButton').click(function(){
		var $gameRule = $('#ruleInput').val();
		console.log($gameRule);

		$('#ruleInput, #ruleButtons').hide(function() {
		});
		$('#description').text("Will your card be red or black? Select a color to choose");

		for (var i = 0; i < $playersArray.length; i++) {
			$('#playerArea').append($('<h3>').append($playersArray[i]));
			console.log($playersArray[i]);
		}
		

	});
});