import { Vec4 } from "../geometry/Vector.js";
import Mesh from "./Mesh.js";

export default class RockMesh extends Mesh {
    initMesh(): void {
        super.initMesh();
        const meshIndex = this.getGLTF().getNodeByIndex(this.getNodeIndex()).getMesh();
        const mesh = this.getGLTF().getMeshByIndex(meshIndex);
        const primitive = mesh.getPrimitiveByIndex(this.getPrimitiveIndex());
        const material = this.getGLTF().getMaterialByIndex(primitive.getMaterial());
        const baseColor =  material.getPbrMetallicRoughness().getBaseColorFactor();
        this.setDiffuseColor(new Vec4(...baseColor));
        this.updateMaterial();
    }
}