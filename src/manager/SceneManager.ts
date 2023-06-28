import Game from "../game/Game.js";
import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";

export default class SceneManager extends Manager<Scene> {
    constructor(game: Game) {
        super(game);
        this.add(DemoScene);
        this.get(DemoScene).init();
    }

}