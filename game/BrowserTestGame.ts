import { ViewPortType } from "../device/Device.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
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
        await device.loadImageCache("boxy_bold_font")
        await device.loadImageCache("test");

    }
    init() {

        const device = this.getDevice();
        const deviceInfo = device.getDeviceInfo();

    
        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const fontTexture = textureFactory.createTexture("boxy_bold_font");
        const drawObjectFactory =  new DrawObjectFactory(device.gl, textureFactory.createTexture("test"))
        const cameraFactory= new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
        const rendererFactory = new RendererFactory(device.gl, device.getTxtCache(), device.getFontCache())
        this.createUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
        this.getUISystem().setMainRenderer(rendererFactory.createMainRenderer())
    }
    tick(frame: number) {
        const device = this.getDevice();
        device.clearRenderer();
        device.viewportTo(ViewPortType.Full)
        this.getUISystem().render(device.gl, device.now(), frame);
        requestAnimationFrame(() => this.tick(++frame))
    }

}