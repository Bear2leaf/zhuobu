import GLTFPrimitive from "./GLTFPrimitive.js";

export default class GLTFMesh {
    private readonly name: string;
    private readonly primitives: readonly GLTFPrimitive[];
    private readonly weights: number[];
    private readonly extras: any;
    private readonly extensions: any;
    constructor() {
        this.name = '';
        this.primitives = [];
        this.weights = [];
        this.extras = null;
        this.extensions = null;
    }
}