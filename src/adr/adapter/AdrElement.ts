import Entity from "../../entity/Entity.js";

export default class AdrElement {
	private domElement?: Element;
	private entity?: Entity;
	setDomElement(domElement: Element) {
		this.domElement = domElement;
	}
	setEntity(entity: Entity) {
		this.entity = entity;
	}
	tagName: string;
	children: AdrElement[];
	classList: string[];
	getAttribute(options: string): string | import("../query").default | null {
		throw new Error("Method not implemented.");
	}
	setAttribute(key: string, arg1: string) {
		throw new Error("Method not implemented.");
	}
	getBoundingClientRect() {
		throw new Error("Method not implemented.");
	}
	parentNode: AdrElement;
	remove() {
		throw new Error("Method not implemented.");
	}
	style: any;
	offsetWidth: number | Query;
	offsetHeight: number | Query;
	addEventListener(type: string, fn: EventListener, arg2: { once: boolean | undefined; }) {
		throw new Error("Method not implemented.");
	}
	dispatchEvent(arg0: Event) {
		throw new Error("Method not implemented.");
	}
	innerText: string | Query;
	innerHTML: string;
	appendChild(arg0: any) {
		throw new Error("Method not implemented.");
	}
	insertBefore(arg0: any, firstChild: any) {
		throw new Error("Method not implemented.");
	}
	firstChild(arg0: any, firstChild: any) {
		throw new Error("Method not implemented.");
	}
	nextSibling(arg0: any, nextSibling: any) {
		throw new Error("Method not implemented.");
	}
}