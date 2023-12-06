import SceneManager from "./SceneManager.js";
import Engine from "../adr/engine.js";
import EventManager from "./EventManager.js";
import adr from "../adr/adr.js";
import AdrTextObject from "../entity/AdrTextObject.js";
import OnEntityUpdate from "../observer/OnEntityUpdate.js";
import OnEntityInit from "../observer/OnEntityInit.js";
import AdrElement from "../adr/adapter/AdrElement.js";

export default class AdrManager {
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    private root?: AdrTextObject;
    private readonly elements: AdrElement[] = [];
    addElement(adrElement: AdrElement) {
        this.elements.push(adrElement);
    }
    initAdr(): void {
        adr.setAdrManager(this);
        this.root = new AdrTextObject();
        const scene = this.getSceneManager().first();
        scene.addEntity(this.root);
        scene.registerComponents(this.root);
        scene.initEntity(this.root);
        Engine.createDefaultElements();
        Engine.init();
        console.log("AdrManager.initAdr", this);
    }
    getRoot() {
        if (this.root === undefined) {
            throw new Error("root is not defined")
        }
        return this.root;
    }
    initObservers() {
        const onEntityInit = new OnEntityInit;
        onEntityInit.setAdrManager(this);
        onEntityInit.setSubject(this.getEventManager().entityInit);
        const onEntityUpdate = new OnEntityUpdate;
        onEntityUpdate.setAdrManager(this);
        onEntityUpdate.setSubject(this.getEventManager().entityUpdate);
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
    getSceneManager() {
        if (this.sceneManager === undefined) {
            throw new Error("sceneManager is undefined");
        }
        return this.sceneManager;
    }
    setSceneManager(sceneManager: SceneManager) {
        this.sceneManager = sceneManager;
    }

}