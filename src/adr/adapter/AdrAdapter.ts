import AdrManager from "../../manager/AdrManager.js";
import Query from "../query.js";
import AdrStyleSheetList from "./AdrStyleSheetList.js";
import AdrElementCollection from "./AdrElementCollection.js";
import AdrElement from "./AdrElement.js";
import AdrTextObject from "../../entity/AdrTextObject.js";
import TRS from "../../transform/TRS.js";
import SDFCharacter from "../../drawobject/SDFCharacter.js";

export default abstract class AdrAdapter {
    private readonly store: LocalStorage = { clear: () => this.store.gameState = undefined }
    // private readonly store = localStorage;
    private adrManager?: AdrManager;
    State?: Record<string, any>;
    good?: Good;
    craftable?: Craftable;
    getAdrManager(): AdrManager {
        if (!this.adrManager) throw new Error("AdrManager not set");
        return this.adrManager;
    }
    setAdrManager(adrManager: AdrManager): void {
        this.adrManager = adrManager;
    }
    $(selector: string | AdrElement, context?: Query | string) {
        const query = context === undefined ? new Query(selector) : new Query(selector, context);
        return query;
    }

    localStorage(): LocalStorage {
        return this.store;
    }
    body(): AdrElement {
        return this.getAdrManager().getRoot().getBody();
    }
    head(): AdrElement {
        return this.getAdrManager().getRoot().getHead();
    }
    createElement(selector: string): AdrElement {
        const entity = new AdrTextObject();
        const scene = this.getAdrManager().getSceneManager().getAdrScene();
        scene.addEntity(entity);
        scene.registerComponents(entity);
        entity.get(TRS).getPosition().x = -50;
        entity.get(TRS).getPosition().y = Math.random() * 300 - 150;
        entity.get(SDFCharacter).getPickColor().set(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256));
        scene.initEntity(entity);
        const adrElement = new AdrElement();
        const domElement = document.createElement(selector);
        adrElement.tagName = selector;
        adrElement.setDomElement(domElement);
        adrElement.setEntity(entity);
        const eventManager = this.getAdrManager().getEventManager();
        adrElement.setSubjects(eventManager.adrElementRemove, eventManager.adrElementIdChange, eventManager.adrElementParentChange);
        return adrElement;
    }
    getElementById(selector: string): AdrElement | null {
        return this.getAdrManager().getRoot().getElementById(selector) as AdrElement;
    }
    getElementsByClassName(selector: string): AdrElementCollection {
        return this.getAdrManager().getRoot().getElementsByClassName(selector);
    }
    getElementsByTagName(selector: string): AdrElementCollection {
        return this.getAdrManager().getRoot().getElementsByTagName(selector);
    }
    addEventListener(eventName: string, resumeAudioContext: () => void): void {
        return this.getAdrManager().getRoot().addEventListener(eventName, resumeAudioContext, { once: false });
    }
    removeEventListener(eventName: string, resumeAudioContext: () => void): void {
        return this.getAdrManager().getRoot().removeEventListener(eventName, resumeAudioContext);
    }
    createAudioContext() {
        return this.getAdrManager().getDevice()?.createWebAudioContext();
    };
    abstract onselectstart?: (e: Event) => void;
    abstract onmousedown?: (e: Event) => void;
    abstract styleSheets(): AdrStyleSheetList;
    abstract href(href?: string): void | string;
    abstract title(title?: string): void | string;
    abstract open(url?: string | URL, target?: string, features?: string): void;
    abstract setLocation(location: string): void;
    abstract clearInterval(id: number | undefined): void;
    abstract setInterval(handler: TimerHandler, timeout?: number | undefined, ...args: any[]): void;
    abstract setTimeout(handler: TimerHandler, timeout?: number | undefined, ...args: any[]): void;
    abstract clearTimeout(id?: number): void;
}
