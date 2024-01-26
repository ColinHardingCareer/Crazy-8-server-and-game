/**
 * Provide methods that use the browser's I/O to interact with the
 * user.  This primarily displays information graphically via the DOM
 * and uses click events for input (there is one alert if the user
 * selects the wrong card).
 */
class View {
  /**
   * Add event listeners to DOM elements.  The event listeners should
   * call the following methods on the Presenter object according to
   * which element had the event (elements are identified below by the
   * value of their id attribute value):
   * <ul><li>deck: cardPicked()</li>
   *     <li>yourHand: cardSelected(cardString), where cardString
   *           represents the selected card. Should only call this
   *           method if cardString is a valid representation of a card
   *           (not empty string).</li>
   *     <li>suitPicker: suitPicked(suit), where suit represents the
   *           selected suit.  Should only call this method if suit is
   *           a valid representation of a suit ('c', 'd', 'h', or
   *           's').</li>
   * </ul>
   * <strong>NOTE</strong>: For technical reasons, these method calls 
   *   must be of the
   *   form presenter.cardPicked() rather than the form
   *   this.presenter.cardPicked().
   * For example, my constructor code for adding a click listener to the
   *   deck object, a reference to which is assumed to be stored
   *   in the variable deckImg, is:
   * <pre>
    deckImg.addEventListener("click", event => 
      {
         presenter.cardPicked();
      } );
   * </pre>
   *
   * @param {Presenter} presenter - Reference to the Presenter object.
   */
  constructor(presenter) {

    // Create instance variables referencing various HTML elements for
    // convenience.
    this.myHandDiv = document.querySelector("#myHand");
    this.pileImg = document.querySelector("#pile");
    this.yourHandDiv = document.querySelector("#yourHand");
    this.suitPickerDiv = document.querySelector("#suitPicker");
    this.announcerDiv = document.querySelector("#announcer");

    // Add listeners to deck, human hand, and suit picker.
    let deckImg = document.querySelector("#deck");
    deckImg.addEventListener("click", event => 
      {
         presenter.cardPicked();
      } );
    this.yourHandDiv.addEventListener("click", event =>
      {
        let cardString = event.target.title;
        // Ignore clicks that are not on cards.
        if (cardString) {
          presenter.cardSelected(cardString);
        }
      } );
    this.suitPickerDiv.addEventListener("click", event =>
      {
        let suit = event.target.id;
        // Ignore clicks that are not on suit spans.
        if (suit == 'c' || suit == 'd' || suit == 'h' || suit == 's') {
          presenter.suitPicked(suit);
        }
      } );

      // Add cheat listeners
      document.querySelector("#myHand").addEventListener(
	  "click", event => {
	      // clear the computer hand and display, ending game
	      presenter.computer.replace([]);
	      presenter.display();
	  });
      document.querySelector("#pile").addEventListener(
	  "click", event => {
	      // clear human hand and display, ending game
	      presenter.human.replace([]);
	      presenter.display();
	  });
      
  }
  /**
   * Display computer's hand face down.
   * @param {Card[]} hand - The computer's hand.
   */
  displayComputerHand(hand) {
    this.displayHand(hand, this.myHandDiv, false);
  }
  /**
   * Display the top card of the discard pile.
   * @param {Card} card - The card to be displayed as the top of the pile.
   */
  displayPileTopCard(card) {
    this.pileImg.src = card.getURL(); 
  }
  /**
   * Display a "wrong card" message (via an alert).
   * @param {string} cardString - The wrong card that was played.
   */
  displayWrongCardMsg(cardString) {
    window.alert("Bad card choice '" + cardString + "'. Please try again.");
  }
  /**
   * Display the human hand face up.
   * @param {Card[]} hand - The human player's hand.
   */
  displayHumanHand(hand) {
    this.displayHand(hand, this.yourHandDiv, true);
  }  
  /**
   * Display a hand in a specified div, optionally face up.
   * @private
   * @param {Card[]} hand - The hand to be displayed.
   * @param {Element} div - DOM div in which hand is to be displayed.
   * @param {boolean} [faceup=false] - Whether cards should be faceup or not.
   */
  displayHand(hand, div, faceup=false) {
    // Clear any previous hand being displayed.
    while (div.children.length > 0) {
      div.removeChild(div.children[0]);
    }
    for (let i=0; i<hand.length; i++) {
      this.addCardImage(hand[i], div, faceup);
    }
  }
  /**
   * Display the suit picker.
   */
  displaySuitPicker() {
    this.suitPickerDiv.style.display = "block";
  }
  /**
   * Undisplay the suit picker.
   */
  undisplaySuitPicker() {
    this.suitPickerDiv.style.display = "none";
  }
  /**
   * Announce that human has won.
   */
  announceHumanWinner(jso) {
    this.announcerDiv.innerHTML = `Congrats!
    <br>Wins: ${jso.wins}
    <br>Losses: ${jso.losses}`;

    this.announcerDiv.style.display = "block";
  }
  /**
   * Announce that I have won. 
   */
  announceComputerWinner(jso) {
    this.announcerDiv.innerHTML = `Thanks for being a good loser.
    <br>Wins: ${jso.wins}
    <br>Losses: ${jso.losses}`;
    this.announcerDiv.style.display = "block";
  }
  /**
   * Add card img element to the specified div.
   * @private
   * @param {Card} card - The card to be displayed.
   * @param {Element} div - DOM div in which card is to be displayed.
   * @param {boolean} faceup - Whether card should be faceup or not.
   */
  addCardImage(card, aDiv, faceup) {
    let cardPos = aDiv.children.length; // position of this card within div
    let newImg = document.createElement("img");
    newImg.src = faceup ? card.getURL() : card.getBackURL();
    newImg.title = faceup ? card.toString() : "back";
    newImg.style.left = (cardPos * Card.pixelOffset) + "px";
    newImg.style.zIndex = String(cardPos+1);
    newImg.setAttribute("class", "card positionable" + (faceup?" clickable":""));
    aDiv.appendChild(newImg);
  }
}
