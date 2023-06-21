import RenderingContext from "../renderingcontext/RenderingContext.js";
import UISystem from "../system/UISystem.js";
import GLTexture from "../texture/GLTexture.js";
import Text, { FontInfo } from "./Text.js";

export default class FpsText extends Text {

    constructor(gl: RenderingContext, fontInfo: FontInfo, fontTexture: GLTexture) {
        super(gl, fontInfo, fontTexture, 0, 60, 2, [1, 1, 1, 1], 0);
        this.updateChars("loading...");
    }
}