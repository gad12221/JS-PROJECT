let dealerSum = 0;
let yourSum = 0;
let dealerAceCount = 0;
let yourAceCount = 0;
let hidden;
let deck;
let canHit = true;

window.onload = () => {
  buildDeck();
  shuffleDeck();
  startGame();
};

const buildDeck = () => {
  const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const types = ["C", "D", "H", "S"];
  deck = [];

  types.forEach(type => {
    values.forEach(value => {
      deck.push(`${value}-${type}`);
    });
  });
};

const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

const startGame = () => {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);

  while (dealerSum < 17) {
    const cardImg = document.createElement("img");
    const card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById('dealer-cards').append(cardImg);
  }

  for (let i = 0; i < 2; i++) {
    const cardImg = document.createElement("img");
    const card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById('your-cards').append(cardImg);
  }

  document.getElementById('hit').addEventListener('click', hit);
  document.getElementById('stay').addEventListener('click', stay);
};

const hit = () => {
  if (!canHit) return;

  const cardImg = document.createElement("img");
  const card = deck.pop();
  cardImg.src = `./cards/${card}.png`;
  yourSum += getValue(card);
  yourAceCount += checkAce(card);
  document.getElementById('your-cards').append(cardImg);

  if (reduceAce(yourSum, yourAceCount) > 21) {
    canHit = false;
  }
};

const stay = () => {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  yourSum = reduceAce(yourSum, yourAceCount);
  canHit = false;
  document.getElementById('hidden').src = `./cards/${hidden}.png`;
  let message = "";

  if (yourSum > 21) {
    message = "הפסדת";
  } else if (dealerSum > 21) {
    message = "ניצחון!!!";
  } else if (yourSum == dealerSum) {
    message = "תיקווו";
  } else if (yourSum > dealerSum) {
    message = "ניצחון!!!";
  } else if (yourSum < dealerSum) {
    message = "הפסדת";
  }

  document.getElementById('dealer-sum').innerText = dealerSum;
  document.getElementById('your-sum').innerText = yourSum;
  document.getElementById('results').innerText = message;
  const btn = document.getElementById('btn').innerHTML = `<button id="start" >התחל/י משחק חדש</button>`;
  document.getElementById('start').addEventListener('click', () => {
    location.reload();
  });
}


const getValue = card => {
  const value = card.split("-")[0];
  if (isNaN(value)) {
    return value === "A" ? 11 : 10;
  }
  return parseInt(value);
};

const checkAce = card => (card[0] === "A" ? 1 : 0);

const reduceAce = (playerSum, playerAceCount) => {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
};