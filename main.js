/*----- constants -----*/
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = ["C", "D", "H", "S"];

/*----- state variables -----*/
let dealerAceCount = 0;
let playerAceCount = 0; 
let hidden;
let deck = [];
let canHint = true;
let playerPoints = 1000;
let dealerPoints = 1000;
let dealerHandValue = 0;
let playerHandvalue = 0;

/*----- cached elements  -----*/
const display = document.querySelector('.timer');
const nextLevelStake = document.getElementById('next-level-stake')

const hiddenCard = document.getElementById('hidden');
const dealerHand = document.getElementById('dealer-hand');
const playerHand = document.getElementById('player-hand');
const winningMsg = document.getElementById('winner');
const potAmount = document.getElementById('pot-amount');
const dealerSum = document.getElementById('dealer-sum');
const playerSum = document.getElementById('player-sum');

const dealerStake = document.getElementById('dealer-stake');
const playerStake = document.getElementById('player-stake');

const hint = document.getElementById('hint');
const stand = document.getElementById('stand');
const double = document.getElementById('double');
// const split = document.getElementById('split');

/*----- functional component -----*/
const getValue = (card) => {
    let data = card.split('-');
    let value = data[0];
    switch(value) {
        case 'A':
        return 11;
        case 'K':
        return 10;
        case 'Q':
        return 10;
        case 'J':
        return 10;
        default:
        return parseInt(value);
    }
};

const checkAce = (card) => {
    if (card[0] === 'A') {
        return 1;
    } else return 0;
};

const reduceAce = (playerHandvalue, playerAceCount) => {
    while (playerHandvalue > 21 && playerAceCount > 0) {
        playerHandvalue -= 10;
        playerAceCount -= 1;
    }
    return playerHandvalue;
}
const reduceDealerAce = (dealerHandValue, dealerAceCount) => {
    while (dealerHandValue > 21 && dealerAceCount > 0) {
        dealerHandValue -= 10;
        dealerHandValue -= 1;
    }
    return dealerHandValue;
}

const resetHandsAndHandValue = () => {
    canHint = true;
    winningMsg.innerHTML = '';
    playerHand.innerHTML = '';
    dealerHand.innerHTML = '<img id="hidden" src="./cards/BACK.png">';
}

const startTimer = (duration, display) => {
    let timer = duration, minutes, seconds;
    setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.innerHTML = `${minutes} : ${seconds}`;
      if (--timer < 0) {
        timer = duration;
      }
    }, 1000);
  }

  const clockDown = () => {
    let threeMinutes = 60 * 3;
    startTimer(threeMinutes, display);
  };

/*----- process functions -----*/
const originalDeck = () => {
    suits.forEach(function(suit) {
        values.forEach((value) => {
            deck.push(`${value}-${suit}`);
        })
    })
    return deck;
};

const shuffledDeck = () => {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
};

const dealStartingHandToDealer = () => {
    dealerHandValue = 0;
    hidden = deck.pop();
    dealerHandValue += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    dealerHand.append(cardImg);
    dealerHandValue += getValue(card);
    dealerAceCount += checkAce(card);
}
const dealStartingHandToPlayer = () => {
    playerHandvalue = 0;
    for(let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = `./cards/${card}.png`;
        playerHand.append(cardImg);
        playerHandvalue += getValue(card);
        playerAceCount += checkAce(card);
    }
}

const checkFirstRound = () => {
    if (playerHandvalue === 21 && playerHandvalue === dealerHandValue) {
        winningMsg.innerHTML = `<p>Tie<p>`; 
        setTimeout(startGame, 3000); 
    } else if (playerHandvalue === 21) {
        winningMsg.innerHTML = `<p>Player Win!<p>`;
        //stake change
        setTimeout(startGame, 3000);
    } 
}

const checkSecondRound = () => {
    if (playerHandvalue > 21) {
        winningMsg.innerHTML = `<p>Dealer Win!<p>`;
        setTimeout(startGame, 3000)
    } 
}
const hintCards = () => {
    if (!canHint){
        return;
    }
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    console.log(cardImg);
    playerHand.append(cardImg);
    playerHandvalue += getValue(card);
    playerAceCount += checkAce(card);
    if (reduceAce(playerHandvalue, playerAceCount) > 21) {
        canHint = false;
    }
    checkSecondRound();
}

const standCards = () => {
    canHint === false;
    const newCard = document.createElement('img');
    newCard.src = `./cards/${hidden}.png`;
    const oldCard = document.querySelector('div#dealer-hand > #hidden');
    dealerHand.replaceChild(newCard, oldCard);
  
    while (dealerHandValue < 17) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = `./cards/${card}.png`;
        dealerHand.append(cardImg);
        dealerHandValue += getValue(card);
        //Where to add this function
        reduceDealerAce(dealerHandValue, dealerAceCount);
        dealerAceCount += checkAce(card);
    }
    checkFinalRound();
};

const checkFinalRound = () => {
    if (dealerHandValue > 21) {
        winningMsg.innerHTML = `<p>Player Win!<p>`;
        //stake change
        setTimeout(startGame, 3000);
    }
    else if (playerHandvalue === dealerHandValue) {
        winningMsg.innerHTML = `<p>Tie<p>`;
        setTimeout(startGame, 3000);
    } else if (playerHandvalue > dealerHandValue) {
        winningMsg.innerHTML = `<p>Player Win!<p>`;
        //stake change
        setTimeout(startGame, 3000);
    } else if (playerHandvalue < dealerHandValue) {
        winningMsg.innerHTML = `<p>Dealer Win!<p>`;
        //stake change
        setTimeout(startGame, 3000);
    }
}

/*----- event listeners -----*/
hint.addEventListener("click", hintCards);
stand.addEventListener("click", standCards);

/*----- game frame -----*/
const startGame = () => {
    originalDeck();
    shuffledDeck();
    resetHandsAndHandValue();
    dealStartingHandToDealer();
    dealStartingHandToPlayer();
    checkFirstRound();  
}
window.onload = function() {
    startGame();
    clockDown();
}