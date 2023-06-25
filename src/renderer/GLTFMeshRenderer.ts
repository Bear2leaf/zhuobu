import Camera from "../camera/Camera.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import Node from "../component/Node.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render(camera: Camera, node: Node) {
        super.render(camera, node);
        this.setVector4fv("u_diffuse", new Vec4(1, 1, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        node.traverse((child: Node) => {
            super.render(camera, child);
        });
    }
}