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

var createBoard = function() {
	for (var j = 0; j < 2; j++) {
		for (var i = 0; i < cards.length; i++) {
			var cardElement = document.createElement('img');
			cardElement.setAttribute('src', 'images/back.png');
			cardElement.setAttribute('data-id', i);
			cardElement.addEventListener('click', flipCard);
			document.getElementById('game-board').appendChild(cardElement);
		}
	}
}

var cardsInPlay = [];

var flipCard = function() {
	var cardId = this.getAttribute('data-id');
	console.log('User flipped ' + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);

	this.setAttribute('src', cards[cardId].cardImage);

	if (cardsInPlay.length === 2) {
		checkForMatch();
		cardsInPlay = [];
	}
}

var checkForMatch = function() {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		alert('You found a match!');
	} else {
		alert('Sorry, try again.');
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
	var currentCards = document.querySelectorAll('img');
	for (var i = 0; i < currentCards.length; i++) {
		currentCards[i].setAttribute('src', 'images/back.png');
	}
}

button.addEventListener('mouseover', buttonMouseOver);
button.addEventListener('mouseout', buttonMouseOut);
button.addEventListener('click', resetBoard);

createBoard();