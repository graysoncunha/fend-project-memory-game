/*
 * Create a list that holds all of your cards
 */
var cards, shuffledCards, container, deck;
var openCards = []; 
var matchCards = [];

deck = document.querySelector('.deck');
cards = deck.children;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 document.addEventListener('DOMContentLoaded', function() {
    var cardsArray, deckParent, newDeck;

    cardsArray = Array.from(cards);
    deckParent = deck.parentElement;
    shuffledCards = shuffle(cardsArray);

    newDeck = document.createElement('ul');
    newDeck.className = 'deck';

    for(var i = 0; i < shuffledCards.length; i++) {
        shuffledCards[i].addEventListener('click', onClick);
        newDeck.appendChild(shuffledCards[i]);
    }

    deck.remove();
    deckParent.appendChild(newDeck);
 });

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 function onClick(event) {
    var clickedElement = event.target;
    displayCard(clickedElement);
    addInOpenCards(clickedElement);
 }

 function displayCard(element) {
    element.classList.add('open');
    element.classList.add('show');
 }

 function resetOpenedCards() {
     var openElementsDOM = document.getElementsByClassName('open');

     for (let i = openElementsDOM.length -1; i >= 0; i--) {
        openElementsDOM[i].classList.remove('open', 'show')
     }

     openCards = [];
 }

 function addInOpenCards(newOpenedCard) {
    if(openCards.length === 0) {
        openCards.push(newOpenedCard);
    } else {
        openCards.forEach(openedCard => {
            var newOpenedChildClass = newOpenedCard.firstElementChild.className;
            var openedChildClass = openedCard.firstElementChild.className;

            if(openedChildClass.indexOf(newOpenedChildClass) === 0) {
                applyMatchElementStyle();
            } else {
                setTimeout(() => {
                    resetOpenedCards();
                }, 1000);
            }
        });
    }
 }

 function applyMatchElementStyle() {
    var openElementsDOM = document.getElementsByClassName('open');

    for (let i = openElementsDOM.length -1; i >= 0; i--) {
       openElementsDOM[i].classList.remove('open', 'show')
       openElementsDOM[i].classList.add('match');
    }

    openCards = [];
 }
