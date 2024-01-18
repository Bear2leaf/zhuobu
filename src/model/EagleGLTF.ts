import GLTFAnimation from "../gltf/GLTFAnimation.js";
import GLTFNode from "../gltf/GLTFNode.js";
import TerrianGLTF from "./TerrianGLTF.js";

export default class EagleGLTF extends TerrianGLTF {
    private index: number = 35;
    getDefaultNode(): GLTFNode {
        const node = this.getNodeByIndex(this.index);
        return node;
    }
    getDefaultAnimation(): GLTFAnimation {
        const animation = this.getAnimationByIndex(0);
        return animation;
    }
    setIndex(index: number) {
        this.index = index;
    }
    clone(): EagleGLTF {
        const gltf = super.clone();
        const rockGLTF = new EagleGLTF();
        rockGLTF.setIndex(this.index);
        rockGLTF.setName(this.getName());
        rockGLTF.setBufferCache(gltf.getBufferCache());
        rockGLTF.setImageCache(gltf.getImageCache());
        rockGLTF.init(gltf);
        return rockGLTF;
    }
}