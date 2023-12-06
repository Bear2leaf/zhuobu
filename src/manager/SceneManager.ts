import AdrScene from "../scene/AdrScene.js";
import EventManager from "./EventManager.js";

export default class SceneManager {
    private readonly adrScene = new AdrScene;
    registerEntities(): void {
        this.adrScene.registerEntities();
    }
    initSceneEntities(): void {
        this.adrScene.initEntities();
    }
    render(): void {
        this.adrScene.render();
    }
    first() {
        return this.adrScene;
    }
    update() {
        this.adrScene.update();
    }
    initSubjects(eventManager: EventManager) {
        this.adrScene.setEntitySubjects(
            eventManager.viewPortChange,
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender,
            eventManager.entityUpdate
        );
    }
}