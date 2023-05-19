import { ViewPortType } from "../device/Device.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import Texture from "../texture/Texture.js";
import BrowserGame from "./BrowserGame.js";

export default class BrowserTestGame extends BrowserGame {
    async load() {
        const device = this.getDevice();
        await device.loadShaderTxtCache("Sprite")
        await device.loadShaderTxtCache("Point")
        await device.loadShaderTxtCache("VertexColorTriangle")
        await device.loadShaderTxtCache("Line")
        await device.loadShaderTxtCache("Mesh")
        await device.loadFontCache("boxy_bold_font")
        await device.loadImage("resource/sprite/happy.png");
        await device.loadImage("resource/texture/test.png");

    }
    init() {


        const device = this.getDevice();
        const deviceInfo = device.getDeviceInfo();

        const defaultTexture = new Texture(device.gl);
        const textureImage = device.getImageCache().get("resource/texture/test.png");
        if (!textureImage) {
            throw new Error("textureImage not exist")
        }
        defaultTexture.generate(deviceInfo, textureImage);

        const fontTexture = new Texture(device.gl);
        const fontImage = device.getImageCache().get("resource/font/boxy_bold_font.png");
        if (!fontImage) {
            throw new Error("fontImage not exist")
        }
        fontTexture.generate(deviceInfo, fontImage);

        const happySpriteTexture = new Texture(device.gl);
        const happyImage = device.getImageCache().get("resource/sprite/happy.png");
        if (!happyImage) {
            throw new Error("happyImage not exist")
        }
        happySpriteTexture.generate(deviceInfo, happyImage);


        this.setCameraFactory(new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight));
        this.setDrawObjectFactory(new DrawObjectFactory(device.gl, defaultTexture));
        this.setRendererFactory(new RendererFactory(device.gl, device.getTxtCache(), device.getFontCache()));


        this.setUISystem(happySpriteTexture, fontTexture);
    }
    tick(frame: number) {
        const device = this.getDevice();
        device.clearRenderer();
        device.viewportTo(ViewPortType.Full)
        this.getUISystem().render(device.gl, device.now(), frame);
        requestAnimationFrame(() => this.tick(++frame))
    }

}