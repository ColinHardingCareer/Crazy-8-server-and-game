const Player = require('../model/Player.js');

/**
 * The computer player's hand and playing logic.
 */
class ComputerPlayer extends Player{
  /**
   * Record arguments for later use.
   * @param {Deck} deck - The deck of cards used for this game.
   * @param {Pile} pile - The discard pile.
   * @param {View} view - The View object used for all user interaction.
   */
  constructor(deck, pile, view) {
    super(deck);
    this.deck = deck;
    this.pile = pile;
    this.view = view;
  }
  /**
   * Play for the computer, updating the computer's hand as well as
   * the deck and pile as appropriate.  In this version, the computer 
   * always plays the first card in its hand that is playable.  If it 
   * plays an 8, the suit "announced" is the suit on the card.  This
   * method does not update the display; that is handled by the Presenter.
   */
  takeATurn() {

    // Play the first playable card, or pick if none is playable.
    let i=0;
    let hand = this.getHandCopy(); // copy of hand for convenience
    let card = hand[0];
    while (!this.pile.isValidToPlay(card) && i<hand.length-1) {
      i++;
      card = hand[i];
    }
    hand = null; // actual hand will change below, so don't continue to use copy
    if (this.pile.isValidToPlay(card)) {
      this.remove(i);
      this.pile.acceptACard(card);
      this.view.displayPileTopCard(card);
      if (card.getValue() == "8") {
        this.pile.setAnnouncedSuit(card.getSuit());
      }    
      this.view.displayComputerHand(this.getHandCopy());
    }
    else {
      this.add(this.deck.dealACard(this.pile));
      this.view.displayComputerHand(this.getHandCopy());
    }
  }
}
module.exports = ComputerPlayer;
