import DrawObject from "../drawobject/DrawObject.js";
import Matrix from "../math/Matrix.js";
import Component from "./Component.js";
import TRS from "./TRS.js";

export default class Node implements Component {
    private readonly name: string;
    private readonly source: TRS;
    private parent: Node | null;
    private readonly children: Node[];
    private readonly localMatrix: Matrix;
    private readonly worldMatrix: Matrix;
    private readonly drawObjects: DrawObject[]
    constructor(source?: TRS, name?: string) {
      this.name = name ?? "untitled";
      this.source = source ?? new TRS();
      this.parent = null;
      this.children = [];
      this.localMatrix = Matrix.identity();
      this.worldMatrix = Matrix.identity();
      this.drawObjects = [];
    }
    getChildByIndex(index: number) {
      const childNode = this.children[index];
      if (!childNode) {
          throw new Error(`childNode not found: ${index}`);
      }
      return childNode;
    }
    addDrawObject(drawObject: DrawObject) {
      this.drawObjects.push(drawObject);
    }
    getDrawObjects() {
      return this.drawObjects;
    }
    setParent(parent?: Node) {
      if (this.parent) {
        this.parent.removeChild(this);
        this.parent = null;
      }
      if (parent) {
        parent.addChild(this);
        this.parent = parent;
      }
    }
    updateWorldMatrix(parentWorldMatrix?: Matrix) {
      const source = this.source;
      if (source) {
        source.getMatrix(this.localMatrix);
      }

      if (parentWorldMatrix) {
        // a matrix was passed in so do the math
        Matrix.multiply(parentWorldMatrix, this.localMatrix, this.worldMatrix);
      } else {
        // no matrix was passed in so just copy local to world
        Matrix.copy(this.localMatrix, this.worldMatrix);
      }

      // now process all the children
      const worldMatrix = this.worldMatrix;
      for (const child of this.children) {
        child.updateWorldMatrix(worldMatrix);
      }
    }
    traverse(fn: Function) {
      fn(this);
      for (const child of this.children) {
        child.traverse(fn);
      }
    }
    getWorldMatrix() {
      return this.worldMatrix;
    }
    private addChild(child: this) {
      this.children.push(child);
    }
    private removeChild(child: this) {
      const ndx = this.children.indexOf(child);
      this.children.splice(ndx, 1);
    }
    getSource() {
      return this.source;
    }
}
  