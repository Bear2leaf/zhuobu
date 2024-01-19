import GLTFAnimation from "../gltf/GLTFAnimation.js";
import GLTFNode from "../gltf/GLTFNode.js";
import TerrianGLTF from "./TerrianGLTF.js";

export default class EagleGLTF extends TerrianGLTF {
    private index: number = 35;
    private primitiveIndex: number = 0;
    setIndex(index: number) {
        this.index = index;
    }
    setPrimitiveIndex(index: number) {
        this.primitiveIndex = index;
    }
    getPrimitiveIndex() {
        return this.primitiveIndex;
    }
    getDefaultNode(): GLTFNode {
        const node = this.getNodeByIndex(this.index);
        return node;
    }
    getDefaultAnimation(): GLTFAnimation {
        const animation = this.getAnimationByIndex(0);
        return animation;
    }
    clone(): EagleGLTF {
        const gltf = super.clone();
        const eagleGLTF = new EagleGLTF();
        eagleGLTF.setIndex(this.index);
        eagleGLTF.setPrimitiveIndex(this.primitiveIndex);
        eagleGLTF.setName(this.getName());
        eagleGLTF.setBufferCache(gltf.getBufferCache());
        eagleGLTF.setImageCache(gltf.getImageCache());
        eagleGLTF.init(gltf);
        return eagleGLTF;
    }
}