import AdrScene from "../scene/AdrScene.js";
import EventManager from "./EventManager.js";

export default class SceneManager {
    private readonly adrScene = new AdrScene;
    private eventManager?: EventManager;
    registerEntities(): void {
        this.adrScene.registerEntities();
    }
    initSceneEntities(): void {
        this.adrScene.setEntityInit(this.getEventManager().entityInit);
        this.adrScene.initEntities();
    }
    update(): void {
        this.adrScene.update();
    }
    first() {
        return this.adrScene;
    }
    getEventManager() {
        if (!this.eventManager) throw new Error("EventManager not set");
        return this.eventManager;
    }

    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
}