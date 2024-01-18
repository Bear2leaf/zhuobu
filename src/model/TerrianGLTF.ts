import GLTF from "../gltf/GLTF.js";
import GLTFNode from "../gltf/GLTFNode.js";

export default class TerrianGLTF extends GLTF {
    constructor() {
        super()
        this.setName("island");
    }
    getDefaultNode(): GLTFNode {
        const node = this.getNodeByIndex(1);
        return node;
    }
    getDefaultCameraNode() {
        const node = this.getNodeByIndex(0);
        return node;
    }
    clone(): TerrianGLTF {
        const gltf = super.clone();
        const terrianGLTF = new TerrianGLTF();
        terrianGLTF.setName(this.getName());
        terrianGLTF.setBufferCache(gltf.getBufferCache());
        terrianGLTF.setImageCache(gltf.getImageCache());
        terrianGLTF.init(gltf);
        return terrianGLTF;
    }
}