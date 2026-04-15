const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const resetButton = document.querySelector('.reset');


const characters = [
  'toy',
  'self',
  'mortycoringa',
  'prison',
  'robin',
  'psicodelico',
];

/* FUNÇÃO PRA CRIAR ELEMENTO */
const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

/* CONTROLE DO JOGO */
let firstCard = '';
let secondCard = '';
let lockBoard = false;

/* FIM DE JOGO */
const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 12) { // 
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Tempo: ${timer.innerHTML}s`);
  }
}

/* COMPARA CARTAS */
const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {

    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    firstCard = '';
    secondCard = '';
    lockBoard = false;

    checkEndGame();

  } else {
    setTimeout(() => {

      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
      lockBoard = false;

    }, 500);
  }
}

/* AO CLICAR NA CARTA */
const revealCard = ({ target }) => {

  if (lockBoard) return;

  const card = target.parentNode;

  if (card.classList.contains('reveal-card')) return;

  if (firstCard === '') {
    card.classList.add('reveal-card');
    firstCard = card;

  } else if (secondCard === '') {
    card.classList.add('reveal-card');
    secondCard = card;

    lockBoard = true;
    checkCards();
  }
}

/* CRIA CARTA */
const createCard = (character) => {

  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

 
  front.style.backgroundImage = `url('../img/cards/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

/* CARREGA JOGO */
const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

/* TIMER */
const startTimer = () => {
  let time = 0;

  this.loop = setInterval(() => {
    time++;
    timer.innerHTML = time;
  }, 1000);
}

/* RESET */
resetButton.addEventListener('click', () => {
  window.location.reload();
});

/* START */
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player') || 'Jogador';
  startTimer();
  loadGame();
}