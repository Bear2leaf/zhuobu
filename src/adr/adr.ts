import Query from "./query.js";
import Events from "./events.js";
import { Executioner } from "./events/executioner.js";
import StateManager from "./state_manager.js";
const adr: {
    adapter: {
        localStorage?: LocalStorage;
        body?: Element;
        head?: Element;
        createElement?(selector: string): Element;
        getElementById?(selector: string): Element | null;
        getElementsByClassName?(selector: string): HTMLCollection;
        getElementsByTagName?(selector: string): HTMLCollection;
        addEventListener?(eventName: string, resumeAudioContext: () => void): void;
        removeEventListener?(eventName: string, resumeAudioContext: () => void): void;
        styleSheets?: StyleSheetList;
        onselectstart?: (e: Event) => void;
        onmousedown?: (e: Event) => void;
        href?(href?: string): void | string;
        title?(title?: string): void | string;
        open?(url?: string | URL, target?: string, features?: string): void;
        setLocation?: (location: string) => void;
        clearInterval?: typeof clearInterval;
        setInterval?: typeof setInterval;
        setTimeout?: typeof setTimeout;
        clearTimeout?: typeof clearTimeout;
        createAudioContext?: () => AudioContext;
    };
    localStorage(): LocalStorage;
    body(): Element;
    head(): Element;
    createElement(selector: string): Element;
    getElementById(selector: string): Element | null;
    getElementsByClassName(selector: string): HTMLCollection;
    getElementsByTagName(selector: string): HTMLCollection;
    addEventListener(eventName: string, resumeAudioContext: () => void): void;
    removeEventListener(eventName: string, resumeAudioContext: () => void): void;
    styleSheets(): StyleSheetList;
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
    createAudioContext: () => AudioContext;
    $: (selector: string | Element, context?: Query | string) => Query;
} = {
    adapter: {
    },
    Events: Events,
    StateManager: StateManager,
    Enemies: { Executioner },
    localStorage: () => adr.adapter.localStorage!,
    head: () => adr.adapter.head!,
    body: () => adr.adapter.body!,
    createElement: (selector: string) => adr.adapter.createElement!(selector),
    getElementById: (selector: string) => adr.adapter.getElementById!(selector),
    getElementsByClassName: (selector: string) => adr.adapter.getElementsByClassName!(selector),
    getElementsByTagName: (selector: string) => adr.adapter.getElementsByTagName!(selector),
    addEventListener: (eventName: string, resumeAudioContext: () => void) => adr.adapter.addEventListener!(eventName, resumeAudioContext),
    removeEventListener: (eventName: string, resumeAudioContext: () => void) => adr.adapter.removeEventListener!(eventName, resumeAudioContext),
    styleSheets: () => adr.adapter.styleSheets!,
    title: (title?: string) => adr.adapter.title!(title),
    href: (href?: string): void | string => adr.adapter.href!(href),
    open: (url?: string | URL, target?: string, features?: string) => adr.adapter.open!(url, target, features),
    setLocation: (location: string) => adr.adapter.setLocation!(location),
    clearTimeout: (id?: number) => adr.adapter.clearTimeout!(id),
    clearInterval: (id?: number) => adr.adapter.clearInterval!(id),
    setTimeout: (handler: TimerHandler, timeout?: number | undefined, ...args: any[]) => adr.adapter.setTimeout!(handler, timeout, ...args),
    setInterval: (handler: TimerHandler, timeout?: number | undefined, ...args: any[]) => adr.adapter.setInterval!(handler, timeout, ...args),
    createAudioContext: () => adr.adapter.createAudioContext!(),
    $: (selector: string | Element, context?: Query | string) => context === undefined ? new Query(selector) : new Query(selector, context)
};

export default adr;