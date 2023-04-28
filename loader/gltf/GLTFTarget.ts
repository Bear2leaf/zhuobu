export default class GLTFTarget {
    private readonly node: number;
    private readonly path: string;
    constructor(target: GLTFTarget) {
        this.node = target.node;
        this.path = target.path;
    }
}