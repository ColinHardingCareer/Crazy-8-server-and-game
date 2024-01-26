/**
 * Definition of object used for communicating messages from
 * client to server.
 */
class MessageFromClient {
    action;
    card;
    suit;

    constructor(action, card="", suit="") {
	this.action = action;
	this.card = card;
	this.suit = suit;
    }
}
