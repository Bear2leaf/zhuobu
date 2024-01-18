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
}