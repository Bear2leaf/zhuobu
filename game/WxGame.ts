import { ViewPortType } from "../device/Device";
import WxDevice from "../device/WxDevice.js";
import SplashText from "../drawobject/SplashText";
import CameraFactory from "../factory/CameraFactory";
import RendererFactory from "../factory/RendererFactory";
import ShaderFactory from "../factory/ShaderFactory";
import TextureFactory from "../factory/TextureFactory";
import Node from "../structure/Node";
import BaseGame from "./BaseGame.js";

export default class WxGame extends BaseGame {
    private readonly splashTextNode: Node;
    private preloading: boolean;
    constructor() {
        super(new WxDevice())
        this.splashTextNode = new Node();
        this.preloading = true;
    }
    async load() {

        const device = this.getDevice();
        await device.loadShaderTxtCache("Sprite")
        await this.getDevice().loadFontCache("boxy_bold_font")
        this.init();
        await super.load();
        super.init();
        this.preloading = false;
    }
    init() {
        const device = this.getDevice();
        const deviceInfo = this.getDevice().getDeviceInfo();
        device.gl.init();
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight);

        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const fontTexture = textureFactory.createFontTexture();
        const fontInfo = device.getFontCache().get("static/font/boxy_bold_font.json");
        if (!fontInfo) {
            throw new Error("fontInfo is null");
        }
        this.splashTextNode.addDrawObject(new SplashText(device.gl, fontInfo, fontTexture));
        this.splashTextNode.getDrawObjects().forEach((drawObject) => {
            drawObject.update(this.splashTextNode);
        });
        const camera = cameraFactory.createOrthoCamera();
        const shaderFactory = new ShaderFactory(device.getTxtCache(), device.gl);
        const rendererFactory = new RendererFactory(device.gl, shaderFactory);
        const renderer = rendererFactory.createSpriteRenderer();
        device.viewportTo(ViewPortType.Full);
        renderer.render(camera, this.splashTextNode);
    }
    tick(): void {
        if (!this.preloading) {
            super.tick();
        }
    }
}