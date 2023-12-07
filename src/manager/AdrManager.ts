import SceneManager from "./SceneManager.js";
import Engine from "../adr/engine.js";
import EventManager from "./EventManager.js";
import adr from "../adr/adr.js";
import AdrTextObject from "../entity/AdrTextObject.js";
import OnEntityUpdate from "../observer/OnEntityUpdate.js";
import OnEntityInit from "../observer/OnEntityInit.js";
import AdrElement from "../adr/adapter/AdrElement.js";
import Entity from "../entity/Entity.js";
import Node from "../transform/Node.js";
import AdrText from "../drawobject/AdrText.js";
import TRS from "../transform/TRS.js";

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
        this.root.get(AdrText).updateChars("Adr Root!");
        this.root.get(TRS).getScale().set(0.025, 0.025, 1);
        const body = new AdrTextObject();
        scene.addEntity(body);
        scene.registerComponents(body);
        scene.initEntity(body);
        body.get(Node).setParent(this.root.get(Node));
        body.get(AdrText).updateChars("Adr Body!");
        body.get(TRS).getPosition().y = 100;
        const head = new AdrTextObject();
        scene.addEntity(head);
        scene.registerComponents(head);
        scene.initEntity(head);
        head.get(Node).setParent(this.root.get(Node));
        head.get(AdrText).updateChars("Adr Head!");
        head.get(TRS).getPosition().y = 200;
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