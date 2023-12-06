import AdrText from "../../drawobject/AdrText.js";
import AdrTextObject from "../../entity/AdrTextObject.js";
import Node from "../../transform/Node.js";
import TRS from "../../transform/TRS.js";
import AdrAdapter from "./AdrAdapter.js";
import AdrElement from "./AdrElement.js";

export default class EntityAdr extends AdrAdapter {
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
        const entity = new AdrTextObject();
        const scene = this.getAdrManager().getSceneManager().first();
        scene.addEntity(entity);
        scene.registerComponents(entity);
        entity.get(TRS).getPosition().x = Math.random() * 500 - 250;
        entity.get(TRS).getPosition().y = Math.random() * 500 - 250;
        entity.get(Node).setParent(this.getAdrManager().getRoot().get(Node));
        scene.initEntity(entity);
        entity.get(AdrText).updateChars(selector);
        const adrElement = new AdrElement();
        const domElement = document.createElement(selector);
        adrElement.setDomElement(domElement);
        adrElement.setEntity(entity);
        this.getAdrManager().addElement(adrElement)
        return domElement;
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
