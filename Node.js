import { twgl } from "./global.js";
import TRS from "./TRS.js";
export default class Node {
    constructor(useSource = true) {
        this.children = [];
        this.localMatrix = twgl.m4.identity();
        this.worldMatrix = twgl.m4.identity();
        if (useSource) {
            this.source = new TRS();
        }
    }
    setParent(parent) {
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
    updateWorldMatrix(matrix) {
        const source = this.source;
        if (source) {
            source.getMatrix(this.localMatrix);
        }
        if (matrix) {
            // a matrix was passed in so do the math and
            // store the result in `this.worldMatrix`.
            twgl.m4.multiply(matrix, this.localMatrix, this.worldMatrix);
        }
        else {
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
//# sourceMappingURL=Node.js.map