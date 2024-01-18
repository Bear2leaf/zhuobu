import { flatten, Vec2, Vec4 } from "../geometry/Vector.js";
import DrawObject from "./DrawObject.js";
import { ArrayBufferIndex } from "../renderingcontext/RenderingContext.js";
import { PrimitiveType } from "../contextobject/Primitive.js";
import SDFCharacter from "./SDFCharacter.js";
import { WindowInfo } from "../device/Device.js";
import Hamburger from "../layout/Hamburger.js";

export default class Border extends DrawObject {
    private readonly indices: number[] = [0, 1, 1, 2, 2, 3, 3, 0];
    private readonly vertices: [Vec4, Vec4, Vec4, Vec4] = [new Vec4, new Vec4, new Vec4, new Vec4];
    init() {
        super.init();
        this.setPrimitive(this.getRenderingContext().makePrimitive(PrimitiveType.LINES));
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
        this.updateEBO(new Uint16Array(this.indices));
    }
    createFromSDFCharacter() {
        const textBoundingSize = this.getEntity().get(SDFCharacter).getBoundingSize();
        const { x, y, z, w } = textBoundingSize;
        this.vertices[0].set(x, y, 0);
        this.vertices[1].set(x + z, y, 0);
        this.vertices[2].set(x + z, y + w, 0);
        this.vertices[3].set(x, y + w, 0);
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
    }
    createFromHamburger(padding: [number, number]) {
        const windowInfo = this.getEntity().get(Hamburger).getWindowInfo();
        const textBoundingSize = new Vec4(padding[1], padding[0], windowInfo.windowWidth - padding[1] * 2, windowInfo.windowHeight - padding[0] * 2);
        const { x, y, z, w } = textBoundingSize;
        this.vertices[0].set(x, y, 0);
        this.vertices[1].set(x + z, y, 0);
        this.vertices[2].set(x + z, y + w, 0);
        this.vertices[3].set(x, y + w, 0);
        this.updateABO(ArrayBufferIndex.Position, flatten(this.vertices));
    }
}