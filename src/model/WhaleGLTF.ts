import GLTF from "../gltf/GLTF.js";
import GLTFNode from "../gltf/GLTFNode.js";

export default class WhaleGLTF extends GLTF {
    constructor() {
        super()
        this.setName("whale.CYCLES");
    }
    getDefaultNode(): GLTFNode {
        const node = this.getNodeByIndex(4);
        return node;
    }
    clone(): WhaleGLTF {
        const gltf = super.clone();
        const terrianGLTF = new WhaleGLTF();
        terrianGLTF.setName(this.getName());
        terrianGLTF.setBufferCache(gltf.getBufferCache());
        terrianGLTF.setImageCache(gltf.getImageCache());
        terrianGLTF.init(gltf);
        return terrianGLTF;
    }
}