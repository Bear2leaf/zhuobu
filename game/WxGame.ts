import { ViewPortType } from "../device/Device";
import WxDevice from "../device/WxDevice.js";
import SplashText from "../drawobject/SplashText";
import CameraFactory from "../factory/CameraFactory";
import DrawObjectFactory from "../factory/DrawObjectFactory";
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
        device.gl.init();
        const deviceInfo = this.getDevice().getDeviceInfo();
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight);
        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const shaderFactory = new ShaderFactory(device.getTxtCache(), device.gl);
        const rendererFactory = new RendererFactory(device.gl, shaderFactory);
        const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTexture("test"), device.getFontCache());
        this.splashTextNode.addDrawObject(drawObjectFactory.createSplashText(textureFactory, device));
        this.splashTextNode.getDrawObjects().forEach((drawObject) => {
            drawObject.update(this.splashTextNode);
        });
        const camera = cameraFactory.createOrthoCamera();
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