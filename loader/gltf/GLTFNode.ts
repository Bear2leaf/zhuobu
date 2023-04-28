export default class GLTFNode {
    private readonly name: string;
    private readonly mesh: number;
    private readonly children: number[];
    private readonly translation: number[];
    private readonly rotation: number[];
    private readonly scale: number[];
    private readonly matrix: number[];
    constructor(node: GLTFNode) {
        this.name = node.name;
        this.mesh = node.mesh;
        this.children = node.children;
        this.translation = node.translation;
        this.rotation = node.rotation;
        this.scale = node.scale;
        this.matrix = node.matrix;
    }
    getName() {
        return this.name;
    }
    getMesh() {
        return this.mesh;
    }
    getTranslation() {
        return this.translation;
    }
    getRotation() {
        return this.rotation;
    }
    getScale() {
        return this.scale;
    }
}