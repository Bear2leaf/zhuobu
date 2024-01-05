import { flatten, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import SDFCharacter from "./SDFCharacter.js";

export default class Border extends DrawObject {
    private readonly indices: number[] = [0, 1, 1, 2, 2, 3, 3, 0];
    private readonly vertices: [Vec4, Vec4, Vec4, Vec4] = [new Vec4, new Vec4, new Vec4, new Vec4];
    init() {
        super.init();
        this.setPrimitive(this.getRenderingContext().makePrimitive(PrimitiveType.LINES));
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateEBO(new Uint16Array(this.indices));
    }
    create() {
        const textBoundingSize = this.getEntity().get(SDFCharacter).getBoundingSize();
        const { x, y, z, w } = textBoundingSize;
        console.log("textBoundingSize", textBoundingSize);
        this.vertices[0].set(x, y, 0);
        this.vertices[1].set(x + z, y, 0);
        this.vertices[2].set(x + z, y + w, 0);
        this.vertices[3].set(x, y + w, 0);
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
    }
}