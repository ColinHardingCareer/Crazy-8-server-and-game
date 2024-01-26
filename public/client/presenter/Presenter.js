/**
 * Main logic for the game Crazy Eights between a human and the computer.
 */
class Presenter {
    /** 
     * Initialize game by creating instance variables reprsenting the
     * deck, the discard pile, the View object (which will be
     * responsible for managing the user interface), and the human and
     * computer player instance variables.  Also create an instance
     * variable for recording the human's most recently selected card
     * (useful when an 8 is selected).
     */
    constructor() {
	this.deck = new Deck();
	this.pile = new Pile();
	this.view = new View(this);
	this.human = new HumanPlayer(this.deck, this.pile, this.view);
	this.computer = new ComputerPlayer(this.deck, this.pile, this.view);
	this.cardString = "";
	this.ws = new WebSocket("ws://localhost:3000");
	this.ws.addEventListener('message', event => {this.receiver(event);});
	this.ws.addEventListener('open', event => {this.play(event);});
    }

    /**
     * Begin play of the game by requesting server to initialize and
     * return player and computer hands and the top card of the pile.
     */
    play() {
	this.request(new MessageFromClient("initialize"));
    }

    /**
     * Send the specified type of request (initialize, etc.) to the
     * server, receive back JSON data, parse this data into a
     * JavaScript object, and pass this object as an argument to this
     * Presenter object's <code>receiver()</code> method.  The
     * <code>receiver()</code> method will then load the data into the
     * client-side model and display the current state of the game.
     *
     * @param type {string} The type of request to be made to the
     *        server.  The string includes any necessary parameters.
     *        Example <code>type</code> values are <code>initialize</code> and 
     *        <code>playNormalCard?card=9h</code> .
     */
    request(type) {
	this.ws.send(JSON.stringify(type));
    }

    /**
     * Receive JSON response from server and use to update
     * appropriate data structures.  Then display the game.
     */
    receiver(event) {
	let response = JSON.parse(event.data);

	// NEED TO CHECK FOR END-OF-GAME EVENT
	
	let humanList = [];
	for (let card of response.human) {
	    humanList.push(new Card(card.suit, card.value));
	}
	this.human.replace(humanList);
	let topPileCard = new Card(response.pile.suit, response.pile.value);
	this.pile.acceptACard(topPileCard);
	this.pile.setAnnouncedSuit(response.announcedSuit);
	let computerList = [];
	for (let i = 1; i <= response.computer; i++) {
	    computerList.push(new Card("b", "b"));
	}
	this.computer.replace(computerList);

	this.display();
    }

    /**
     * Update display and announce a winner if there is one.
     */

    //this.request(new MessageFromClient("initialize"));
    async display() {
	this.view.displayComputerHand(this.computer.getHandCopy());
	this.view.displayPileTopCard(this.pile.getTopCard());
	this.view.displayHumanHand(this.human.getHandCopy());
	if (this.computer.isHandEmpty()) {
        let res = await fetch(`http://localhost:4000/update?result=loss`)
        let jso = await res.json()
        console.log(jso)

	    this.view.announceComputerWinner(jso);

	}
	else if (this.human.isHandEmpty()) {
        let res = await fetch(`http://localhost:4000/update?result=win`)
        let jso = await res.json()
        console.log(jso)


	    this.view.announceHumanWinner(jso);
	}
    }
    /**
     * Record the card selected from the player's hand.  If this
     * selection completes player's turn (as indicated by "true"
     * return value from HumanPlayer), notify the server that this
     * card is being played.
     * @param {string} cardString - Card selected by the player from their hand.
     */
    cardSelected(cardString) {
	this.cardString = cardString; // Store to later pass with suitPicked
	if (this.human.cardSelected(cardString)) {
	    this.request(new MessageFromClient("playNormalCard",
					       cardString));
	}
    }
    /**
     * Tell server that human has picked a card from the deck.
     */
    cardPicked() {
	this.request(new MessageFromClient("pickCardFromDeck"));
    }
    /**
     * Turn off the suit picker.  Then tell server which
     * card (an 8) the user has selected (as recorded by cardSelected) 
     * and what suit it should represent.
     * @param {string} suit - The suit chosen: 'c', 'd', 'h', or 's'
     */
    suitPicked(suit) {
        this.view.undisplaySuitPicker();
	this.request(new MessageFromClient("play8",
					   this.cardString,
					   suit));
    }
}
