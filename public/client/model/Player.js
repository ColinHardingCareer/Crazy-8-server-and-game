/** 
 * Base class for players.  Creates instance variable to hold player's
 * hand and provides several utility methods related to maintaining
 * and searching a hand.
 */
class Player {
  constructor(deck) {

    /** This player's hand. */
    this.list = new Array();
  }
  /**
   * Return true when this hand is empty.
   */
  isHandEmpty() {  
    return this.list.length == 0;
  }
  /**
   * Add the given Card object to this player's hand.
   */
  add(card) {
    this.list.push(card);
  }
  /**
   * Remove the card at the specified position (0-based) in
   * this player's hand.
   */
  remove(i) {
    this.list.splice(i,1);
  }
  /**
   * Given the string specification of a card,
   * return the card if it is in this player's hand
   * or return null.
   */
  find(cardString) {
    let i = 0;
    let card = null;
    while (i<this.list.length && !card) {
      if (this.list[i].toString() == cardString) {
        card = this.list[i];
      }
      i++;
    }
    return card;
  }
  /**
   * Return index of given Card object, or -1 if card not in hand.
   */
  indexOf(card) {
    return this.list.indexOf(card);
  }
  /**
   * Return copy of this player's hand (array of Card objects).
   * Changes to the returned array will not affect the Player's hand.
   */
  getHandCopy() {
    return this.list.slice(0);
  }
    /**
     * Replace old hand with a new one.
     */
    replace(list) {
	this.list = list;
    }
}
