import SkinMesh from "../drawobject/SkinMesh.js";
import { Vec3, Vec4 } from "../geometry/Vector.js";
import JointTexture from "../texture/JointTexture.js";
import Renderer from "./Renderer.js";

export default class GLTFSkinMeshRenderer extends Renderer {
    render(drawObject: SkinMesh) {
        this.prepareShader();
        this.prepareLight();
        this.prepareJoints(drawObject.getJointTexture());
        this.drawEntity(drawObject);
    }
    prepareLight() {
        this.getShader().setVector4f("u_diffuse", new Vec4(.5, .8, 1, 1));
        this.getShader().setVector3f("u_lightDirection", new Vec3(0, 0, 1));
    }
    prepareJoints(jointTexture: JointTexture) {
        
        jointTexture.bind();
        this.getShader().setInteger("u_jointTexture", jointTexture.getBindIndex());
    }
}
