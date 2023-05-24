import RenderingCtx from "../renderingcontext/RenderingCtx.js";
import UISystem from "../system/UISystem.js";
import GLTexture from "../texture/GLTexture.js";
import Text, { FontInfo } from "./Text.js";

export default class FpsText extends Text {
    private readonly uiSystem: UISystem;

    constructor(uiSystem: UISystem, gl: RenderingCtx, fontInfo: FontInfo, fontTexture: GLTexture) {
        super(gl, fontInfo, fontTexture, 0, 60, 2, [1, 1, 1, 1], 0);
        this.uiSystem = uiSystem;
    }
    update(): void {
        this.updateChars(`FPS: ${this.uiSystem.getFPS()}`);
        super.update();
    }
}