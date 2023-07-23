import Node from "../component/Node.js";
import PrimitiveContainer from "../component/PrimitiveTypeContainer.js";
import DrawObject from "../drawobject/DrawObject.js";
import { Vec3, Vec4 } from "../math/Vector.js";
import Renderer from "./Renderer.js";

export default class GLTFMeshRenderer extends Renderer {
    render() {
        super.render();
        this.setMatrix4fv("u_world", this.getEntity().get(Node).getChildByIndex(0).getWorldMatrix().getVertics())
        this.setVector4fv("u_diffuse", new Vec4(1, 1, 1, 1));
        this.setVector3fv("u_lightDirection", new Vec3(0, 0, 1));
        const primitive = this.getEntity().get(PrimitiveContainer).getPrimitive();
        this.getEntity().get(DrawObject).draw(primitive.getMode());
    }
}