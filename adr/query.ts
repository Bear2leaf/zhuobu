import AdrElement from "./adapter/AdrElement";
import AdrElementCollection from "./adapter/AdrElementCollection";
import AdrRootElement from "./adapter/AdrRootElement";
import AdrStyleSheetList from "./adapter/AdrStyleSheetList";
import Engine from "./engine";
import { Good, Craftable, Offset } from "./types";

const dataCache = new WeakMap<AdrElement, Record<string, any>>();

export default class Query {
	static State: Record<string, any>;
	static good: Good;
	static craftable: Craftable;
	static $(selector: string | AdrElement, context?: Query | string) {
		return context === undefined ? new Query(selector) : new Query(selector, context);
	}
	static clearInterval(id: number | undefined) {
		return clearInterval(id);
	};
	static setInterval(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
		return setInterval(handler, timeout, ...args);
	};
	static setTimeout(handler: TimerHandler, timeout?: number | undefined, ...args: any[]) {
		return setTimeout(handler, timeout, ...args);
	};
	static clearTimeout(id?: number) {
		return clearTimeout(id);
	};

	static addEventListener(eventName: string, resumeAudioContext: () => void): void {
		return Query.root.addEventListener(eventName, resumeAudioContext, { once: false });
	}
	static removeEventListener(eventName: string, resumeAudioContext: () => void): void {
		return Query.root.removeEventListener(eventName, resumeAudioContext);
	}
	static styleSheets(): AdrStyleSheetList { return new AdrStyleSheetList; }
	static onselectstart?: (e: Event) => void;
	static onmousedown?: (e: Event) => void;

	static createAudioContext(): AudioContext {
		throw new Error("xxx")
	};


	static reload() {

	}
	static search(): string {
		return "";
	}
	static href(href?: string | undefined): string | void {
	}
	static title(title?: string | undefined): string | void {
	}
	static open(url?: string | URL | undefined, target?: string | undefined, features?: string | undefined): void {
	}
	static setLocation(location: string) {
	}
	static localStorage() {
		return typeof localStorage === 'undefined' ? { clear: () => { }, gameState: "", lang: "" } : localStorage;
	}
	static init() {
		const root = Query.root;
		const bodyElement = new AdrElement();
		Query.$(root).append(Query.$(bodyElement))
		const headElement = new AdrElement();
		Query.$(root).append(Query.$(headElement))
		Engine.createDefaultElements();
		Engine.init({
			doubleTime: true
		});
	}
	private static readonly root = new AdrRootElement();
	el: AdrElement | null = null;
	get found() {
		return this.el ? 1 : 0;
	}
	get tagName() {
		return this.get().tagName;
	}

	constructor(selector: string | AdrElement, context?: Query | string) {
		if (arguments.length === 1 && typeof selector === 'string') {
			if (selector === 'body') {
				this.el = this.body();
				return;
			} else if (selector === 'head') {
				this.el = this.head();
				return;
			} else if (/^<([a-z\d]+)>$/.test(selector)) {
				const parsed = /^<([a-z\d]+)>$/.exec(selector);
				// Single tag
				if (parsed) {
					this.el = this.createElement(parsed[1]);
					return;
				}
			} else if (/^#[A-Za-z-\d_]+$/.test(selector)) {
				this.el = this.getElementById(selector.slice(1));
				return;
			} else if (/^.[A-Za-z-\d_]+$/.test(selector)) {
				const els = this.getElementsByClassName(selector.slice(1));
				if (els.length === 1) {
					this.el = els.item(0);
					return;
				}
			} else if (/^[a-z\d]+$/.test(selector)) {
				const els = this.getElementsByTagName(selector);
				if (els.length === 1) {
					this.el = els.item(0);
					return;
				}
			}
		} else if (arguments.length === 1 && selector instanceof AdrElement) {
			this.el = selector;
			return;
		} else if (arguments.length === 2 && context instanceof Query && typeof selector === 'string') {
			if (selector.startsWith('.')) {
				this.el = context.deepFindByClass(selector.slice(1))?.get() || null;
				return;
			} else if (selector.startsWith('#')) {
				this.el = context.deepFindById(selector.slice(1))?.get() || null;
				return;
			} else if (/^[a-z\d]+$/.test(selector)) {
				this.el = context.deepFindByTag(selector)?.get() || null;
				return;
			}
		}
		console.log(...arguments)
		throw new Error('Invalid arguments');
	}

