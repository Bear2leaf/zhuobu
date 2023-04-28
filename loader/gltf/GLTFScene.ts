export default class GLTFScene {
    private readonly name: string;
    private readonly nodes: number[];
    constructor(scene: GLTFScene) {
        this.name = scene.name;
        this.nodes = scene.nodes;
    }
    getNodeByIndex(index: number) {
        const node = this.nodes[index];
        if (node === undefined) {
            throw new Error(`Node not found: ${index}`);
        }
        return node;
    }
}