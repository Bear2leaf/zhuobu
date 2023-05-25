import GLTFExtra from "./GLTFExtra.js";
import GLTFPrimitive from "./GLTFPrimitive.js";

export default class GLTFMesh {
    private readonly name: string;
    private readonly primitives: readonly GLTFPrimitive[];
    private readonly weights: number[];
    private readonly extras: GLTFExtra[];
    private readonly extensions: any;
    constructor(mesh: GLTFMesh) {
        this.name = mesh.name;
        this.primitives = mesh.primitives.map((primitive) => new GLTFPrimitive(primitive));
        this.weights = mesh.weights;
        this.extras = mesh.extras;
        this.extensions = mesh.extensions;
    }
    getName() {
        return this.name;
    }
    getPrimitiveByIndex(index: number) {
        const primitive = this.primitives[index];
        if (!primitive) {
            throw new Error("primitive is undefined")
        }
        return primitive;
    }

}