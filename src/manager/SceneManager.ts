import DemoScene from "../scene/DemoScene.js";
import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";

export default class SceneManager extends Manager<Scene> {
    init(): void {

        this.add(DemoScene);
        this.get(DemoScene).init();
        console.log("SceneManager init");
    }

}