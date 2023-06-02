import { OrthoCamera } from "../camera/OrthoCamera";
import { PerspectiveCamera } from "../camera/PerspectiveCamera";
import { ViewPortType } from "../device/Device";
import WxDevice from "../device/WxDevice.js";
import SplashText from "../drawobject/SplashText";
import CameraFactory from "../factory/CameraFactory";
import TextureFactory from "../factory/TextureFactory";
import SpriteRenderer from "../renderer/SpriteRenderer";
import { TriangleRenderer } from "../renderer/TriangleRenderer";
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

        await this.getDevice().loadShaderTxtCache("Sprite")
        await this.getDevice().loadFontCache("boxy_bold_font")
        this.init();
        await super.load();
        super.init();
        this.preloading = false;
    }
    init() {

        const deviceInfo = this.getDevice().getDeviceInfo();
        this.getDevice().gl.init();
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight);
    
        const textureFactory = new TextureFactory(this.getDevice().gl, this.getDevice().getImageCache());
        const fontTexture = textureFactory.createFontTexture();
        const fontInfo = this.getDevice().getFontCache().get("resource/font/boxy_bold_font.json");
        if (!fontInfo) {
            throw new Error("fontInfo is null");
        }
        this.splashTextNode.addDrawObject(new SplashText(this.getDevice().gl, fontInfo, fontTexture));
        this.splashTextNode.getDrawObjects().forEach((drawObject) => {
            drawObject.update(this.splashTextNode);
        });
        const camera = cameraFactory.createOrthoCamera();
        const renderer = new SpriteRenderer(this.getDevice().gl);
        this.getDevice().viewportTo(ViewPortType.Full);
        renderer.render(camera, this.splashTextNode);
    }
    tick(): void {
        if (!this.preloading) {
            super.tick();
        }
    }
}