import Scene from "../scene/Scene.js";
import Manager from "./Manager.js";

export default class SceneManager extends Manager<Scene> {
    addObjects(): void {
        this.all().forEach(scene => scene.registerEntities());
    }
    async load(): Promise<void> {
        
    }
    init(): void {
        this.all().forEach(scene => scene.initEntities());
        console.log("SceneManager init");
    }
    update(): void {
        this.all().forEach(scene => scene.update());
    }

}