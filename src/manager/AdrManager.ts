import SceneManager from "./SceneManager.js";
import Engine from "../adr/engine.js";
import EventManager from "./EventManager.js";
import adr from "../adr/adr.js";
import AdrTextObject from "../entity/AdrTextObject.js";
import OnEntityUpdate from "../observer/OnEntityUpdate.js";
import AdrElement from "../adr/adapter/AdrElement.js";
import Node from "../transform/Node.js";
import AdrText from "../drawobject/AdrText.js";
import TRS from "../transform/TRS.js";
import AdrRootElement from "../adr/adapter/AdrRootElement.js";

export default class AdrManager {
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    private readonly root = new AdrRootElement();
    initAdr(): void {
        adr.setAdrManager(this);
        const root = this.root;
        root.setEntity(new AdrTextObject());
        const scene = this.getSceneManager().first();
        scene.addEntity(root.getEntity());
        scene.registerComponents(root.getEntity());
        scene.initEntity(root.getEntity());
        root.getEntity().get(AdrText).updateChars("Adr Root!");
        root.getEntity().get(TRS).getScale().set(0.025, 0.025, 1);
        const body = new AdrTextObject();
        scene.addEntity(body);
        scene.registerComponents(body);
        scene.initEntity(body);
        body.get(Node).setParent(root.getEntity().get(Node));
        body.get(AdrText).updateChars("Adr Body!");
        body.get(TRS).getPosition().y = 100;
        const bodyElement = new AdrElement();
        bodyElement.setDomElement(document.body);
        bodyElement.setEntity(body);
        root.appendChild(bodyElement);
        const head = new AdrTextObject();
        scene.addEntity(head);
        scene.registerComponents(head);
        scene.initEntity(head);
        head.get(Node).setParent(root.getEntity().get(Node));
        head.get(AdrText).updateChars("Adr Head!");
        head.get(TRS).getPosition().y = 200;
        const headElement = new AdrElement();
        headElement.setDomElement(document.head);
        headElement.setEntity(head);
        root.appendChild(headElement);
        Engine.createDefaultElements();
        Engine.init();
        console.log("AdrManager.initAdr", this);
    }
    getRoot() {
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