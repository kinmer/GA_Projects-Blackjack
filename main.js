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

/*----- cached elements  -----*/
const timer = document.getElementById('timer');
const nextLevelStake = document.getElementById('next-level-stake')

const dealerHand = document.getElementById('dealer-hand');
const playerHand = document.getElementById('player-hand');
const winningMsg = document.getElementById('winner');
const potAmount = document.getElementById('pot-amount');
const dealerSum = document.getElementById('dealer-sum');
const playerSum = document.getElementById('player-sum');

const double = document.getElementById('double');
const hint = document.getElementById('hint');
const stand = document.getElementById('stand');

const dealerStake = document.getElementById('dealer-stake');
const playerStake = document.getElementById('player-stake');

const hiddenCard = document.getElementById('hidden');
// const split = document.getElementById('split');

/*----- functions -----*/
// Process Function
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

const dealStartingHandToPlayer = () => {
    for(let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = `./cards/${card}.png`;
        playerHand.append(cardImg);
        playerPoints += getValue(card);
        playerAceCount += checkAce(card);
    }
}

const dealStartingHandToDealer = () => {
    hidden = deck.pop();
    dealerPoints += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    dealerHand.append(cardImg);
    dealerPoints += getValue(card);
    dealerAceCount += checkAce(card);
}

const checkFirstRound = () => {
    if (playerPoints === 21 && playerPoints === dealerPoints) {
        winningMsg.innerHTML = `<p>Tie<p>`;
        startGame();
    } else if (playerPoints === 21) {
        winningMsg.innerHTML = `<p>Player Win!<p>`;
        //stake change
        startGame();
    }else return;
}

const hintCards = () => {
    if (!canHint){
        return;
    }
    let cardImg = document.createElement('img');
    let card = deck.pop();
    cardImg.src = `./cards/${card}.png`;
    playerHand.append(cardImg);
    playerPoints += getValue(card);
    playerAceCount += checkAce(card);
    if (reduceAce(playerPoints, playerAceCount) > 21) {
        canHint = false;
    }
}

const checkSecondRound = () => {
    if (playerPoints > 21) {
        winningMsg.innerHTML = `<p>Dealer Win!<p>`;
        //stake change
        startGame();
    } return;
}

const standCards = () => {
    canHint === false;
    hiddenCard.src = `./card/${hidden}.png`;
    while (dealerPoints < 17) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = `./cards/${card}.png`;
        dealerHand.append(cardImg);
        dealerPoints += getValue(card);
        //Where to add this function
        reduceDealerAce();
        dealerAceCount += checkAce(card);
    }
};

const checkFinalRound = () => {
    if (playerPoints === dealerPoints) {
        winningMsg.innerHTML = `<p>Tie<p>`;
        startGame();
    } else if (playerPoints > dealerPoints) {
        winningMsg.innerHTML = `<p>Player Win!<p>`;
        //stake change
        startGame();
    } else if (playerPoints < dealerPoints) {
        winningMsg.innerHTML = `<p>Dealer Win!<p>`;
        //stake change
        startGame();
    }
}

//Functioanl Function
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

const reduceAce = (playerPoints, playerAceCount) => {
    while (playerPoints > 21 && playerAceCount > 0) {
        playerPoints -= 10;
        playerAceCount -= 1;
    }
    return playerPoints;
}
const reduceDealerAce = (dealerPoints, dealerAceCount) => {
    while (dealerPoints > 21 && dealerAceCount > 0) {
        dealerPoints -= 10;
        dealerPoints -= 1;
    }
    return dealerPoints;
}

const startGame = () => {
    dealStartingHandToPlayer();
    dealStartingHandToDealer();
    checkFirstRound();
    hintCards();
    checkSecondRound();
    standCards();
    checkFinalResult();
}

/*----- event listeners -----*/
hint.addEventListener("click", hintCards);
stand.addEventListener("click", standCards);

window.onload = function() {
    originalDeck();
    shuffledDeck();
    startGame();
}