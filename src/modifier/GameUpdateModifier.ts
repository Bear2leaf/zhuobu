import Game from "../game/Game.js";
import Modifier from "./Modifier.js";

export default class GameUpdateModifier implements Modifier {
    private game?: Game;
    setGame(game: Game) {
        this.game = game;
    }
    getGame(): Game {
        if (!this.game) {
            throw new Error("game is undefined");
        }
        return this.game;
    }
    pause(): void {
        this.getGame().stop();
    }
    resume(): void {
        this.getGame().update();
    }
    update(): void {
    }

}