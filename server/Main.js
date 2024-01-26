"use strict";

/**
 * The object that represents the current state of the game.
 */
var presenterMap = new Map();

const WebSocket = require('ws');
const Presenter = require('./presenter/Presenter.js');

const port = 3000;

/**
 * Create a Promise object that resolves in ms milliseconds.
 * So awaiting this Promise has the effect of pausing the thread
 * that issued the await for ms milliseconds.
 * Thanks to 
 * https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep/56406126#56406126 
 * for suggesting this approach, which is documented in some detail at
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#creating_a_promise_around_an_old_callback_api
 * and 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Used below as argument to sleep(). Represents 1.5 seconds.
const DELAY = 1500; 

/**
 * Function called by server to handle an incoming client WebSocket connection.
 * @param {WebSocket} ws WebSocket connection with this client.
 */
function handle_connection(ws) {
    ws.addEventListener('message', handle_message);
}

async function handle_message(event) {
    let ws = event.target;
    let message = JSON.parse(event.data);
    let path = message.action;
    let presenter = presenterMap.get(ws)
    switch (path) {
    case "initialize":
        presenterMap.set(ws,new Presenter())
        break;
    case "pickCardFromDeck":
        
        presenter.human.cardPicked();
	send_response(ws);
        await sleep(DELAY);
	presenter.completeBothTurns();
        break;
    case "playNormalCard":
        {   // Wrapped in block so that cardString variable can be declared
	    // below as well.
            let cardString = message.card;
            presenter.cardSelected(cardString);
        }
        await sleep(DELAY);
        break;
    case "play8":
        {
            let cardString = message.card;
            let suit = message.suit;
	    // Actually, could call cardSelected() directly on presenter,
	    // since playing card will not complete human turn.
            presenter.cardSelected(cardString); 
            presenter.suitPicked(suit);
        }
        await sleep(DELAY);
        break;
    default:
        console.log("Unexpected path: " + path);
    }
    send_response(ws);
    console.log("sending");
}

function send_response(ws) {
    let presenter = presenterMap.get(ws)
    let response = JSON.stringify(
        {
            human: presenter.human.getHandCopy(),
            computer: presenter.computer.getHandCopy().length,
            pile: presenter.pile.getTopCard(),
            announcedSuit: presenter.pile.announcedSuit
        } );
    ws.send(response);
}

/**
 * WebSocket server for two-player Crazy 8s game.
 */
const wss = new WebSocket.Server({port: port},
				 () => {console.log("Server listening.");}
				);
wss.on('connection', handle_connection);
wss.on('error', err => {console.log(`Server error: ${err}`);});

module.exports = wss;
