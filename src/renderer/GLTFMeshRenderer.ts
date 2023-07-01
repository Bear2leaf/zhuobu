import { Vec3, Vec4 } from "../math/Vector.js";
import Node from "../component/Node.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render() {
        super.render();
        this.setVector4fv("u_diffuse", new Vec4(1, 1, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        this.getEntity().get(Node).traverse((child: Node) => {
            child.getEntity().get(GLTFMeshRenderer).render();
        });
    }
}