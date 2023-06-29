import MiniGameDevice from "./device/MiniGameDevice.js";
import MiniGame from "./game/MiniGame.js";
const game = new MiniGame();
game.init(new MiniGameDevice());
game.tick();
