import { Vec3, Vec4 } from "../math/Vector.js";
import Node from "../component/Node.js";
import Renderer from "./Renderer.js";

export default class GLTFSkinMeshRenderer extends Renderer {
    render() {
        this.setVector4fv("u_diffuse", new Vec4(.5, .8, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        this.setInteger("u_jointTexture", 1);
        this.getEntity().get(Node).traverse((child: Node) => {
            child.getEntity().get(GLTFSkinMeshRenderer).render();
        });
    }
}
