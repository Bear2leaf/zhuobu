import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";

export default class SceneManager extends Manager<Scene> {
    addObjects(): void {
        this.add(DemoScene);
        this.get(DemoScene).registerEntities();
    }
    async load(): Promise<void> {
        
    }
    init(): void {
        this.get(DemoScene).initEntities();
        console.log("SceneManager init");
    }
    update(): void {
        this.get(DemoScene).update();
    }

}