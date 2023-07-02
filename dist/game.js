import MiniGameDevice from "./device/MiniGameDevice.js";
import MiniGame from "./game/MiniGame.js";
const game = new MiniGame();
game.setDevice(new MiniGameDevice());
game.initAndLoadCache().then(() => {
    game.init();
    game.update();
});
