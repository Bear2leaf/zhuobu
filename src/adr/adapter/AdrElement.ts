import Entity from "../../entity/Entity.js";
import AdrClassList from "./AdrClassList.js";
import AdrElementCollection from "./AdrElementCollection.js";
import AdrElementStyle from "./AdrElementStyle.js";

export default class AdrElement {
	private domElement?: Element;
	private entity?: Entity;
	parentNode?: AdrElement;
	offsetWidth: number = 0;
	offsetHeight: number = 0;
	scrollTop: number = 0;
	clientTop: number = 0;
	scrollLeft: number = 0;
	clientLeft: number = 0;
	innerText: string = "";
	innerHTML: string = "";
	value: string = "";
	tagName: string = "";
	onRemove?(): void;
	readonly children: AdrElementCollection = new AdrElementCollection();
	readonly classList: AdrClassList = new AdrClassList();
	readonly style: AdrElementStyle = new AdrElementStyle();
	readonly attributes: Record<string, string> = {};
	readonly eventLinsteners: Record<string, EventListener[]> = {};
	setDomElement(domElement: Element) {
		this.domElement = domElement;
	}
	setEntity(entity: Entity) {
		this.entity = entity;
	}
	getEntity() {
		if (!this.entity) {
			throw new Error("entity not exist");
		}
		return this.entity;
	}
	getText() {
		return this.innerText;
	}
	setText(text: string) {
		this.innerText = text;
		if (this.domElement) {
			this.domElement.textContent = text;
		}
	}
	getAttribute(options: string): string | null {
		return this.attributes[options] || null;
	}
	setAttribute(key: string, value: string) {
		this.domElement?.setAttribute(key, value);
		this.attributes[key] = value;
	}
	getBoundingClientRect(): {
		top: number;
		left: number;
	} {
		return {
			top: 0,
			left: 0
		};
	}
	remove() {
		if (this.onRemove === undefined) {
			throw new Error("onRemove not exist");
		}
		this.onRemove();
		this.domElement?.remove();
	}
	addEventListener(type: string, fn: EventListener, option: { once: boolean | undefined; }) {
		if (!this.eventLinsteners[type]) {
			this.eventLinsteners[type] = []
		}
		const wrapperFn = (evt: Event) => {
			if (option.once) {
				this.eventLinsteners[type].splice(this.eventLinsteners[type].indexOf(fn), 1);
			}
			fn(evt)
		}
		this.eventLinsteners[type].push(wrapperFn);


		this.domElement?.addEventListener(type, wrapperFn, option);
	}
	removeEventListener(type: string, fn: EventListener) {
		this.eventLinsteners[type].splice(this.eventLinsteners[type].indexOf(fn), 1);
		this.domElement?.removeEventListener(type, fn);
	}
	dispatchEvent(type: string) {
		this.eventLinsteners[type]?.forEach(fn => {
			fn(new Event(type));
		});
		const event = new Event(type);
		this.domElement?.dispatchEvent(event);
	}
	appendChild(element: AdrElement) {
		if (element.domElement) {
			this.domElement?.appendChild(element.domElement)
		}
		this.children.push(element);
	}
	insertBefore(element: AdrElement, firstChild: AdrElement) {
		if (element.domElement && firstChild.domElement) {
			this.domElement?.insertBefore(element.domElement, firstChild.domElement)
		}
		this.children.splice(this.children.indexOf(firstChild), 0, element);
	}
	get firstChild() {
		return this.children.item(0);
	}
	get nextSibling() {
		if (!this.parentNode) {
			throw new Error("parentNode not exist");
		}
		const index = this.parentNode.children.indexOf(this);
		return this.parentNode.children.item(index + 1);
	}
}