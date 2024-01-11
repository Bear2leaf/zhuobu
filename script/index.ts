import Game from "./game/Game.js";
import Server from "./server.js";
const server = new Server();
server.init();
const game = new Game();
server.onMessage(game.onMessage.bind(game));
game.start();