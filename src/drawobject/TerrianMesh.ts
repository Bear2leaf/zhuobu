import Texture from "../texture/Texture.js";
import TRS from "../transform/TRS.js";
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
        // this.getEntity().get(TRS).getPosition().y = -1;
        this.getEntity().get(TRS).getScale().multiply(5);
    }
    draw(): void {
        this.getRenderingContext().switchBlend(true);
        this.getRenderingContext().switchNearestFilter(true);
        super.draw();
        this.getRenderingContext().switchNearestFilter(false);
        this.getRenderingContext().switchBlend(false);


    }
}