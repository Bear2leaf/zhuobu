import TerrianGLTF from "../model/TerrianGLTF.js";
import Texture from "../texture/Texture.js";
import Mesh from "./Mesh.js";

export default class TerrianMesh extends Mesh {
    private depthTexture?: Texture;
    setDepthTexture(texture: Texture) {
        this.depthTexture = texture;
    }
    getDepthTexture() {
        if (!this.depthTexture) {
            throw new Error("depthTexture is not set");
        }
        return this.depthTexture;
    }
    getGLTF(): TerrianGLTF {
        const gltf = super.getGLTF();
        if (!(gltf instanceof TerrianGLTF)) {
            throw new Error("gltf is not set");
        }
        return gltf;
    }
    draw(): void {
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchNearestFilter(true);
        super.draw();
        this.getRenderingContext().switchNearestFilter(false);
        this.getRenderingContext().switchBlend(false);


    }
}