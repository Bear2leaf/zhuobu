import { WindowInfo } from "../device/Device.js";
import SDFCharacter from "../drawobject/SDFCharacter.js";
import Node from "../transform/Node.js";
import Layout from "./Layout.js";

export default class Hamburger extends Layout {
    private readonly paddingVertical: number = 40;
    private readonly paddingHorizntal: number = 10;
    private windowInfo?: WindowInfo;
    private info?: Node;
    private status?: Node;
    private explore?: Node;
    private rest?: Node;
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
    setInfo(node: Node): void {
        this.info = node;
        node.setParent(this.getEntity().get(Node));
    }
    setStatus(node: Node): void {
        this.status = node;
        node.setParent(this.getEntity().get(Node));
    }
    setExplore(node: Node): void {
        this.explore = node;
        node.setParent(this.getEntity().get(Node));
    }
    setRest(node: Node): void {
        this.rest = node;
        node.setParent(this.getEntity().get(Node));
    }
    getInfo(): Node {
        if (!this.info) {
            throw new Error("Info is not set");
        }
        return this.info;
    }
    getStatus(): Node {
        if (!this.status) {
            throw new Error("Status is not set");
        }
        return this.status;
    }
    getExplore(): Node {
        if (!this.explore) {
            throw new Error("Explore is not set");
        }
        return this.explore;
    }
    getRest(): Node {
        if (!this.rest) {
            throw new Error("Rest is not set");
        }
        return this.rest;
    }
    layout() {
        const height = this.getWindowInfo().windowHeight;
        const width = this.getWindowInfo().windowWidth;
        const topTRS = this.getInfo().getSource();
        if (!topTRS) throw new Error("topTRS is not set");
        const topOffsetHeight = this.getInfo().getEntity().get(SDFCharacter).getBoundingSize().y;
        topTRS.getPosition().x = this.paddingHorizntal;
        topTRS.getPosition().y = height - topOffsetHeight - this.paddingVertical;
        const bottomTRS = this.getStatus().getSource();
        if (!bottomTRS) throw new Error("bottomTRS is not set");
        const bottomOffsetHeight = this.getStatus().getEntity().get(SDFCharacter).getOffsetHeight();
        bottomTRS.getPosition().x = this.paddingHorizntal;
        bottomTRS.getPosition().y = bottomOffsetHeight + this.paddingVertical;

        const content1TRS = this.getExplore().getSource();
        if (!content1TRS) throw new Error("content1TRS is not set");

        const content1OffsetHeight = this.getExplore().getEntity().get(SDFCharacter).getOffsetHeight();
        content1TRS.getPosition().x = width - this.paddingHorizntal - this.getExplore().getEntity().get(SDFCharacter).getBoundingSize().z;
        content1TRS.getPosition().y = content1OffsetHeight + this.paddingVertical + 50;

        const content2TRS = this.getRest().getSource();
        if (!content2TRS) throw new Error("content2TRS is not set");
        const content2OffsetHeight = this.getRest().getEntity().get(SDFCharacter).getOffsetHeight();
        content2TRS.getPosition().x = width - this.paddingHorizntal - this.getRest().getEntity().get(SDFCharacter).getBoundingSize().z;
        content2TRS.getPosition().y = content2OffsetHeight + this.paddingVertical;
        this.getEntity().get(Node).updateWorldMatrix();
    }
}