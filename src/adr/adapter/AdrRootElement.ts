import AdrElement, { AdrElementCollection } from "./AdrElement.js";

export default class AdrRootElement extends AdrElement {
    getBody() {
        return this.children.item(0);
    }
    getHead() {
        return this.children.item(1);
    }
    appendChild(element: AdrElement): void {
        this.children.push(element);
    }
    getElementById(id: string) {
        return this.deepFindById(this.children, id);
    }

    deepFindById(collection: AdrElementCollection, id: string): AdrElement | undefined {
        if (collection.length) {
            for (let i = 0; i < collection.length; i++) {
                const element = collection.item(i);
                if (element.getAttribute('id') === id) {
                    console.log('found', element);
                    return element;
                }
                const child = this.deepFindById(element.children, id);
                if (child) {
                    return child;
                }
            }
        }
    }
}