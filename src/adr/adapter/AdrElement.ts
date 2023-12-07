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
	getDomElement() {
		if (!this.domElement) {
			throw new Error("domElement not exist");
		}
		return this.domElement;
	}
	getAttribute(options: string): string | null {
		return this.attributes[options] || null;
	}
	setAttribute(key: string, value: string) {
		this.getDomElement().setAttribute(key, value);
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
		throw new Error("Method not implemented.");
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


		return this.getDomElement().addEventListener(type, wrapperFn, option);
	}
	removeEventListener(type: string, fn: EventListener) {
		this.eventLinsteners[type].splice(this.eventLinsteners[type].indexOf(fn), 1);
		this.getDomElement().removeEventListener(type, fn);
	}
	dispatchEvent(event: Event) {
		throw new Error("Method not implemented.");
	}
	appendChild(element: AdrElement) {
		this.getDomElement().appendChild(element.getDomElement())
		this.children.push(element);
	}
	insertBefore(element: AdrElement, firstChild: AdrElement) {
		this.getDomElement().insertBefore(element.getDomElement(), firstChild.getDomElement())
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