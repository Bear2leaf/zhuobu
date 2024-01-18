import { WindowInfo } from "../device/Device.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";
import Layout from "./Layout.js";

export default class Hamburger extends Layout {
    private readonly paddingVertical: number = 40;
    private readonly paddingHorizntal: number = 10;
    private windowInfo?: WindowInfo;
    private top?: Node;
    private bottom?: Node;
    private content1?: Node;
    private content2?: Node;
    getPadding(): [number, number] {
        return [this.paddingVertical, this.paddingHorizntal];
    }
    setWindowInfo(windowInfo: WindowInfo) {
        this.windowInfo = windowInfo;
    }
    getWindowInfo() {
        if (!this.windowInfo) {
            throw new Error("windowInfo is not set");
        }
        return this.windowInfo;
    }
    setTop(node: Node): void {
        this.top = node;
        node.setParent(this.getEntity().get(Node));
    }
    setBottom(node: Node): void {
        this.bottom = node;
        node.setParent(this.getEntity().get(Node));
    }
    setContent1(node: Node): void {
        this.content1 = node;
        node.setParent(this.getEntity().get(Node));
    }
    setContent2(node: Node): void {
        this.content2 = node;
        node.setParent(this.getEntity().get(Node));
    }
    getTop(): Node {
        if (!this.top) {
            throw new Error("Top is not set");
        }
        return this.top;
    }
    getBottom(): Node {
        if (!this.bottom) {
            throw new Error("Bottom is not set");
        }
        return this.bottom;
    }
    getContent1(): Node {
        if (!this.content1) {
            throw new Error("Content1 is not set");
        }
        return this.content1;
    }
    getContent2(): Node {
        if (!this.content2) {
            throw new Error("Content2 is not set");
        }
        return this.content2;
    }
    layout() {
        console.log("Hamburger.layout");
        console.log(this.getWindowInfo(), this.getTop(), this.getBottom(), this.getContent1(), this.getContent2());
        const height = this.getWindowInfo().windowHeight;
        const topTRS = this.getTop().getSource();
        if (!topTRS) throw new Error("topTRS is not set");
        const topOffsetHeight =  this.getTop().getEntity().get(SDFCharacter).getBoundingSize().y;
        topTRS.getPosition().y = height - topOffsetHeight - this.paddingVertical;
        topTRS.getPosition().x = this.paddingHorizntal;
        const bottomTRS = this.getBottom().getSource();
        if (!bottomTRS) throw new Error("bottomTRS is not set");
        const bottomOffsetHeight =  this.getBottom().getEntity().get(SDFCharacter).getOffsetHeight();
        bottomTRS.getPosition().y = bottomOffsetHeight + this.paddingVertical;
        bottomTRS.getPosition().x = this.paddingHorizntal;

        const content1TRS = this.getContent1().getSource();
        if (!content1TRS) throw new Error("content1TRS is not set");
        content1TRS.getPosition().x = this.paddingHorizntal;
        content1TRS.getPosition().y = height / 2;

        const content2TRS = this.getContent2().getSource();
        if (!content2TRS) throw new Error("content2TRS is not set");
        content2TRS.getPosition().x = this.paddingHorizntal;
        content2TRS.getPosition().y = height / 2 - 50;

        this.getEntity().get(Node).updateWorldMatrix();
    }
}