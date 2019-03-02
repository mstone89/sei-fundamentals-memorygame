var cards = [
	{
		rank: 'queen',
		suit: 'hearts',
		cardImage: 'images/queen-of-hearts.png'
	},
	{
		rank: 'queen',
		suit: 'diamonds',
		cardImage: 'images/queen-of-diamonds.png'
	},
	{
		rank: 'king',
		suit: 'hearts',
		cardImage: 'images/king-of-hearts.png'
	},
	{
		rank: 'king',
		suit: 'diamonds',
		cardImage: 'images/king-of-diamonds.png'
	}
];

/*
need to try and work this in later.

var randomizeCards = function(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
		return array;
	}
}
*/

var createBoard = function() {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}

var cardsInPlay = [];
var playerScore = 0;

var displayScore = document.getElementById('player-score');
displayScore.textContent = 'Player Score: ' + playerScore;

var flipCard = function() {
	if (this.getAttribute("src") === 'images/back.png') {
		var cardId = this.getAttribute('data-id');
		console.log('User flipped ' + cards[cardId].rank);
		cardsInPlay.push(cards[cardId].rank);
		this.setAttribute('src', cards[cardId].cardImage);
		if (cardsInPlay.length === 2) {
			checkForMatch();
			cardsInPlay = [];
		}
	} else {
		return;
	}
}

var matchMessage = document.createElement('p');
document.getElementById('match-message').appendChild(matchMessage);

var checkForMatch = function() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		playerScore += 1;
		displayScore.textContent = 'Player Score: ' + playerScore;
		matchMessage.textContent = 'You found a match!';
	} else {
		matchMessage.textContent = 'Sorry, try again.';
	}
}

var button = document.querySelector('button');

var buttonMouseOver = function() {
    button.style.backgroundColor = '#00A6B3';
}

var buttonMouseOut = function() {
	button.style.backgroundColor = '#F15B31';
}

var resetBoard = function() {
	cardsInPlay = [];
	playerScore = 0;
	displayScore.textContent = 'Player Score: ' + playerScore;
	matchMessage.textContent = null;
	var currentCards = document.querySelectorAll('img');
	for (var i = 0; i < currentCards.length; i++) {
		currentCards[i].setAttribute('src', 'images/back.png');
	}
}

button.addEventListener('mouseover', buttonMouseOver);
button.addEventListener('mouseout', buttonMouseOut);
button.addEventListener('click', resetBoard);

createBoard();