import AdrScene from "../scene/AdrScene.js";
import ViewPortChange from "../subject/ViewPortChange.js";
import EventManager from "./EventManager.js";

export default class SceneManager {
    private readonly adrScene = new AdrScene;
    private viewPortChange?: ViewPortChange;
    registerEntities(): void {
        this.adrScene.registerEntities();
    }
    initSceneEntities(): void {
        this.adrScene.initEntities();
    }
    update(): void {
        this.adrScene.update();
    }
    render(): void {
        this.viewPortChange?.notify();
        this.adrScene.render();
    }
    first() {
        return this.adrScene;
    }

    initSubjects(eventManager: EventManager) {
        this.viewPortChange = eventManager.viewPortChange;
        this.adrScene.setEntitySubjects(
            eventManager.entityInit,
            eventManager.entityAdd,
            eventManager.entityRegisterComponents,
            eventManager.entityRender
        );
    }
}