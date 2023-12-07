import AdrAdapter from "./AdrAdapter.js";
import AdrElement, { AdrElementCollection, AdrStyleSheetList } from "./AdrElement.js";

export default class DomAdr extends AdrAdapter {
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
    styleSheets(): AdrStyleSheetList { return AdrStyleSheetList.fromDom(document.styleSheets); }
    onselectstart?: (e: Event) => void;
    onmousedown?: (e: Event) => void;
    createElement(selector: string): AdrElement {
        const adrElement = new AdrElement();
        const domElement = document.createElement(selector);
        adrElement.setDomElement(domElement);
        return adrElement;
    }
    getElementById(selector: string): AdrElement | null {
        return this.getAdrManager().getRoot().getElementById(selector) as AdrElement;
    }
    getElementsByClassName(selector: string): AdrElementCollection {
        throw new Error("to be contined.")
        return document.getElementsByClassName(selector);
    }
    getElementsByTagName(selector: string): AdrElementCollection {
        throw new Error("to be contined.")
        return document.getElementsByTagName(selector);
    }
    addEventListener(eventName: string, resumeAudioContext: () => void): void {
        throw new Error("to be contined.")
        return document.addEventListener(eventName, resumeAudioContext);
    }
    removeEventListener(eventName: string, resumeAudioContext: () => void): void {
        throw new Error("to be contined.")
        return document.removeEventListener(eventName, resumeAudioContext);
    }
    href(href?: string | undefined): string | void {
        throw new Error("to be contined.")
        if (href) {
            document.location.href = href;
        } else {
            return document.location.href;
        }
    }
    title(title?: string | undefined): string | void {
        throw new Error("to be contined.")
        if (title) {
            document.title = title;
        } else {
            return document.title;
        }
    }
    open(url?: string | URL | undefined, target?: string | undefined, features?: string | undefined): void {
        throw new Error("to be contined.")
        window.open(url, target, features);
    }
    setLocation(location: string) {
        throw new Error("to be contined.")
        //@ts-ignore
        window.location = location;
    }
    clearInterval(id: number | undefined) {
        throw new Error("to be contined.")
        return clearInterval.apply(window, [id]);
    };
    setInterval(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
        throw new Error("to be contined.")
        return setInterval.apply(window, [handler, timeout, ...args]);
    };
    setTimeout(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
        throw new Error("to be contined.")
        return setTimeout.apply(window, [handler, timeout, ...args]);
    };
    clearTimeout(id?: number) {
        throw new Error("to be contined.")
        return clearTimeout.apply(window, [id]);
    };
    createAudioContext() {
        throw new Error("to be contined.")
        return new AudioContext();
    };

}
