import GLTF from "../gltf/GLTF.js";

export default class IslandGLTF extends GLTF {
    constructor() {
        super()
        this.setName("island");
    }
    clone(): IslandGLTF {
        const gltf = super.clone();
        const terrianGLTF = new IslandGLTF();
        terrianGLTF.setName(this.getName());
        terrianGLTF.setBufferCache(gltf.getBufferCache());
        terrianGLTF.setImageCache(gltf.getImageCache());
        terrianGLTF.init(gltf);
        return terrianGLTF;
    }
}