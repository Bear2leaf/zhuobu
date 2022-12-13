import { twgl } from "./global.js";

export default class Node {
    private readonly children: Node[];
    readonly localMatrix: twgl.m4.Mat4;
    readonly worldMatrix: twgl.m4.Mat4;
    private parent?: Node;
    drawInfo?: twgl.DrawObject;
    constructor() {
        this.children = [];
        this.localMatrix = twgl.m4.identity();
        this.worldMatrix = twgl.m4.identity();
    }
    setParent(parent: Node) {
        if (this.parent) {
            const ndx = this.parent.children.indexOf(this);
            if (ndx >= 0) {
                this.parent.children.splice(ndx, 1);
            }
        }
        if (parent) {
            parent.children.push(this);
        }
        this.parent = parent;
    }
    updateWorldMatrix(parentWorldMatrix?: twgl.m4.Mat4) {
        if (parentWorldMatrix) {
            // a matrix was passed in so do the math and
            // store the result in `this.worldMatrix`.
            twgl.m4.multiply(parentWorldMatrix, this.localMatrix, this.worldMatrix);
        } else {
            // no matrix was passed in so just copy.
            twgl.m4.copy(this.localMatrix, this.worldMatrix);
        }

        // now process all the children
        const worldMatrix = this.worldMatrix;
        this.children.forEach(function (child) {
            child.updateWorldMatrix(worldMatrix);
        });
    }
}