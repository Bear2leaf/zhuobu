import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";

export default class SceneManager extends Manager<Scene> {
    private ready = false;
    init(): void {
        this.add(DemoScene);
        this.get(DemoScene).registerEntities();
        console.log("SceneManager init");
    }
    update(): void {
        if (!this.ready) {
            this.get(DemoScene).initEntities();
            this.ready = true;
        }
        this.get(DemoScene).update();
    }

}