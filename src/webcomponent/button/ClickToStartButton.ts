import Game from "../../game/Game.js";
import SceneManager from "../../manager/SceneManager.js";
import AdrScene from "../../scene/AdrScene.js";
import Button from "./Button.js";

export default class ClickToStartButton extends Button  {

    constructor(private readonly game: Game) {
        super();
        this.setText("Start");
        this.style.display = "inline-block";
    }
    onClick() {
        this.remove();
        this.game.load().then(() => {
            this.game.get(SceneManager).add(AdrScene);
            this.game.get(SceneManager).addObjects();
            this.game.init();
            this.game.update();
        });
    }

}