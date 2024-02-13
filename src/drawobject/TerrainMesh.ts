import IslandGLTF from "../model/IslandGLTF.js";
import Texture from "../texture/Texture.js";
import Mesh from "./Mesh.js";

export default class TerrainMesh extends Mesh {
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
    getGLTF(): IslandGLTF {
        const gltf = super.getGLTF();
        if (!(gltf instanceof IslandGLTF)) {
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