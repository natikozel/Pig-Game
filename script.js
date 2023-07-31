'use strict';

let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');
let dice = document.querySelector('.dice');
let playing = true;
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
let curPlayer = 0;
const displayScore0 = score => score0.textContent = String(Number(score) + Number(score0.textContent));
const displayScore1 = score => score1.textContent = String(Number(score) + Number(score1.textContent));
const resetScore0 = () => score0.textContent = '0';
const resetScore1 = () => score1.textContent = '0';
const resetCurrent0 = () => current0.textContent = '0';
const resetCurrent1 = () => current1.textContent = '0';
const hideDice = () => dice.classList.add('hidden');
const displayDice = num => {
  if (dice.classList.contains('hidden'))
    dice.classList.remove('hidden');
  dice.src = `dice-${num}.png`;
};

const switchPlayers = function() {
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};
const resetGame = function() {

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  playing = true;
  resetScore0();
  resetScore1();
  resetCurrent0();
  resetCurrent1();
  hideDice();
  if (curPlayer !== 0) {
    switchPlayers();
    curPlayer = 0;
  }

};

resetGame();
newGame.addEventListener('click', resetGame);

roll.addEventListener('click', function() {
  if (playing) {
    const random = Math.trunc(Math.random() * 6) + 1;
    displayDice(random);
    if (random === 1) {
      switchPlayers();
      document.getElementById(`current--${curPlayer}`).textContent = '0';
      curPlayer = curPlayer === 0 ? 1 : 0;
    } else
      document.getElementById(`current--${curPlayer}`).textContent =
        String(Number(random) + Number(document.getElementById(`current--${curPlayer}`).textContent));
  }
});

hold.addEventListener('click', function() {
  if (playing) {
    curPlayer === 0 ? displayScore0(current0.textContent) : displayScore1(current1.textContent);
    document.getElementById(`current--${curPlayer}`).textContent = '0';
    if ((curPlayer === 0 && score0.textContent >= 25) || (curPlayer === 1 && score1.textContent >= 25)) {
      playing = false;
      dice.classList.add('hidden');
      document.querySelector(`.player--${curPlayer}`).classList.add('player--winner');
    } else {
      switchPlayers();
      curPlayer = curPlayer === 0 ? 1 : 0;
    }
  }
});