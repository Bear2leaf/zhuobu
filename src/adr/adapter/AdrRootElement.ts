import AdrText from "../../drawobject/AdrText.js";
import AdrElement from "./AdrElement.js";
import AdrElementCollection from "./AdrElementCollection.js";

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
    getElementsByClassName(className: string) {
        return this.deepFilterByClassName(this.children, className);
    }
    getElementsByTagName(className: string) {
        return this.deepFilterByTagName(this.children, className);
    }
    getElementByPixel(pixel: [number, number, number]) {
        return this.deepFindByPixel(this.children, pixel);
    }
    deepFilterByTagName(collection: AdrElementCollection, tagName: string): AdrElementCollection {
        const list: AdrElementCollection = new AdrElementCollection();
        for (let i = 0; i < collection.length; i++) {
            const element = collection.item(i);
            if (element.tagName.toUpperCase() === tagName.toUpperCase()) {
                list.push(element);
            }
            const childList = this.deepFilterByTagName(element.children, tagName);
            list.push(...childList);
        }
        return list;
    }
    deepFilterByClassName(collection: AdrElementCollection, className: string): AdrElementCollection {
        const list: AdrElementCollection = new AdrElementCollection();
        for (let i = 0; i < collection.length; i++) {
            const element = collection.item(i);
            if (element.hasClass(className)) {
                list.push(element);
            }
            const childList = this.deepFilterByClassName(element.children, className);
            list.push(...childList);
        }
        return list;
    }

    deepFindById(collection: AdrElementCollection, id: string): AdrElement | undefined {
        if (collection.length) {
            for (let i = 0; i < collection.length; i++) {
                const element = collection.item(i);
                if (element.getAttribute('id') === id) {
                    return element;
                }
                const child = this.deepFindById(element.children, id);
                if (child) {
                    return child;
                }
            }
        }
    }
    deepFindByPixel(collection: AdrElementCollection, pixel: [number, number, number]): AdrElement | undefined {
        if (collection.length) {
            for (let i = 0; i < collection.length; i++) {
                const element = collection.item(i);
                const pickColor = element.getEntity().get(AdrText).getPickColor();
                if (pickColor.x === pixel[0] && pickColor.y === pixel[1] && pickColor.z === pixel[2]) {
                    return element;
                }
                const child = this.deepFindByPixel(element.children, pixel);
                if (child) {
                    return child;
                }
            }
        }
    }
}