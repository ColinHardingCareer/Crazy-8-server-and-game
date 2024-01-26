/**
 * Provide methods that log information sent to View methods.
 */
class View {
  /**
   * This constructor does nothing.
   */
  constructor() {
  }

  /**
   * Display computer's hand face down.
   * @param {Card[]} hand - The computer's hand.
   */
  displayComputerHand(hand) {
      console.log(`Computer hand: ${hand}`);
  }
  /**
   * Display the top card of the discard pile.
   * @param {Card} card - The card to be displayed as the top of the pile.
   */
  displayPileTopCard(card) {
      console.log(`Top card of discard pile: ${card}`);
  }
  /**
   * Display a "wrong card" message (via an alert).
   * This should never be called.
   * @param {string} cardString - The wrong card that was played.
   */
  displayWrongCardMsg(cardString) {
    console.log(`Bad card choice ${cardString}. Please try again.`);
  }
  /**
   * Display the human hand face up.
   * @param {Card[]} hand - The human player's hand.
   */
  displayHumanHand(hand) {
     console.log(`Human hand: ${hand}`);
   }  
  /**
   * Display the suit picker.
   */
  displaySuitPicker() {
      console.log("displaySuitPicker() called.");
  }
  /**
   * Undisplay the suit picker.
   * This should never be called.
   */
  undisplaySuitPicker() {
      console.log("undisplaySuitPicker() called.");
  }
  /**
   * Announce that human has won.
   */
  announceHumanWinner() {
      console.log("Congratulations!");
  }
  /**
   * Announce that I have won. 
   */
  announceComputerWinner() {
      console.log("Thanks for being a good loser.");
  }
}
module.exports = View;
