import AdrAdapter from "./AdrAdapter.js";
import AdrElement from "./AdrElement.js";

export default class DomAdr extends AdrAdapter {
    localStorage(): LocalStorage {
        return {
            clear: () => { }
        };
    }
    body(): AdrElement { return document.body; }
    head(): AdrElement { return document.head; }
    styleSheets(): StyleSheetList { return document.styleSheets; }
    onselectstart?: (e: Event) => void;
    onmousedown?: (e: Event) => void;
    createElement(selector: string): AdrElement {
        return document.createElement(selector);
    }
    getElementById(selector: string): AdrElement | null {
        return document.getElementById(selector) as AdrElement;
    }
    getElementsByClassName(selector: string): HTMLCollection {
        return document.getElementsByClassName(selector);
    }
    getElementsByTagName(selector: string): HTMLCollection {
        return document.getElementsByTagName(selector);
    }
    addEventListener(eventName: string, resumeAudioContext: () => void): void {
        return document.addEventListener(eventName, resumeAudioContext);
    }
    removeEventListener(eventName: string, resumeAudioContext: () => void): void {
        return document.removeEventListener(eventName, resumeAudioContext);
    }
    href(href?: string | undefined): string | void {
        if (href) {
            document.location.href = href;
        } else {
            return document.location.href;
        }
    }
    title(title?: string | undefined): string | void {
        if (title) {
            document.title = title;
        } else {
            return document.title;
        }
    }
    open(url?: string | URL | undefined, target?: string | undefined, features?: string | undefined): void {
        window.open(url, target, features);
    }
    setLocation(location: string) {
        //@ts-ignore
        window.location = location;
    }
    clearInterval(id: number | undefined) { return clearInterval.apply(window, [id]); };
    setInterval(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) { return setInterval.apply(window, [handler, timeout, ...args]); };
    setTimeout(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) { return setTimeout.apply(window, [handler, timeout, ...args]); };
    clearTimeout(id?: number) { return clearTimeout.apply(window, [id]); };
    createAudioContext() { return new AudioContext(); };

}
