import { Vec4 } from "../geometry/Vector.js";
import RockGLTF from "../model/RockGLTF.js";
import Mesh from "./Mesh.js";

export default class RockMesh extends Mesh {
    getGLTF(): RockGLTF {
        const gltf = super.getGLTF();
        if (!(gltf instanceof RockGLTF)) {
            throw new Error("gltf is not set");
        }
        return gltf;
    }
    initMesh(): void {
        super.initMesh();
        const meshIndex = this.getGLTF().getDefaultNode().getMesh();
        const mesh = this.getGLTF().getMeshByIndex(meshIndex);
        const primitive = mesh.getPrimitiveByIndex(0);
        const material = this.getGLTF().getMaterialByIndex(primitive.getMaterial());
        const baseColor =  material.getPbrMetallicRoughness().getBaseColorFactor();
        this.setDiffuseColor(new Vec4(...baseColor));
        this.updateMaterial();
    }
}