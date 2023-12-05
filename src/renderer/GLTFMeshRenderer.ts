
import DrawObject from "../drawobject/DrawObject.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render(drawObject: DrawObject) {
        this.prepareShader();
        this.prepareCamera();
        this.prepareLight();
        this.drawEntity(drawObject);

    }
    prepareLight() {
        this.getShader().setVector4f("u_diffuse", new Vec4(1, 1, 1, 1));
        this.getShader().setVector3f("u_lightDirection", new Vec3(0, 0, 1));
    }
}