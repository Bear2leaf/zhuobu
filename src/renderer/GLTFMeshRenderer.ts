
import WhaleMesh from "../drawobject/WhaleMesh.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render() {
        this.prepareShader();
        this.prepareCamera();
        this.prepareLight();
        this.getSceneManager().first().getComponents(WhaleMesh).forEach(drawObject => {
            this.drawEntity(drawObject);
        });
    }
    prepareLight() {
        this.getShader().setVector4f("u_diffuse", new Vec4(1, 1, 1, 1));
        this.getShader().setVector3f("u_lightDirection", new Vec3(0, 0, 1));
    }
}