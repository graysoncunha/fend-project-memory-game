/*
 * Create a list that holds all of your cards
 */
var cards, shuffledCards, container, deck, restart;
var openedCards = [];
var matchCards = [];

var second = 0,
  minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

var moves = 0;
var counter = document.querySelector(".moves");
var firstClick = true;

// declare variables for star icons
var stars = document.querySelectorAll(".fa-star");

var modal = document.getElementById("popup1");

var closeicon = document.querySelector(".close");

restart = document.querySelector(".restart");
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function init() {
  var cardsArray, deckParent, newDeck;

  deck = document.querySelector(".deck");
  cards = document.getElementsByClassName("card");

  cardsArray = Array.from(cards);
  deckParent = deck.parentElement;
  shuffledCards = shuffle(cardsArray);

  newDeck = document.createElement("ul");
  newDeck.className = "deck";

  for (var i = 0; i < shuffledCards.length; i++) {
    shuffledCards[i].addEventListener("click", onClick);
    newDeck.appendChild(shuffledCards[i]);
  }

  deck.remove();
  deckParent.appendChild(newDeck);
  openedCards = [];
  matchCards = [];

  firstClick = true;
  moves = 0;
  counter.innerHTML = moves;

  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

function restartDeck() {
  second = 0;
  hour = 0;
  minute = 0;

  removeElementStyle();
  init();
}

function removeElementStyle() {
  for (let i = cards.length - 1; i >= 0; i--) {
    cards[i].classList.remove("match");
    cards[i].classList.remove("open");
    cards[i].classList.remove("show");
  }

  cleanArrayOpenCards();
}

document.addEventListener("DOMContentLoaded", init);
restart.addEventListener("click", restartDeck);

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

function onClick() {
  if (firstClick) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
    firstClick = false;
  }
  displayCard(this);
  addInOpenCards(this);
}

function displayCard(element) {
  element.classList.toggle("open");
  element.classList.toggle("show");
}

function resetOpenedCards() {
  var openElementsDOM = document.getElementsByClassName("open");

  for (let i = openElementsDOM.length - 1; i >= 0; i--) {
    openElementsDOM[i].classList.remove("open", "show");
  }

  cleanArrayOpenCards();
}

function matched(openedCard, newOpenedCard) {
  applyMatchElementStyle();
  addInMatchList(openedCard, newOpenedCard);
}

function unmatched() {
  disable();
  setTimeout(() => {
    resetOpenedCards();
    enable();
  }, 500);
}

function addInOpenCards(newOpenedCard) {
  openedCards.push(newOpenedCard);

  if (openedCards.length === 2) {
    moveCounter();

    var firstChildClass = openedCards[0].firstElementChild.className;
    var secondChildClass = openedCards[1].firstElementChild.className;

    if (firstChildClass.indexOf(secondChildClass) === 0) {
      matched(openedCards[0], openedCards[1]);
    } else {
      unmatched();
    }
  }
}

function disable() {
  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.add("disabled");
  }
}

function enable() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].classList.remove("disabled");
  }
}

function applyMatchElementStyle() {
  openedCards[0].classList.add("match");
  openedCards[1].classList.add("match");
  openedCards[0].classList.remove("show", "open");
  openedCards[1].classList.remove("show", "open");

  cleanArrayOpenCards();
}

function addInMatchList(openedCard, newOpenedCard) {
  matchCards.push(openedCard);
  matchCards.push(newOpenedCard);

  if (matchCards.length === 16) {
    congratulations();
  }
}

function cleanArrayOpenCards() {
  openedCards = [];
}

function moveCounter() {
  moves++;
  counter.innerHTML = moves;

  if (moves > 15 && moves < 18) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 20) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + " mins " + second + " secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

function congratulations() {
  clearInterval(interval);
  finalTime = timer.innerHTML;

  modal.classList.add("show");

  var starRating = document.querySelector(".stars").innerHTML;

  document.getElementById("finalMove").innerHTML = moves;
  document.getElementById("starRating").innerHTML = starRating;
  document.getElementById("totalTime").innerHTML = finalTime;

  //closeicon on modal
  closeModal();
}

function closeModal() {
  closeicon.addEventListener("click", function(e) {
    modal.classList.remove("show");
    startGame();
  });
}

function playAgain() {
  modal.classList.remove("show");
  restartDeck();
}
