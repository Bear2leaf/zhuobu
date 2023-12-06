import AdrManager from "../../manager/AdrManager.js";
import AdrElement from "./AdrElement.js";
import Query from "../query.js";

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
    abstract localStorage(): LocalStorage;
    abstract body(): AdrElement;
    abstract head(): AdrElement;
    abstract onselectstart?: (e: Event) => void;
    abstract onmousedown?: (e: Event) => void;
    abstract createElement(selector: string): AdrElement;
    abstract getElementById(selector: string): AdrElement | null;
    abstract getElementsByClassName(selector: string): HTMLCollection;
    abstract getElementsByTagName(selector: string): HTMLCollection;
    abstract addEventListener(eventName: string, resumeAudioContext: () => void): void;
    abstract removeEventListener(eventName: string, resumeAudioContext: () => void): void;
    abstract styleSheets(): StyleSheetList;
    abstract href(href?: string): void | string;
    abstract title(title?: string): void | string;
    abstract open(url?: string | URL, target?: string, features?: string): void;
    abstract setLocation(location: string): void;
    abstract clearInterval(id: number | undefined): void;
    abstract setInterval(handler: TimerHandler, timeout?: number | undefined, ...args: any[]): void;
    abstract setTimeout(handler: TimerHandler, timeout?: number | undefined, ...args: any[]): void;
    abstract clearTimeout(id?: number): void;
    abstract createAudioContext(): AudioContext;
}
