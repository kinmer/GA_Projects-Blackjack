# Hands Up with Don Johnson at the Final Table
----
### Date: 7 March 2024
#### By: Yong Zhang （*A storyteller endowed with an array of weapons.*）
[Website]   [GitHub]  [LinkedIn]

----
## Description 
This is an interactive web game crafted using three fundamental programming languages, providing players with an engaging experience.
Rooted in the basic rules of Blackjack, the game is enhanced with a hint of storyline to enrich the gameplay. Whether you're a seasoned player or new to the game, this web-based experience offers a thrilling platform for entertainment and strategic thinking. 

## Built with
* HTML
* CSS
* JavaScript

## Background
A timeless classic, Blackjack is one of the most beloved card games globally. Don Johnson, a legend revered as one of the greatest players in history. Defeating him in a high-stakes showdown is every player's ultimate dream. 

Now, you find yourself at the final table of a world championship, facing off against Don Johnson himself. Victory means claiming the pinnacle of Blackjack, while defeat relegates you to the forgotten realm of second place. The opportunity is here.

"Let's Deal!"

## Game Rules

The basic rules are the same as in the game of Blackjack. However, there is no insurance, and players can only split their hand once.

Don Johnson, as the defending champion, will play the role of the dealer.

Each player starts with 1000 coins; the initial bet amount is 10. The game advances to the next level every three minutes, doubling the bet amount with each level up. 

The game continues until one player wins all of their opponent's money.

**Please Note** that there's only one chance, and if failed, only one more name will be added to the countless list of runners-up.

----
## Webpage Frame
[Page Structure](https://www.figma.com/file/cStI4RJkSk1iIBri6EvmFV/Blackjack-Board?type=whiteboard&node-id=0%3A1&t=arAP9F0YJ0pk47U1-1)

----
## Codelogic(Pseudocode)
### Before the game starts
1. Introduce the background and rules of the game to the gamer;
2. Start the game once the gamer is ready.
### Game on
1. ##### First two cards
- Randomly assign two cards to each player.
- Check to see if both players hold blackjack, if so, push.
- If player has blackjack, but dealer does not, player wins 1.5 times the amount wagered.
- If the above doesn't happen, it goes to the player's round.

2. ##### Player's trun
- Inspection of special case:<br>
Checks to see if the player's hands add up to 10 points, and if so, he has the option of doubling up.<button>Doulbe</button><br>
Check to see if the player is holding a pair, and if so, he has the option of splitting.<button>Split</button>
- Handling of special cases:<br>
If the player chooses to double, his bet amout is doubled, gets the next card, but only one, then it is the dealer's turn.<br>
If a player chooses to split his hand, his hand becomes two, and the new split has to be the same bet amount as the original bet.
- Player's hand in progress:<br>
Players can choose to continue to deal<button>Hint</button>, or stop<button>Stand</button>. If the total exceeds 21 during the deal, the dealer wins and the chips go to the dealer.<br>
If a player chooses to stop dealing<button>Stand</button>, it goes to the dealer's turn.
3. ##### Dealer's turn:
- Check to see if the dealer's hand total is more than or equal to 17 points, and if it has been exceeded, proceed to the point comparison.
- If not, continue to deal until it equals or exceeds 17 points.
4. ##### Calculation of points:<br>
- In the case of including an Ace, the Ace is counted as 1 point if the total number of points of the other cards equals or exceeds 11, and the Ace is counted as 11 points if the total number of points of the other cards is less than 11.
- In the absence of an Ace, the points are each card's total number of points.
5. ##### Comparison points
- If the dealer's point total exceeds 21, the player wins.
- It is a push if both sides have hands equal to or more than five cards.
- If one hand has more than five cards, that side wins.
- If the above doesn't happen, the two sides compare the points, a push for the same number of points; otherwise, the one with the bigger points wins.
- Loser's money goes to the winner.
6. ##### The stakes and time.
- Each player starts with 1000 coins; the initial bet amount is 10. 
- The game advances to the next level every three minutes, doubling the bet amount with each level up. 
- If a player's total amount of coins is less than the minimum bet requirement, all coins are placed.
### Endgame
1. The game ends when one of the players has zero coins.
2. If the player wins, congratulatory content appears.
3. If the player loses, the game ends and the player's name goes on the loser's list.


