import Query from "./query.js";
import Events from "./events.js";
import { Executioner } from "./events/executioner.js";
import StateManager from "./state_manager.js";



export const adr: {
	body: Element;
	head: Element;
	createElement(selector: string): Element;
	getElementById(selector: string): Element | null;
	getElementsByClassName(selector: string): HTMLCollection;
	getElementsByTagName(selector: string): HTMLCollection;
    addEventListener(eventName: string, resumeAudioContext: () => void, other: boolean): void;
    removeEventListener(eventName: string, resumeAudioContext: () => void): void;
    styleSheets: StyleSheetList;
    onselectstart?: (e: Event) => void;
    onmousedown?: (e: Event) => void;
    State?: any;
    StateManager?: StateManager;
    Events?: Events;
    Enemies?: Enemies;
    craftable?: Craftables;
    good?: Good;
    href(href?: string): void | string;
    title(title?: string): void | string;
    open(url?: string | URL, target?: string, features?: string): void;
    setLocation: (location: string) => void;
    clearInterval: typeof clearInterval;
    setInterval: typeof setInterval;
    setTimeout: typeof setTimeout;
    clearTimeout: typeof clearTimeout;
    AudioContext: typeof AudioContext;
    $: (selector: string | Element, context?: Query | string) => Query;
} = {
    Events: Events,
    StateManager: StateManager,
    Enemies: {
        Executioner
    },
    head: document.head,
    body: document.body,
    createElement: (selector: string) => document.createElement(selector),
    getElementById: (selector: string) => document.getElementById(selector),
    getElementsByClassName: (selector: string) => document.getElementsByClassName(selector),
    getElementsByTagName: (selector: string) => document.getElementsByTagName(selector),
    addEventListener(eventName: string, resumeAudioContext: () => void, other: boolean) {
        if (other) {
            document.addEventListener(eventName, resumeAudioContext);
        } else {
            window.addEventListener(eventName, resumeAudioContext);
        }

    },
    removeEventListener(eventName: string, resumeAudioContext: () => void) {
        window.removeEventListener(eventName, resumeAudioContext);
    },
    styleSheets: document.styleSheets,
    title(title?: string): void | string {
        if (title) {
            document.title = title;
        } else {
            return document.title;
        }
    },
    href(href?: string): void | string {
        if (href) {
            document.location.href = href;
        } else {
            return document.location.href;
        }
    },
    open(url?: string | URL, target?: string, features?: string) {
        window.open(url, target, features);
    },
    setLocation(location: string) {
        // @ts-ignore
        window.location = location;
    },
    clearTimeout: function (id?: number) { return this.clearTimeout.apply(window, [id]) },
    setTimeout: function (handler: TimerHandler, timeout?: number | undefined, ...args: any[]) { return setTimeout.apply(window, [handler, timeout, ...args]) },
    setInterval: function (handler: TimerHandler, timeout?: number | undefined, ...args: any[]) { return setInterval.apply(window, [handler, timeout, ...args]) },
    clearInterval: function (id?: number) { return clearInterval.apply(window, [id]) },
    AudioContext,
    $: (selector: string | Element, context?: Query | string) => context === undefined ? new Query(selector) : new Query(selector, context)
};

Object.assign(window, { adr });