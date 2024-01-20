import GLTF from "../gltf/GLTF.js";

export default class WhaleGLTF extends GLTF {
    constructor() {
        super()
        this.setName("whale.CYCLES");
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