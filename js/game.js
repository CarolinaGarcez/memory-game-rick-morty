/* =========================================================
   ELEMENTOS DA TELA
========================================================= */

const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const resetButton = document.querySelector('.reset');


/* =========================================================
   CARTAS DO JOGO
========================================================= */

const characters = [
  'toy',
  'self',
  'mortycoringa',
  'prison',
  'robin',
  'psicodelico',
];


/* =========================================================
   FUNÇÃO PARA CRIAR ELEMENTOS HTML
========================================================= */

const createElement = (tag, className) => {

  const element = document.createElement(tag);
  element.className = className;

  return element;
};


/* =========================================================
   CONTROLE DO JOGO
========================================================= */

/* Primeira carta clicada */
let firstCard = null;

/* Segunda carta clicada */
let secondCard = null;

/* Bloqueia o tabuleiro durante comparação */
let lockBoard = false;

/* Controle do timer */
let loop;


/* =========================================================
   VERIFICA SE O JOGO TERMINOU
========================================================= */

const checkEndGame = () => {

  /* Procura cartas desabilitadas */
  const disabledCards = document.querySelectorAll('.disabled-card');

  /* Se encontrou os 12 pares */
  if (disabledCards.length === 12) {

    clearInterval(loop);

    alert(
      `Parabéns, ${spanPlayer.innerHTML}! Tempo: ${timer.innerHTML}s`
    );
  }
};


/* =========================================================
   COMPARA AS DUAS CARTAS
========================================================= */

const checkCards = () => {

  /* Pega o personagem de cada carta */
  const firstCharacter =
    firstCard.getAttribute('data-character');

  const secondCharacter =
    secondCard.getAttribute('data-character');


  /* =====================================================
     SE AS CARTAS FOREM IGUAIS
  ===================================================== */

  if (firstCharacter === secondCharacter) {

    /* Desabilita as cartas */
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');

    /* Limpa seleção */
    firstCard = null;
    secondCard = null;

    /* Libera tabuleiro */
    lockBoard = false;

    /* Verifica vitória */
    checkEndGame();

  } else {

    /* =====================================================
       SE AS CARTAS FOREM DIFERENTES
    ===================================================== */

    setTimeout(() => {

      /* Remove efeito de carta virada */
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      /* Limpa seleção */
      firstCard = null;
      secondCard = null;

      /* Libera tabuleiro */
      lockBoard = false;

    }, 300); // ↓ reduzido de 500ms para 300ms
  }
};


/* =========================================================
   FUNÇÃO DE VIRAR CARTA
========================================================= */

const revealCard = ({ target }) => {

  /* Impede clique durante animação */
  if (lockBoard) return;

  /* Procura a carta corretamente */
  const card = target.closest('.card');

  /* Segurança */
  if (!card) return;

  /* Impede clicar na mesma carta */
  if (card.classList.contains('reveal-card')) return;


  /* =====================================================
     VIRA A CARTA
  ===================================================== */

  card.classList.add('reveal-card');


  /* =====================================================
     PRIMEIRA CARTA
  ===================================================== */

  if (!firstCard) {

    firstCard = card;

    return;
  }


  /* =====================================================
     SEGUNDA CARTA
  ===================================================== */

  secondCard = card;

  /* Bloqueia novos cliques */
  lockBoard = true;

  /* Compara cartas */
  checkCards();
};


/* =========================================================
   CRIA CARTAS
========================================================= */

const createCard = (character) => {

  /* Estrutura da carta */
  const card = createElement('div', 'card');

  /* Frente */
  const front = createElement('div', 'face front');

  /* Verso */
  const back = createElement('div', 'face back');


  /* Imagem da carta */
  front.style.backgroundImage =
    `url('../img/cards/${character}.png')`;


  /* Monta estrutura */
  card.appendChild(front);
  card.appendChild(back);


  /* Evento de clique */
  card.addEventListener('click', revealCard);


  /* Identificação */
  card.setAttribute('data-character', character);

  return card;
};


/* =========================================================
   CARREGA O JOGO
========================================================= */

const loadGame = () => {

  /* Duplica cartas para formar pares */
  const duplicateCharacters = [
    ...characters,
    ...characters
  ];

  /* Embaralha */
  const shuffledArray =
    duplicateCharacters.sort(() => Math.random() - 0.5);


  /* Cria cartas na tela */
  shuffledArray.forEach((character) => {

    const card = createCard(character);

    grid.appendChild(card);
  });
};


/* =========================================================
   TIMER
========================================================= */

const startTimer = () => {

  let time = 0;

  loop = setInterval(() => {

    time++;

    timer.innerHTML = time;

  }, 1000);
};


/* =========================================================
   BOTÃO RESET
========================================================= */

resetButton.addEventListener('click', () => {

  window.location.reload();
});


/* =========================================================
   INICIA O JOGO
========================================================= */

window.onload = () => {

  /* Nome do jogador */
  spanPlayer.innerHTML =
    localStorage.getItem('player') || 'Jogador';

  /* Inicia timer */
  startTimer();

  /* Carrega cartas */
  loadGame();
};