import AdrManager from "../../manager/AdrManager.js";
import Query from "../query.js";
import AdrStyleSheetList from "./AdrStyleSheetList.js";
import AdrElementCollection from "./AdrElementCollection.js";
import AdrElement from "./AdrElement.js";
import AdrTextObject from "../../entity/AdrTextObject.js";
import TRS from "../../transform/TRS.js";

export default class AdrAdapter {
    private readonly store: LocalStorage = typeof localStorage === 'undefined' ? { clear: () => this.store.gameState = undefined } : localStorage;
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
        return this.store;
    }
    reload(): void {

    }
    search(): string {
        return "";
    }
    body(): AdrElement {
        return this.getAdrManager().getRoot().getBody();
    }
    head(): AdrElement {
        return this.getAdrManager().getRoot().getHead();
    }
    createElement(selector: string): AdrElement {
        const scene = this.getAdrManager().getSceneManager().getTmpScene();
        const element = scene.createAdrElement(selector);
        const eventManager = this.getAdrManager().getEventManager();
        element.setSubjects(eventManager.adrElementRemove, eventManager.adrElementIdChange, eventManager.adrElementParentChange);
        return element;
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
    styleSheets(): AdrStyleSheetList { return new AdrStyleSheetList; }
    onselectstart?: (e: Event) => void;
    onmousedown?: (e: Event) => void;
    href(href?: string | undefined): string | void {
    }
    title(title?: string | undefined): string | void {
    }
    open(url?: string | URL | undefined, target?: string | undefined, features?: string | undefined): void {
    }
    setLocation(location: string) {
    }
    clearInterval(id: number | undefined) {
        return clearInterval(id);
    };
    setInterval(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
        return setInterval(handler, timeout, ...args);
    };
    setTimeout(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
        return setTimeout(handler, timeout, ...args);
    };
    clearTimeout(id?: number) {
        return clearTimeout(id);
    };
}
