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
    init(): void {
        this.setNodeIndex(2)
        super.init();
    }
    draw(): void {
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchNearestFilter(true);
        super.draw();
        this.getRenderingContext().switchNearestFilter(false);
        this.getRenderingContext().switchBlend(false);


    }
}