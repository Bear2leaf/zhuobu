import RenderingContext from "../renderingcontext/RenderingContext.js";
import Texture from "../texture/Texture.js";
import Text, { FontInfo } from "./Text.js";

export default class FpsText extends Text {

    constructor(gl: RenderingContext, fontInfo: FontInfo, fontTexture: Texture) {
        super(gl, fontInfo, fontTexture, 0, 60, 2, [1, 1, 1, 1], 0);
        this.updateChars("loading...");
    }
}