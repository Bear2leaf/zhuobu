import UISystem from "../system/UISystem.js";
import Texture from "../texture/Texture.js";
import Text, { FontInfo } from "./Text.js";

export default class FpsText extends Text {
    private readonly uiSystem: UISystem;

    constructor(uiSystem: UISystem, gl: WebGL2RenderingContext, fontInfo: FontInfo, fontTexture: Texture) {
        super(gl, fontInfo, fontTexture, 0, 40, 2, [1, 1, 1, 1], 0);
        this.uiSystem = uiSystem;
    }
    update(): void {
        this.updateChars(`FPS: ${this.uiSystem.getFPS()}`);
        super.update();
    }
}