/**
 * A single playing card.
 */
class Card {

  /**
   *  Number representing the distance each card in a hand should be
   *  offset from its neighbors when displayed.
   */
  static pixelOffset = 15;
    
  /**
   *  @param {string} suit Suit of this card
   *  @param {string} value Numeric or face value of this card
   */
  constructor (aSuit, aValue) {
    this.suit = aSuit;
    this.value = aValue;
  }

  /** Return suit of this card. */
    getSuit() { return this.suit; }

  /** Return value of this card. */
  getValue() { return this.value; }

  /**
   * Return a string representation of this card, e.g., "10h".
   */
  toString() {
    return this.value + this.suit ;
  }
  /**
   * Return relative URL of this card (assumes certain folder structure).
   */
  getURL() { 
    return "./images/PlayingCards/" + this.toString() + ".png";
  }
  /**
   * Return relative URL of back of this (or any) card 
   * (assumes certain folder structure).
   */
  getBackURL() { 
    return "./images/PlayingCards/back.png";
  }
}
