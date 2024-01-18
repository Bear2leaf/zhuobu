import GLTFNode from "../gltf/GLTFNode.js";
import TerrianGLTF from "./TerrianGLTF.js";

export default class RockGLTF extends TerrianGLTF {
    private index: number = 8;
    setIndex(index: number) {
        this.index = index;
    }
    getDefaultNode(): GLTFNode {
        const node = this.getNodeByIndex(this.index);
        return node;
    }
    clone(): RockGLTF {
        const gltf = super.clone();
        const rockGLTF = new RockGLTF();
        rockGLTF.setName(this.getName());
        rockGLTF.setBufferCache(gltf.getBufferCache());
        rockGLTF.setImageCache(gltf.getImageCache());
        rockGLTF.init(gltf);
        return rockGLTF;
    }
}