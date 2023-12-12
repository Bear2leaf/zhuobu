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
import Device from "../device/Device.js";
import OnClickPickSayHello from "../observer/OnClickPickSayHello.js";

export default class AdrManager {
    private sceneManager?: SceneManager;
    private eventManager?: EventManager;
    private device?: Device;
    private readonly root = new AdrRootElement();
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice() {
        if (!this.device) {
            throw new Error("Device not found.")
        }
        return this.device;
    }
    initAdr(): void {
        adr.setAdrManager(this);
        const root = this.root;
        root.setEntity(new AdrTextObject());
        const scene = this.getSceneManager().getAdrScene();
        scene.addEntity(root.getEntity());
        scene.registerComponents(root.getEntity());
        scene.initEntity(root.getEntity());
        root.getEntity().get(AdrText).updateChars("Adr Root!");
        root.getEntity().get(TRS).getScale().set(0.025, 0.025, 1);
        const body = new AdrTextObject();
        scene.registerComponents(body);
        scene.initEntity(body);
        body.get(Node).setParent(root.getEntity().get(Node));
        body.get(AdrText).updateChars("Adr Body!");
        body.get(TRS).getPosition().y = 100;
        const bodyElement = new AdrElement();
        bodyElement.setDomElement(document.body);
        bodyElement.setEntity(body);
        adr.$(root).append(adr.$(bodyElement))
        const head = new AdrTextObject();
        scene.registerComponents(head);
        scene.initEntity(head);
        head.get(Node).setParent(root.getEntity().get(Node));
        head.get(AdrText).updateChars("Adr Head!");
        head.get(TRS).getPosition().y = 200;
        const headElement = new AdrElement();
        headElement.setDomElement(document.head);
        headElement.setEntity(head);
        adr.$(root).append(adr.$(headElement))
        Engine.createDefaultElements();
        Engine.init();
    }
    getRoot() {
        return this.root;
    }

    initObservers() {
        const onEntityUpdate = new OnEntityUpdate;
        onEntityUpdate.setAdrManager(this);
        onEntityUpdate.setSubject(this.getEventManager().entityUpdate);
        const onClickPick = new OnClickPickSayHello();
        onClickPick.setSubject(this.getEventManager().clickPick);
        onClickPick.setAdrManager(this);
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