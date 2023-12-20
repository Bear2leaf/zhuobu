import Entity from "../../entity/Entity.js";
import AdrElementIdChange from "../../subject/AdrElementIdChange.js";
import AdrElementParentChange from "../../subject/AdrElementParentChange.js";
import AdrElementRemove from "../../subject/AdrElementRemove.js";
import AdrElementSubject from "../../subject/AdrElementSubject.js";
import Node from "../../transform/Node.js";
import AdrElementCollection from "./AdrElementCollection.js";

export default class AdrElement {
	private domElement?: Element = {
		setAttribute: () => { },
		//@ts-ignore
		appendChild: () => { },
		addEventListener: () => { },
		//@ts-ignore
		insertBefore: () => { },
		remove: () => { },
		//@ts-ignore
		classList: {
			add: () => { },
			remove: () => { }
		},
		style: {
			getPropertyValue: () => { },
			setProperty: () => { },
		}
	};
	private entity?: Entity;
	private readonly subjects: AdrElementSubject[] = [];
	private readonly classSet: Set<string> = new Set();
	private readonly style: Record<string, string> = {};
	private readonly attributes: Record<string, string> = {};
	private readonly eventLinsteners: Record<string, Function[]> = {};
	readonly children: AdrElementCollection = new AdrElementCollection();
	parentNode?: AdrElement;
	setSubjects(remove: AdrElementRemove, idChange: AdrElementIdChange, parentChange: AdrElementParentChange) {
		this.subjects.push(remove, idChange, parentChange);
		if (this.subjects.length !== 3) {
			throw new Error("subjects are not correctly set");
		}
	}
	getSubject<T extends AdrElementSubject>(subjectCtor: new () => T): T {
		const subject = this.subjects.find(subject => subject instanceof subjectCtor);
		if (!subject) {
			throw new Error("subject is not set");
		}
		return subject as T;
	}

	get offsetWidth(): number {
		return this.getDomElement().offsetWidth || 0;
	}
	get offsetHeight(): number {
		return this.getDomElement().offsetHeight || 0;
	}
	get scrollTop(): number {
		return this.getDomElement().scrollTop || 0;
	}
	get clientTop(): number {
		return this.getDomElement().clientTop || 0;
	}
	get scrollLeft(): number {
		return this.getDomElement().scrollLeft || 0;
	}
	get clientLeft(): number {
		return this.getDomElement().clientLeft || 0;
	}
	get innerText(): string {
		return this.getDomElement().innerText || "";
	}
	set innerText(value: string) {
		(this.getDomElement() as HTMLElement).innerText = value;

	}
	get innerHTML(): string {
		return this.getDomElement().innerHTML || "";
	}
	set innerHTML(value: string) {
		this.getDomElement().innerHTML = value;
	}
	get tagName(): string {
		return this.getDomElement().tagName || "";
	};
	set tagName(value: string) {

	}
	get value(): string {
		return (this.getDomElement() as HTMLTextAreaElement)?.value || "";
	}
	set value(value: string) {
		(this.getDomElement() as HTMLTextAreaElement).value = value;
	}
	setDomElement(domElement: Element) {
		this.domElement = domElement;
	}
	getDomElement(): HTMLElement {
		if (!this.domElement) {
			throw new Error("domElement not exist")
		}
		return this.domElement as HTMLElement;
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

	getDescendants() {
		const descendants: AdrElement[] = [];
		this.traverseChildren(child => {
			descendants.push(child);
		});
		return descendants;
	}
	getAttribute(options: string): string | null {
		return this.attributes[options] || null;
	}
	setAttribute(key: string, value: string) {
		this.getDomElement().setAttribute(key, value);
		this.attributes[key] = value;
		if (key === 'id') {
			this.getSubject(AdrElementIdChange).setElement(this);
			this.getSubject(AdrElementIdChange).notify();
		}
	}
	getStyle(options: string): string {
		return this.getDomElement().style.getPropertyValue(options) || this.style[options] || "";
	}
	setStyle(key: string, value: string) {
		(this.getDomElement() as HTMLElement)?.style.setProperty(key, value);
		this.style[key] = value;
	}
	addClass(className: string) {
		this.classSet.add(className);
		this.getDomElement().classList.add(className);
	}
	removeClass(className: string) {
		this.classSet.delete(className);
		this.getDomElement().classList.remove(className);
	}
	hasClass(className: string) {
		return this.classSet.has(className);
	}

	traverseChildren(callback: (child: AdrElement) => void) {
		for (const child of this.children) {
			callback(child);
			child.traverseChildren(callback);
		}

	}
	isDescendantOfById(id: string) {
		let parent = this.parentNode;
		while (parent) {
			if (parent.getAttribute("id") === id) {
				return true;
			}
			parent = parent.parentNode;
		}
		return false;
	}
	getBoundingClientRect(): {
		top: number;
		left: number;
	} {
		return this.getDomElement().getBoundingClientRect() || {
			top: 0,
			left: 0
		};
	}
	remove() {
		this.getSubject(AdrElementRemove).setElement(this);
		this.getSubject(AdrElementRemove).notify();
	}
	addEventListener(type: string, fn: EventListener, option: { once: boolean | undefined; }) {
		if (!this.eventLinsteners[type]) {
			this.eventLinsteners[type] = []
		}
		const wrapperFn = (evt: Event) => {
			if (option.once) {
				const n: number = this.eventLinsteners[type].indexOf(fn);
				if (n !== -1) {
					this.eventLinsteners[type].splice(this.eventLinsteners[type].indexOf(fn), 1);
				}
			}
			fn(evt)
		}
		this.eventLinsteners[type].push(wrapperFn);


		this.getDomElement().addEventListener(type, wrapperFn, option);
	}
	removeEventListener(type: string, fn: EventListener) {
		const n: number = this.eventLinsteners[type].indexOf(fn);
		if (n !== -1) {
			this.eventLinsteners[type].splice(this.eventLinsteners[type].indexOf(fn), 1);
		}
		this.getDomElement().removeEventListener(type, fn);
	}
	dispatchEvent(type: string, listenerOnly: boolean = false) {
		this.eventLinsteners[type]?.forEach(fn => {
			fn();
		});
	}
	appendChild(element: AdrElement) {
		this.getDomElement().appendChild(element.getDomElement())

		this.children.push(element);
		element.parentNode = this;
		element.getEntity().get(Node).setParent(this.getEntity().get(Node));
		element.getSubject(AdrElementParentChange).setElement(element);
		element.getSubject(AdrElementParentChange).notify();
	}
	insertBefore(element: AdrElement, firstChild: AdrElement | null) {
		this.getDomElement().insertBefore(element.getDomElement(), firstChild?.getDomElement() || null)

		if (firstChild === null) {
			this.children.push(element);
		} else {
			this.children.splice(this.children.indexOf(firstChild), 0, element);
		}
		element.parentNode = this;
		element.getEntity().get(Node).setParent(this.getEntity().get(Node));
		element.getSubject(AdrElementParentChange).setElement(element);
		element.getSubject(AdrElementParentChange).notify();
	}
	get firstChild(): AdrElement | null {
		return this.children.item(0) || null;
	}
	get nextSibling(): AdrElement | null {
		if (!this.parentNode) {
			throw new Error("parentNode not exist");
		}
		const index = this.parentNode.children.indexOf(this);
		return this.parentNode.children.item(index + 1) || null;
	}
}