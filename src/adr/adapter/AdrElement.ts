import Entity from "../../entity/Entity.js";
import AdrElementCollection from "./AdrElementCollection.js";

export default class AdrElement {
	private domElement?: Element;
	private entity?: Entity;
	parentNode?: AdrElement;
	get offsetWidth(): number {
		return (this.domElement as HTMLElement)?.offsetWidth || 0;
	}
	get offsetHeight(): number {
		return (this.domElement as HTMLElement)?.offsetHeight || 0;
	}
	get scrollTop(): number {
		return this.domElement?.scrollTop || 0;
	}
	get clientTop(): number {
		return this.domElement?.clientTop || 0;
	}
	get scrollLeft(): number {
		return this.domElement?.scrollLeft || 0;
	}
	get clientLeft(): number {
		return this.domElement?.clientLeft || 0;
	}
	get innerText(): string {
		return (this.domElement as HTMLElement)?.innerText || "";
	}
	set innerText(value: string) {
		if (this.domElement) {
			(this.domElement as HTMLElement).innerText = value;
		}
	}
	get innerHTML(): string {
		return (this.domElement as HTMLElement)?.innerHTML || "";
	}
	set innerHTML(value: string) {
		if (this.domElement) {
			this.domElement.innerHTML = value;

		}
	}
	get tagName(): string {
		return (this.domElement as HTMLElement)?.tagName || "";
	};
	set tagName(value: string) {

	}
	get value(): string {
		return (this.domElement as HTMLTextAreaElement)?.value || "";
	}
	set value(value: string) {
		if (this.domElement) {
			(this.domElement as HTMLTextAreaElement).value = value;
		}
	}
	onRemove?(): void;
	readonly children: AdrElementCollection = new AdrElementCollection();
	private readonly classSet: Set<string> = new Set();
	private readonly style: Record<string, string> = {};
	private readonly attributes: Record<string, string> = {};
	private readonly eventLinsteners: Record<string, EventListener[]> = {};
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
	getAttribute(options: string): string | null {
		return this.attributes[options] || null;
	}
	setAttribute(key: string, value: string) {
		this.domElement?.setAttribute(key, value);
		this.attributes[key] = value;
	}
	getStyle(options: string): string {
		return (this.domElement as HTMLElement)?.style.getPropertyValue(options) || this.style[options] || "";
	}
	setStyle(key: string, value: string) {
		(this.domElement as HTMLElement)?.style.setProperty(key, value);
		this.style[key] = value;
	}
	addClass(className: string) {
		this.classSet.add(className);
		this.domElement?.classList.add(className);
	}
	removeClass(className: string) {
		this.classSet.delete(className);
		this.domElement?.classList.remove(className);
	}
	hasClass(className: string) {
		return this.classSet.has(className);
	}
	getBoundingClientRect(): {
		top: number;
		left: number;
	} {
		return (this.domElement as HTMLElement)?.getBoundingClientRect() || {
			top: 0,
			left: 0
		};
	}
	remove() {
		if (this.onRemove === undefined) {
			throw new Error("onRemove not exist");
		}
		this.onRemove();
		this.parentNode?.children.splice(this.parentNode?.children.indexOf(this), 1);
		this.domElement?.remove();
		for(const child of this.children) {
			child.remove();
		}
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
		element.parentNode = this;
		this.children.push(element);
	}
	insertBefore(element: AdrElement, firstChild: AdrElement | null) {
		if (element.domElement) {
			this.domElement?.insertBefore(element.domElement, firstChild?.domElement || null)
		}
		if (firstChild === null) {
			this.children.push(element);
		} else {
			this.children.splice(this.children.indexOf(firstChild), 0, element);
		}
		element.parentNode = this;
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