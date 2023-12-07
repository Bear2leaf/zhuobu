import AdrManager from "../../manager/AdrManager.js";
import Query from "../query.js";
import AdrStyleSheetList from "./AdrStyleSheetList.js";
import AdrElementCollection from "./AdrElementCollection.js";
import AdrElement from "./AdrElement.js";

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
    abstract createElement(selector: string): AdrElement;
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