	body(): AdrElement {
		return Query.root.getBody();
	}
	head(): AdrElement {
		return Query.root.getHead();
	}
	createElement(selector: string): AdrElement {
		const adrElement = new AdrElement();
		adrElement.tagName = selector;
		return adrElement;
	}
	getElementById(selector: string): AdrElement | null {
		return Query.root.getElementById(selector) as AdrElement;
	}
	getElementsByClassName(selector: string): AdrElementCollection {
		return Query.root.getElementsByClassName(selector);
	}
	getElementsByTagName(selector: string): AdrElementCollection {
		return Query.root.getElementsByTagName(selector);
	}
	deepFindByTag(tagName: string): Query | null {
		if (this.get().tagName === tagName.toUpperCase()) {
			return this;
		} else {
			for (const v of this.children()) {
				const found = v.deepFindByTag(tagName);
				if (found) {
					return found;
				}
			}
		}
		return null;
	}

	deepFindByClass(className: string): Query | null {
		if (this.hasClass(className)) {
			return this;
		} else {
			for (const v of this.children()) {
				const found = v.deepFindByClass(className);
				if (found) {
					return found;
				}
			}
		}
		return null;
	}

	deepFindById(id: string): Query | null {
		if (this.attr('id') === id) {
			return this;
		} else {
			for (const v of this.children()) {
				const found = v.deepFindById(id);
				if (found) {
					return found;
				}
			}
		}
		return null;
	}

	get<T extends AdrElement>(): T {
		if (!this.el) {
			throw new Error('Invalid arguments');
		}
		return this.el as T;
	};
	children(): Query[] {
		return [...this.get().children].map((v) => {
			return new Query(v);
		});
	};

	addClass(value: string): Query {
		if (this.found) {
			value.split(' ').forEach((v) => {
				this.get().addClass(v);
			});
		}
		return this;
	};

	removeClass(value: string) {
		if (this.found) {
			this.get().removeClass(value);
		}
		return this;
	};

	hasClass(value: string) {
		return this.get().hasClass(value);
	};

	find(selector: string) {
		return new Query(selector, this);
	};



	attr(options: string): string;
	attr(options: 'readonly', value: boolean): Query;
	attr(options: string, value: string): Query;
	attr(options: Record<string, string>): Query;
	attr(options: Record<string, string> | string, value?: string | boolean): Query | string | null {
		if (typeof options === "string" && !value) {
			return this.get().getAttribute(options);
		} else if (typeof options === "object" && !value) {
			for (const key in options) {
				this.get().setAttribute(key, options[key]);
			}
		} else if (typeof options === "string" && value) {
			this.get().setAttribute(options, value.toString());
		} else {
			throw new Error('Invalid arguments');
		}
		return this;
	}

	offset(): Offset {

		const box = this.get().getBoundingClientRect();
		return {
			top: box.top + this.body().scrollTop - (this.body().clientTop || 0),
			left: box.left + this.body().scrollLeft - (this.body().clientLeft || 0)
		};
	}

	parent() {
		return this.get().parentNode || null;
	}
	index(elem: Query) {
		const collection = this.get().children;
		if (!collection) {
			throw new Error('Invalid arguments');
		}
		return [...collection].indexOf(elem.get());
	}



	empty() {
		this.children().forEach((v) => v.remove());
		return this;
	}

	remove() {
		const parent = this.parent();
		if (parent) {
			const index = parent.children.indexOf(this.get());
			if (index === -1) {
				throw new Error("item not found");
			}
			const removeItems = parent.children.splice(index, 1);

			removeItems.forEach(item => item.remove());
		} else {
			this.get().remove();
		}
		return this;
	}

	removeParent() {
		const parent = this.parent();
		if (parent) {
			parent.remove();
		}
		return this;
	}

	val(): string;
	val(value: string): Query;
	val(value?: string): string | Query {
		if (value === undefined) {
			return this.get().value;
		} else {
			this.get().value = value;
			return this;
		}
	}



	animate(prop: Record<string, any>, speed: number, callback?: Function) {
		if (callback) {
			Query.setTimeout(() => {
				callback.call(this);
			}, speed);
		}
		if (prop.opacity !== undefined) {
			return this.css('opacity', prop.opacity);
		} else if (prop.left !== undefined) {
			return this.css('left', prop.left);
		} else if (prop.right !== undefined) {
			return this.css('right', prop.right);
		} else if (prop.top !== undefined) {
			return this.css('top', prop.top);
		} else if (prop.width !== undefined) {
			return this.css('width', prop.width);
		} else {
			throw new Error('Invalid arguments');
		}
	}
	css(name: string): string;
	css(name: string, value: string | number): Query;
	css(name: Record<string, string>): Query;
	css(name: string | Record<string, string>, value?: string | number): string | Query {
		const el = this.get() as AdrElement;
		if (typeof name === 'string') {
			if (value === undefined) {
				return el.getStyle(name);
			} else {
				el.setStyle(name, value.toString());
				return this;
			}
		} else if (typeof name === 'object') {
			for (const key in name) {
				el.setStyle(key, name[key]);
			}
			return this;
		} else {
			console.log(...arguments)
			throw new Error('Invalid arguments');
		}
	}
	show() {
		this.css('display', 'block');
	}
	hide() {
		this.css('display', 'none');
	}

