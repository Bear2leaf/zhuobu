import { Vec4 } from "../geometry/Vector.js";
import SkinMesh from "./SkinMesh.js";

export default class EagleMesh extends SkinMesh {
    initMesh(): void {
        super.initMesh();
        const gltf = this.getGLTF();
        const node = gltf.getNodeByIndex(this.getNodeIndex());
        const primitive = gltf.getMeshByIndex(node.getMesh()).getPrimitiveByIndex(this.getPrimitiveIndex());
        const material = this.getGLTF().getMaterialByIndex(primitive.getMaterial());
        const baseColor =  material.getPbrMetallicRoughness().getBaseColorFactor();
        this.setDiffuseColor(new Vec4(...baseColor));
        this.updateMaterial();
    }
}