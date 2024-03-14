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
const timer = document.getElementById('timer');
const nextLevelStake = document.getElementById('next-level-stake')

const dealerHand = document.getElementById('dealer-hand');
const playerHand = document.getElementById('player-hand');
const winningMsg = document.getElementById('winner');
const potAmount = document.getElementById('pot-amount');
const dealerSum = document.getElementById('dealer-sum');
const playerSum = document.getElementById('player-sum');

const nextHand = document.getElementById('next-hand');
const hint = document.getElementById('hint');
const stand = document.getElementById('stand');

const dealerStake = document.getElementById('dealer-stake');
const playerStake = document.getElementById('player-stake');

const hiddenCard = document.getElementById('hidden');
// const split = document.getElementById('split');

/*----- functions -----*/
// Process Function

const resetHandsAndHandValue = () => {
    winningMsg.innerHTML = '';
    dealerHandValue = 0;
    playerHandvalue = 0;
    playerHand.innerHTML = '';
    dealerHand.innerHTML = '';
}

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

const checkFirstRound = () => {
    if (playerHandvalue === 21 && playerHandvalue === dealerHandValue) {
        winningMsg.innerHTML = `<p>Tie<p>`;
        resetHandsAndHandValue();
        setTimeout(checkSecondRound, 2000);
        // startGame();
    } else if (playerHandvalue === 21) {
        winningMsg.innerHTML = `<p>Player Win!<p>`;
        //stake change

        resetHandsAndHandValue();
        setTimeout(checkSecondRound, 2000);
        // startGame();
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
        checkSecondRound();
    }

}

const checkSecondRound = () => {
    console.log('check second')
    if (playerHandvalue > 21) {
        winningMsg.innerHTML = `<p>Dealer Win!<p>`;
        //stake change
        // resetHandsAndHandValue();
        // startGame();
    } return;
}

const standCards = () => {
    canHint === false;
    hiddenCard.src = `./card/${hidden}.png`;
    while (dealerHandValue < 17) {
        let cardImg = document.createElement('img');
        let card = deck.pop();
        cardImg.src = `./cards/${card}.png`;
        dealerHand.append(cardImg);
        dealerHandValue += getValue(card);
        //Where to add this function
        reduceDealerAce();
        dealerAceCount += checkAce(card);
    }
};

const checkFinalRound = () => {
    if (playerHandvalue === dealerHandValue) {
        winningMsg.innerHTML = `<p>Tie<p>`;
        // startGame();
    } else if (playerHandvalue > dealerHandValue) {
        winningMsg.innerHTML = `<p>Player Win!<p>`;
        //stake change
        // startGame();
    } else if (playerHandvalue < dealerHandValue) {
        winningMsg.innerHTML = `<p>Dealer Win!<p>`;
        //stake change
        // startGame();
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

const startGame = () => {
    resetHandsAndHandValue();
    dealStartingHandToPlayer();
    dealStartingHandToDealer();
    checkFirstRound();
    // hintCards();
    // checkSecondRound();
    // // standCards();
    // checkFinalRound();
}

/*----- event listeners -----*/
hint.addEventListener("click", hintCards);
stand.addEventListener("click", standCards);
nextHand.addEventListener("click", startGame);
window.onload = function() {
    originalDeck();
    shuffledDeck();
    startGame();
}