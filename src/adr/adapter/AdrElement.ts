import Entity from "../../entity/Entity.js";

export class AdrElementCollection {
	[Symbol.iterator]() {
		return this.elements[Symbol.iterator]();
	}
	private readonly elements: AdrElement[] = [];
	get length() {
		return this.elements.length;
	}
	item(index: number) {
		return this.elements[index];
	}
	push(element: AdrElement) {
		this.elements.push(element);
	}
	splice(index: number, deleteCount: number, ...elements: AdrElement[]) {
		return this.elements.splice(index, deleteCount, ...elements);
	}
	indexOf(element: AdrElement) {
		return this.elements.indexOf(element);
	}
	map<T>(fn: (element: AdrElement) => T) {
		return this.elements.map(fn);
	}
}
export class AdrElementStyle {
	properties: Record<string, string> = {};
	getPropertyValue(key: string) {
		return this.properties[key];
	}
	setProperty(key: string, value: string) {
		this.properties[key] = value;
	}
}
export class AdrStyleSheetList {
	private readonly styleSheets: { title: string | null }[] = [];
	static fromDom(domStyleSheetList: StyleSheetList) {
		const styleSheetList = new AdrStyleSheetList();
		for (let i = 0; i < domStyleSheetList.length; i++) {
			const domStyleSheet = domStyleSheetList[i];
			styleSheetList.styleSheets.push({
				title: domStyleSheet.title
			});
		}
		return styleSheetList;
	}

}

export class AdrClassList {
	private readonly classList: string[] = [];
	add(className: string) {
		this.classList.push(className);
	}
	remove(className: string) {
		const index = this.classList.indexOf(className);
		if (index !== -1) {
			this.classList.splice(index, 1);
		}
	}
	contains(className: string) {
		return this.classList.indexOf(className) !== -1;
	}
}


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
	readonly tagName: string = "";
	readonly children: AdrElementCollection = new AdrElementCollection();
	readonly classList: AdrClassList = new AdrClassList();
	readonly style: AdrElementStyle = new AdrElementStyle();
	readonly attributes: Record<string, string> = {};
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
		return this.getDomElement().getAttribute(options)
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
		return this.getDomElement().getBoundingClientRect();
		return {
			top: 0,
			left: 0
		};
	}
	remove() {
		throw new Error("Method not implemented.");
	}
	addEventListener(type: string, fn: EventListener, option: { once: boolean | undefined; }) {
		throw new Error("Method not implemented.");
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