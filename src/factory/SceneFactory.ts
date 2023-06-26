import FactoryManager from "../manager/FactoryManager.js";
import DemoScene from "../scene/DemoScene.js";
import Factory from "./Factory.js";

export default class SceneFactory implements Factory {
    constructor(private readonly factoryManager: FactoryManager) {

    }
    createDefaultScene() {
        const scene = new DemoScene();
        return scene;
    }
}