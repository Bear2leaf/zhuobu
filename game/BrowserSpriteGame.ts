import { ViewPortType } from "../device/Device.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
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
        await device.loadImageCache("flowers");

    }
    init() {

        const device = this.getDevice();
        const deviceInfo = device.getDeviceInfo();
        device.gl.init();
        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const fontTexture = textureFactory.createTexture("boxy_bold_font");
        const happyTexture = textureFactory.createTexture("happy");
        const flowersTexture = textureFactory.createTexture("flowers");
        const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTexture("test"), device.getFontCache());
        const defaultSprite = drawObjectFactory.createSprite(200, 100, 5);
        const happySprite = drawObjectFactory.createSprite(100, 0, 5, happyTexture);
        const flowersSprite = drawObjectFactory.createSprite(0, 0, 0.7, flowersTexture);
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
        const rendererFactory = new RendererFactory(device.gl, device.getTxtCache())
        this.initUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
        this.getUISystem().setMainRenderer(rendererFactory.createMainRenderer())
        this.getUISystem().addSprite(flowersSprite);
        this.getUISystem().addSprite(defaultSprite);
        this.getUISystem().addSprite(happySprite);
    }
    tick() {
        this.tickClock();
        const device = this.getDevice();
        device.viewportTo(ViewPortType.Full)
        this.getUISystem().update();
        this.getUISystem().render(device.gl);
        requestAnimationFrame(() => this.tick())
    }

}