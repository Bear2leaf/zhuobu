import AdrManager from "../../manager/AdrManager.js";
import Query from "../query.js";
import AdrStyleSheetList from "./AdrStyleSheetList.js";
import AdrElementCollection from "./AdrElementCollection.js";
import AdrElement from "./AdrElement.js";
import AdrTextObject from "../../entity/AdrTextObject.js";
import AdrText from "../../drawobject/AdrText.js";
import TRS from "../../transform/TRS.js";
import Node from "../../transform/Node.js";

export default abstract class AdrAdapter {
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
        return context === undefined ? new Query(selector) : new Query(selector, context);
    }

    localStorage(): LocalStorage {
        return {
            clear: () => { }
        };
    }
    body(): AdrElement {
        return this.getAdrManager().getRoot().getBody();
    }
    head(): AdrElement {
        return this.getAdrManager().getRoot().getHead();
    }

    createElement(selector: string): AdrElement {
        const entity = new AdrTextObject();
        const scene = this.getAdrManager().getSceneManager().first();
        scene.addEntity(entity);
        scene.registerComponents(entity);
        entity.get(TRS).getPosition().x = Math.random() * 500 - 250;
        entity.get(TRS).getPosition().y = Math.random() * 500 - 250;
        entity.get(Node).setParent(this.body().getEntity().get(Node));
        scene.initEntity(entity);
        entity.get(AdrText).updateChars(selector);
        const adrElement = new AdrElement();
        adrElement.onRemove = () => {
            this.getAdrManager().getSceneManager().first().removeEntity(entity);
        };
        const domElement = document.createElement(selector);
        adrElement.tagName = selector;
        adrElement.setDomElement(domElement);
        adrElement.setEntity(entity);
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
