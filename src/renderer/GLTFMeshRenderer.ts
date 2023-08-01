import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render() {
        super.render();
        this.setVector4fv("u_diffuse", new Vec4(1, 1, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
    }
    initPrimitive(gl: RenderingContext): void {
        this.setPrimitive(gl.makePrimitive(PrimitiveType.TRIANGLES));
    }
}