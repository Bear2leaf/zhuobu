export default class GLTFScene {
    private readonly name: string;
    private readonly nodes: number[];
    constructor(scene: GLTFScene) {
        this.name = scene.name;
        this.nodes = scene.nodes;
    }
}