import GLTFAttributes from "./GLTFAttribute.js";
import GLTFTarget from "./GLTFTarget.js";

export default class GLTFPrimitive {
    private readonly attributes: GLTFAttributes;
    private readonly indices: number;
    private readonly material: number;
    private readonly mode: number;
    private readonly targets: GLTFTarget;

    constructor(primitive: GLTFPrimitive) {
        this.attributes = new GLTFAttributes(primitive.attributes);
        this.indices = primitive.indices;
        this.material = primitive.material;
        this.mode = primitive.mode;
        this.targets = primitive.targets;
    }
    getIndices() {
        return this.indices;
    }
    getAttributes() {
        return this.attributes;
    }

}