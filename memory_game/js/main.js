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

var randomizeCards = function(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
		return array;
	}
};

var randomCards = randomizeCards(cards);

var cardsInPlay = [];
var playerScore = 0;

var displayScore = document.getElementById('player-score');
displayScore.textContent = 'Player Score: ' + playerScore;

var matchMessage = document.createElement('p');
document.getElementById('match-message').appendChild(matchMessage);

var createBoard = function() {
	for (var i = 0; i < randomCards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', 'images/back.png');
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener('click', flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
};

var flipCard = function() {
	var currentCard = {};
	var images = document.querySelectorAll('img');
	if (this.getAttribute("src") === 'images/back.png') {
		matchMessage.textContent = null;
		var cardId = this.getAttribute('data-id');
		console.log('User flipped ' + randomCards[cardId].rank);
		currentCard.rank = randomCards[cardId].rank;
		currentCard.cardId = cardId;
		cardsInPlay.push(currentCard);
		this.setAttribute('src', randomCards[cardId].cardImage);
		if (cardsInPlay.length === 2) {
			setTimeout(function() {
				if (!checkForMatch()) {
					flipCardNoMatch(images);
				}
				cardsInPlay = [];
			}, 600);
		}
	} else {
		return;
	}
};

var checkForMatch = function() {
	if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
		playerScore += 1;
		displayScore.textContent = 'Player Score: ' + playerScore;
		matchMessage.textContent = 'You found a match!';
		return true;
	} else {
		matchMessage.textContent = 'Sorry, try again.';
		return false;
	}
};

var flipCardNoMatch = function(array) {
	for (var i = 0; i < array.length; i++) {
		for (var j = 0; j < cardsInPlay.length; j++) {
			if (array[i].getAttribute('data-id') === cardsInPlay[j].cardId) {
				array[i].setAttribute('src','images/back.png');
			}
		}
	}
}

var button = document.querySelector('button');

var buttonMouseOver = function() {
    button.style.backgroundColor = '#00A6B3';
};

var buttonMouseOut = function() {
	button.style.backgroundColor = '#F15B31';
};

var resetBoard = function() {
	randomCards = randomizeCards(cards);
	cardsInPlay = [];
	playerScore = 0;
	displayScore.textContent = 'Player Score: ' + playerScore;
	matchMessage.textContent = null;
	var currentCards = document.querySelectorAll('img');
	for (var i = 0; i < currentCards.length; i++) {
		currentCards[i].setAttribute('src', 'images/back.png');
	}
};

button.addEventListener('mouseover', buttonMouseOver);
button.addEventListener('mouseout', buttonMouseOut);
button.addEventListener('click', resetBoard);

createBoard();