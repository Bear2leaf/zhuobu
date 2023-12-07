import AdrAdapter from "./AdrAdapter.js";
import AdrElement from "./AdrElement.js";
import AdrElementCollection from "./AdrElementCollection.js";
import AdrStyleSheetList from "./AdrStyleSheetList.js";

export default class DomAdr extends AdrAdapter {
    styleSheets(): AdrStyleSheetList { return AdrStyleSheetList.fromDom(document.styleSheets); }
    onselectstart?: (e: Event) => void;
    onmousedown?: (e: Event) => void;
    createElement(selector: string): AdrElement {
        const adrElement = new AdrElement();
        const domElement = document.createElement(selector);
        adrElement.tagName = selector;
        adrElement.setDomElement(domElement);
        return adrElement;
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

}
