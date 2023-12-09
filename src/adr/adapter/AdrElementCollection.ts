import AdrElement from "./AdrElement.js";

export default class AdrElementCollection {
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
	push(...elements: AdrElement[]) {
		this.elements.push(...elements);
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
	pop() {
		return this.elements.pop();
	}
}
