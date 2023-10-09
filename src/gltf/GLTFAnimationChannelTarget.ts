import Node from "../transform/Node.js";

export default class GLTFAnimationChannelTarget {
    private readonly node: number;
    private readonly path: string;
    private animationNode?: Node;
    constructor(target: GLTFAnimationChannelTarget) {
        this.node = target.node;
        this.path = target.path;
    }
    getNode(): number {
        return this.node;
    }
    getPath(): string {
        return this.path;
    }
    setAnimationNode(node: Node): void {
        this.animationNode = node;
    }
    getAnimationNode(): Node {
        if (this.animationNode === undefined) {
            throw new Error("animationNode is undefined");
        }
        return this.animationNode;
    }

}