import { Vec4 } from "../geometry/Vector.js";
import GLTFPrimitive from "../gltf/GLTFPrimitive.js";
import EagleGLTF from "../model/EagleGLTF.js";
import SkinMesh from "./SkinMesh.js";

export default class EagleMesh extends SkinMesh {
    getGLTF(): EagleGLTF {
        const gltf = super.getGLTF();
        if (!(gltf instanceof EagleGLTF)) {
            throw new Error("gltf is not set");
        }
        return gltf;
    }
    getDefaultPrimitive(): GLTFPrimitive {
        const gltf = this.getGLTF();
        const node = gltf.getDefaultNode();
        const primitive = gltf.getMeshByIndex(node.getMesh()).getPrimitiveByIndex(gltf.getPrimitiveIndex());
        return primitive;
    }
    initMesh(): void {
        super.initMesh();
        const primitive = this.getDefaultPrimitive();
        const material = this.getGLTF().getMaterialByIndex(primitive.getMaterial());
        const baseColor =  material.getPbrMetallicRoughness().getBaseColorFactor();
        this.setDiffuseColor(new Vec4(...baseColor));
        this.updateMaterial();
    }
}