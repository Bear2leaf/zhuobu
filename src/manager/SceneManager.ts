import SceneFactory from "../factory/SceneFactory.js";
import Game from "../game/Game.js";
import Scene from "../scene/Scene.js";
import FactoryManager from "./FactoryManager.js";
import Manager from "./Manager.js";

export default class SceneManager implements Manager {
    private currentScene: Scene;
    private readonly sceneFactory: SceneFactory = this.game.get(FactoryManager).get(SceneFactory);
    constructor(private readonly game: Game) {
        this.currentScene = this.sceneFactory.createDefaultScene();
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }

    
    tick(): void {
        this.currentScene.tick();
    }
}