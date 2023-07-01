// import { ViewPortType } from "../device/Device.js";
// import CameraFactory from "../factory/CameraFactory.js";
// import DrawObjectFactory from "../factory/DrawObjectFactory.js";
// import RendererFactory from "../factory/RendererFactory.js";
// import ShaderFactory from "../factory/ShaderFactory.js";
// import TextureFactory from "../factory/TextureFactory.js";
// import BrowserGame from "./BrowserGame.js";

// export default class BrowserSpriteGame extends BrowserGame {
//     async load() {
//         const device = this.getDevice();
//         await device.loadShaderTxtCache("Sprite")
//         await device.loadShaderTxtCache("Point")
//         await device.loadShaderTxtCache("VertexColorTriangle")
//         await device.loadShaderTxtCache("Line")
//         await device.loadShaderTxtCache("Mesh")
//         await device.loadFontCache("boxy_bold_font")
//         await device.loadImageCache("happy");
//         await device.loadImageCache("flowers");

//     }
//     init() {

//         const device = this.getDevice();
//         device.gl.init();
//         const deviceInfo = device.getDeviceInfo();
//         const textureFactory = new TextureFactory(device.gl, device.getImageCache());
//         const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTestTexture(), device.getFontCache());
//         const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
//         const shaderFactory = new ShaderFactory(device.getTxtCache(), device.gl);
//         const rendererFactory = new RendererFactory(device.gl, shaderFactory);
//         const fontTexture = textureFactory.createFontTexture();
//         const happyTexture = textureFactory.createTexture("happy");
//         const flowersTexture = textureFactory.createTexture("flowers");
//         const defaultSprite = drawObjectFactory.createSprite(200, 100, 5);
//         const happySprite = drawObjectFactory.createSprite(100, 0, 5, happyTexture);
//         const flowersSprite = drawObjectFactory.createSprite(0, 0, 0.7, flowersTexture);
//         this.initUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
//         this.getUISystem().setMainRenderer(rendererFactory.createMainRenderer())
//         this.getUISystem().addSprite(flowersSprite);
//         this.getUISystem().addSprite(defaultSprite);
//         this.getUISystem().addSprite(happySprite);
//     }
//     tick() {
//         this.tickClock();
//         const device = this.getDevice();
//         device.viewportTo(ViewPortType.Full)
//         this.getUISystem().update();
//         this.getUISystem().render(device.gl);
//         requestAnimationFrame(() => this.tick())
//     }

// }


import BrowserDevice from "../device/BrowserDevice.js";
import Game from "./Game.js";

export default class BrowserSpriteGame extends Game {
    constructor(el: HTMLElement) {
        super();
        this.setDevice(new BrowserDevice(el.appendChild(document.createElement("canvas"))))
    }
}