'use strict';

alert('Must Checkout Rules Before Starting Game');

//code for rules window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelector('.btn--rules');

//adding function for opening and closing modal
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnOpenModal.addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);

//for closing rules window by esc button
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Coding the main game logic
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, scores, playing;

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//switch player function
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice
    diceEl.src = `/assets/dice-${dice}.png`;

    //remove dice hidden class
    diceEl.classList.remove('hidden');

    //check for result if 1 switch to next player
    if (dice === 1) {
      switchPlayer();
    } else {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

//Adding hold and winning feature
btnHold.addEventListener('click', () => {
  if (playing) {
    //Add  current score to player main score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //check if the player score is >= 100
    if (scores[activePlayer] >= 100) {
      //finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document.getElementById(`name--${activePlayer}`).textContent =
        'Winner🏆🥳';

      document
        .querySelector(`player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
