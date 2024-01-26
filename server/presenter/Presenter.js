const Deck = require('../model/Deck.js');
const Pile = require('../model/Pile.js');
const HumanPlayer = require('./HumanPlayer.js');
const ComputerPlayer = require('./ComputerPlayer.js');
const View = require('../view/View.js');

/**
 * Main logic for the game Crazy Eights between a human and the computer.
 */
class Presenter {
  /** 
   * Initialize game by creating and shuffling the deck instance
   * variable, creating the discard pile instance variable and dealing
   * one card (other than an 8) to it, creating the View object
   * instance variable (which will be responsible for managing the
   * user interface), and declaring and initializing the human and
   * computer player instance variables.
   */
  constructor() {
    this.deck = new Deck();
    do {
      this.deck.shuffle();
    } while (this.deck.isTopCardAnEight());
    this.pile = new Pile();
    this.pile.acceptACard(this.deck.dealACard());
    this.view = new View(this);
    this.human = new HumanPlayer(this.deck, this.pile, this.view);
    this.computer = new ComputerPlayer(this.deck, this.pile, this.view);
  }
  /**
   * Prepare to play one complete game by calling on View methods to
   * display the initial hands and pile.
   */
  play() {
    this.view.displayComputerHand(this.computer.getHandCopy());
    this.view.displayPileTopCard(this.pile.getTopCard());
    this.view.displayHumanHand(this.human.getHandCopy());
  }
  /**
   * Call on cardSelected() method of HumanPlayer to process the card
   * selected from the player's hand.  If this selection completes
   * player's turn (as indicated by "true" return value from
   * HumanPlayer), complete processing of both human and computer
   * turns.
   * @param {string} cardString - Card selected by the player from their hand.
   */
  cardSelected(cardString) {
    if (this.human.cardSelected(cardString)) {
      this.completeBothTurns();
    }
  }
  /**
   * Call on cardPicked() method of HumanPlayer to respond to player
   * picking a card from the deck.  Then complete processing of both
   * human and computer turns.
   */
  cardPicked() {
    this.human.cardPicked();
    this.completeBothTurns();
  }
  /**
   * Call on suitPicked() method of HumanPlayer to respond to player
   * picking a suit after playing an 8.  Then complete processing of
   * both human and computer turns.
   * @param {string} suit - The suit chosen: 'c', 'd', 'h', or 's'
   */
  suitPicked(suit) {
    this.human.suitPicked(suit);
    this.completeBothTurns();
  }
  /**
   * Complete processing at the end of the human player's turn.  This
   * involves checking for a human win and announcing if this has
   * occurred, otherwise allowing the computer to play its turn and
   * then checking for and possibly announcing a computer win.
   */
  completeBothTurns() {
    if (this.human.isHandEmpty()) {
      this.view.announceHumanWinner();
    }
    else {
      this.computerTakeATurn();
    }
  }
  /**
   * Process computer's turn, display update, and win checking.
   * @private
   */
  computerTakeATurn() {
    this.computer.takeATurn();
    if (this.computer.isHandEmpty()) {
      this.view.announceComputerWinner();
    }
  }
}
module.exports = Presenter;
