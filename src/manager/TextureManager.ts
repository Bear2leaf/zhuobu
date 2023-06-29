import DefaultTexture from "../texture/DefaultTexture.js";
import Texture from "../texture/Texture.js";
import Manager from "./Manager.js";

export default class TextureManager extends Manager<Texture> {
    init() {

        this.add(DefaultTexture);
        console.log("TextureManager init");
    }

}