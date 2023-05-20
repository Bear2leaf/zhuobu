import { ViewPortType } from "../device/Device.js";
import Sprite from "../drawobject/Sprite.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
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
        await device.loadImageCache("boxy_bold_font")
        await device.loadImageCache("test");
        await device.loadImageCache("happy");

    }
    init() {

        const device = this.getDevice();
        const deviceInfo = device.getDeviceInfo();

        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const happyTexture = textureFactory.createTexture("happy");
        const fontTexture = textureFactory.createTexture("boxy_bold_font");
        const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTexture("test"));
        const defaultSprite = drawObjectFactory.createSprite(190, 30, 10);
        const happySprite = drawObjectFactory.createSprite(100, 0, 5, happyTexture);
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
        const rendererFactory = new RendererFactory(device.gl, device.getTxtCache(), device.getFontCache())
        this.createUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
        this.getUISystem().setMainRenderer(rendererFactory.createMainRenderer())
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