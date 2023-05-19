import { ViewPortType } from "../device/Device.js";
import Sprite from "../drawobject/Sprite.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import Texture from "../texture/Texture.js";
import BrowserGame from "./BrowserGame.js";

export default class BrowserSpriteGame extends BrowserGame {
    async load() {
        const device = this.getDevice();
        await device.loadShaderTxtCache("Sprite")
        await device.loadShaderTxtCache("Point")
        await device.loadShaderTxtCache("VertexColorTriangle")
        await device.loadShaderTxtCache("Line")
        await device.loadShaderTxtCache("Mesh")
        await device.loadFontCache("boxy_bold_font")
        await device.loadImage("resource/texture/test.png");
        await device.loadImage("resource/sprite/happy.png");

    }
    init() {

        const device = this.getDevice();
        const deviceInfo = device.getDeviceInfo();

        const defaultTexture = new Texture(device.gl);
        const defaultTextureImage = device.getImageCache().get("resource/texture/test.png");
        if (!defaultTextureImage) {
            throw new Error("defaultTextureImage not exist")
        }
        defaultTexture.generate(deviceInfo, defaultTextureImage);
        const drawObjectFactory = new DrawObjectFactory(device.gl, defaultTexture);
        const defaultSprite = drawObjectFactory.createSprite(190, 30, 10);
        const happyTexture = new Texture(device.gl);
        const happyTextureImage = device.getImageCache().get("resource/sprite/happy.png");
        if (!happyTextureImage) {
            throw new Error("happyTextureImage not exist")
        }
        happyTexture.generate(deviceInfo, happyTextureImage);
        const happySprite = drawObjectFactory.createSprite(100, 0, 5, happyTexture);
        const fontTexture = new Texture(device.gl);
        const fontImage = device.getImageCache().get("resource/font/boxy_bold_font.png");
        if (!fontImage) {
            throw new Error("fontImage not exist")
        }
        fontTexture.generate(deviceInfo, fontImage);

        this.setDrawObjectFactory(drawObjectFactory);
        this.setCameraFactory(new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight));
        this.setRendererFactory(new RendererFactory(device.gl, device.getTxtCache(), device.getFontCache()));


        this.setUISystem(fontTexture);
        this.getUISystem().addSprite(defaultSprite);
        this.getUISystem().addSprite(happySprite);
    }
    tick(frame: number) {
        const device = this.getDevice();
        device.clearRenderer();
        device.viewportTo(ViewPortType.Full)
        this.getUISystem().render(device.gl, device.now(), frame);
        requestAnimationFrame(() => this.tick(++frame))
    }

}