import { PrimitiveType } from "../contextobject/Primitive.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import RenderingContext from "../contextobject/RenderingContext.js";
import Renderer from "./Renderer.js";

export default class GLTFSkinMeshRenderer extends Renderer {
    render() {
        super.render();
        this.getShader().setVector4f("u_diffuse", new Vec4(.5, .8, 1, 1));
        this.getShader().setVector3f("u_lightDirection", new Vec3(0, 0, 1));
        this.getShader().setInteger("u_jointTexture", 1);
        this.getEntity().get(DrawObject).draw(this.getPrimitive().getMode());
        
    }
    initPrimitive(rc: RenderingContext): void {
        this.setPrimitive(rc.makePrimitive(PrimitiveType.TRIANGLES));
    }
}
