
import SDFCharacter from "../drawobject/SDFCharacter.js";
import { Vec4 } from "../geometry/Vector.js";
import { TextureBindIndex } from "../texture/Texture.js";
import Renderer from "./Renderer.js";

export default class SDFRenderer extends Renderer {
    private scale: number = 32;
    private buffer: number = 0.5;
    private gamma: number = 2;
    setScale(scale: number) {
        this.scale = scale;
    }
    render(drawObject: SDFCharacter) {
        this.prepareShader();
        this.prepareOutline();
        this.drawEntity(drawObject);
        this.prepareText();
        this.drawEntity(drawObject);
    }
    prepareOutline() {

        this.getShader().setInteger("u_texture", TextureBindIndex.OffscreenCanvas);
        this.getShader().setVector4f("u_color", new Vec4(1, 1, 1, 1));
        this.getShader().setFloat("u_buffer", this.buffer);
    }
    prepareText() {

        this.getShader().setVector4f("u_color", new Vec4(0, 0, 0, 1));
        this.getShader().setFloat("u_buffer", 0.75 );
        this.getShader().setFloat("u_gamma", this.gamma * 1.4142 / this.scale);
    }

}