import UniformBufferObject from "../contextobject/UniformBufferObject.js";
import Sprite from "../drawobject/Sprite.js";
import { Vec4 } from "../geometry/Vector.js";
import Texture from "../texture/Texture.js";
import Node from "../transform/Node.js";
import TRS from "../transform/TRS.js";


export default class Water extends Sprite {
    private reflectTexture?: Texture;
    private distortionTexture?: Texture;
    private normalTexture?: Texture;
    setReflectTexture(texture: Texture) {
        this.reflectTexture = texture;
    }
    getReflectTexture() {
        if (!this.reflectTexture) {
            throw new Error("reflectTexture is not set");
        }
        return this.reflectTexture;
    }
    setDistortionTexture(texture: Texture) {
        this.distortionTexture = texture;
    }
    getDistortionTexture() {
        if (!this.distortionTexture) {
            throw new Error("distortionTexture is not set");
        }
        return this.distortionTexture;
    }
    setNormalTexture(texture: Texture) {
        this.normalTexture = texture;
    }
    getNormalTexture() {
        if (!this.normalTexture) {
            throw new Error("normalTexture is not set");
        }
        return this.normalTexture;
    }
    init(): void {
        // this.getRect().x = 0;
        // this.getRect().y = 0;
        // this.getRect().z = 800;
        // this.getRect().w = 600;
        super.init();
        this.getEntity().get(TRS).getPosition().set(-5, 0, 5);
        this.getEntity().get(TRS).getRotation().set(-Math.PI / 4, 0, 0);
        this.getEntity().get(TRS).getScale().set(10, 10, 1);
        this.getEntity().get(Node).updateWorldMatrix();
    }
}