	data(name: 'num' | 'hp' | 'maxHp' | 'cooldown' | 'countdown' | 'numLeft' | 'speed'): number;
	data(name: 'boosted'): Function;
	data(name: 'thing' | 'item'): string;
	data(name: 'leaveBtn' | 'canTakeEverything'): Query;
	data(name: 'leaveBtn', data: Query): Query;
	data(name: 'stunned', data: boolean): Query;
	data(name: 'canLeave', data: boolean | Query): Query;
	data(name: 'disabled', data: boolean | undefined): Query;
	data(name: string): boolean | string | number | Function;
	data(name: string, data: string | number | boolean): Query;
	data(name: string, callback: Function): Query;
	data(name?: string, data?: boolean | string | number | Function | Query) {
		if (!dataCache.has(this.get())) {
			dataCache.set(this.get(), {});
		}
		const cache = dataCache.get(this.get()) as Record<string, any>;
		if (name === undefined) {
			return cache;
		} else {
			if (data === undefined) {
				return cache[name];
			} else {
				cache[name] = data;
				return this;
			}
		}
	}

	removeData(name: string) {
		const cache = dataCache.get(this.get());
		if (cache === undefined || cache[name]) {
			return this;
		}
		delete cache[name];
		return this;
	}

	width(): number;
	width(value: string): Query;
	width(value: number): Query;
	width(value?: number | string): number | Query {
		if (value !== undefined) {
			return this.css('width', value);
		}
		return this.get<AdrElement>().offsetWidth;
	}
	height(): number;
	height(value: number): Query;
	height(value?: number): number | Query {
		if (value !== undefined) {
			return this.css('height', value);
		}
		return this.get<AdrElement>().offsetHeight;
	}

	eventHandler(type: string, fn?: EventListener, once?: boolean) {
		if (fn) {
			this.get().addEventListener(type, fn, {
				once
			});
		} else {
			this.get().dispatchEvent(type);
		}
		return this;
	}
	swipeleft(fn?: EventListener, once?: boolean) { return this.eventHandler('swipeleft', fn, once) }
	swiperight(fn?: EventListener, once?: boolean) { return this.eventHandler('swiperight', fn, once) }
	swipeup(fn?: EventListener, once?: boolean) { return this.eventHandler('swipeup', fn, once) }
	swipedown(fn?: EventListener, once?: boolean) { return this.eventHandler('swipedown', fn, once) }
	focus(fn?: EventListener, once?: boolean) { return this.eventHandler('focus', fn, once) }
	click(fn?: EventListener, once?: boolean) { return this.eventHandler('click', fn, once) }
	mouseenter(fn?: EventListener, once?: boolean) { return this.eventHandler('mouseenter', fn, once) }
	mouseleave(fn?: EventListener, once?: boolean) { return this.eventHandler('mouseleave', fn, once) }
	select(fn?: EventListener, once?: boolean) { return this.eventHandler('select', fn, once) }
	keydown(fn?: EventListener, once?: boolean) { return this.eventHandler('keydown', fn, once) }
	keyup(fn?: EventListener, once?: boolean) { return this.eventHandler('keyup', fn, once) }

	text(name: string): Query;
	text(name: number): Query;
	text(): string;
	text(value?: string | number): Query | string {
		if (value === undefined) {
			if (arguments.length === 0) {
				return this.get<AdrElement>().innerText;
			} else {
				this.get<AdrElement>().innerText = "";
				return this;
			}
		} else {
			this.get<AdrElement>().innerText = value.toString();
			return this;
		}
	}
	html(value: string) {
		this.get().innerHTML = value;
		return this;
	}

	append(elem: Query) {
		this.get().appendChild(elem.get());
		return this;
	}

	appendHeadLink(elem: string) {
		this.get().innerHTML += elem;
		return this;
	}

	prepend(elem: Query) {
		this.get().insertBefore(elem.get(), this.get().firstChild);
		return this;
	}

	before(elem: Query) {
		const parent = this.parent();
		if (!parent) {
			throw new Error('Invalid arguments');
		}
		parent.insertBefore(elem.get(), this.get());
		return this;
	}

	after(elem: Query) {
		const parent = this.parent();
		if (!parent) {
			throw new Error('Invalid arguments');
		}
		parent.insertBefore(elem.get(), this.get().nextSibling);
		return this;
	}


	appendTo(elem: Query) {
		elem.append(this);
		return this;
	}
	prependTo(elem: Query) {
		elem.prepend(this);
		return this;
	}
	insertBefore(elem: Query) {
		elem.before(this);
		return this;
	}
	insertAfter(elem: Query) {
		elem.after(this);
		return this;
	}
	replaceAll(elem: Query) {
		elem.after(this);
		elem.remove();
		return this;
	}



};
