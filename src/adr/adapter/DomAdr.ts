import AdrAdapter from "./AdrAdapter.js";
import AdrStyleSheetList from "./AdrStyleSheetList.js";

export default class DomAdr extends AdrAdapter {
    styleSheets(): AdrStyleSheetList { return AdrStyleSheetList.fromDom(document.styleSheets); }
    onselectstart?: (e: Event) => void;
    onmousedown?: (e: Event) => void;
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
    clearInterval(id: number | undefined) {
        return clearInterval.apply(window, [id]);
    };
    setInterval(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
        return setInterval.apply(window, [handler, timeout, ...args]);
    };
    setTimeout(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
        return setTimeout.apply(window, [handler, timeout, ...args]);
    };
    clearTimeout(id?: number) {
        return clearTimeout.apply(window, [id]);
    };

}
