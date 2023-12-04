import AdrScene from "../scene/AdrScene.js";

export default class SceneManager {
    private readonly adrScene = new AdrScene;
    registerEntities(): void {
        this.adrScene.registerEntities();
    }
    initSceneEntities(): void {
        this.adrScene.initEntities();
    }
    update(): void {
        this.adrScene.update();
    }
    first() {
        return this.adrScene;
    }

}