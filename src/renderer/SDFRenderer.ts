
import SkinMesh from "../drawobject/SkinMesh.js";
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
    render(clear: boolean = true) {
        this.getShader().use();
        this.bindUBOs();
        this.getObjectList().forEach(drawObject => {
            this.getShader().setVector4f("u_pickColor", drawObject.getPickColor());
            if (drawObject instanceof SkinMesh) {
                drawObject.getJointTexture().bind();
                this.getShader().setInteger("u_jointTexture", drawObject.getJointTexture().getBindIndex());
            }
            drawObject.bind();
            this.prepareOutline();
            drawObject.draw();
            this.prepareText();
            drawObject.draw();
        });
        if (clear) {
            this.getObjectList().splice(0, this.getObjectList().length);
        }
    }
    prepareOutline() {

        this.getShader().setInteger("u_texture", TextureBindIndex.OffscreenCanvas);
        this.getShader().setVector4f("u_color", new Vec4(1, 1, 1, 1));
        this.getShader().setFloat("u_buffer", this.buffer);
    }
    prepareText() {

        this.getShader().setVector4f("u_color", new Vec4(0, 0, 0, 1));
        this.getShader().setFloat("u_buffer", 0.75);
        this.getShader().setFloat("u_gamma", this.gamma * 1.4142 / this.scale);
    }

}