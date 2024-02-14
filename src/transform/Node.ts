import Matrix from "../geometry/Matrix.js";
import { Component } from "../entity/Entity.js";
import TRS from "./TRS.js";

export default class Node extends Component {
  private name: string = "";
  private source?: TRS;
  private parent?: Node;
  private readonly children: Node[] = [];
  private readonly localMatrix: Matrix = Matrix.identity();
  private readonly worldMatrix: Matrix = Matrix.identity();
  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }
  getRoot() {
    let root: Node = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  }
  hasChildren() {
    return this.children.length > 0;
  }
  getChildByIndex(index: number) {
    const childNode = this.children[index];
    if (!childNode) {
      throw new Error(`childNode not found: ${index}`);
    }
    return childNode;
  }
  setParent(parent?: Node) {
    if (this.parent) {
      this.parent.removeChild(this);
      this.parent = undefined;
    }
    if (parent) {
      parent.addChild(this);
      this.parent = parent;
    }
  }
  setLocalMatrix(matrix: Matrix) {
    Matrix.copy(matrix, this.localMatrix);
  }
  updateWorldMatrix(parentWorldMatrix?: Matrix) {
    const source = this.getSource();
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
  getWorldMatrix() {
    return this.worldMatrix;
  }
  private addChild(child: this) {
    this.children.push(child);
  }
  private removeChild(child: this) {
    const ndx = this.children.indexOf(child);

    if (ndx !== -1) {
      this.children.splice(ndx, 1);
    }
  }
  getChildren(): readonly Node[] {
    return this.children;
  }
  getSource() {
    return this.source;
  }
  setSource(source?: TRS) {
    this.source = source;
  }
}
