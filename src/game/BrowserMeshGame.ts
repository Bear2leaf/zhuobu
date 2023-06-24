// import { ViewPortType } from "../device/Device.js";
// import CameraFactory from "../factory/CameraFactory.js";
// import DrawObjectFactory from "../factory/DrawObjectFactory.js";
// import RendererFactory from "../factory/RendererFactory.js";
// import ShaderFactory from "../factory/ShaderFactory.js";
// import TextureFactory from "../factory/TextureFactory.js";
// import BrowserGame from "./BrowserGame.js";

// export default class BrowserMeshGame extends BrowserGame {
//     async load() {
//         const device = this.getDevice();
//         await device.loadShaderTxtCache("Sprite")
//         await device.loadShaderTxtCache("Point")
//         await device.loadShaderTxtCache("VertexColorTriangle")
//         await device.loadShaderTxtCache("Mesh")
//         await device.loadShaderTxtCache("Line")
//         await device.loadShaderTxtCache("SkinMesh")
//         await device.loadFontCache("boxy_bold_font")
//         await device.loadGLTFCache("hello")
//         await device.loadGLTFCache("whale.CYCLES");
//         await device.loadGLTFCache("hello-multi");

//     }
//     init() {

//         const device = this.getDevice();
//         device.gl.init();
//         const deviceInfo = device.getDeviceInfo();

//         const textureFactory = new TextureFactory(device.gl, device.getImageCache());
//         const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTestTexture(), device.getFontCache())
//         const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
//         const shaderFactory = new ShaderFactory(device.getTxtCache(), device.gl);
//         const rendererFactory = new RendererFactory(device.gl, shaderFactory);

//         const gltf = this.createGLTF(drawObjectFactory, textureFactory, "hello-multi");
//         this.setGLTFObj(gltf.createRootNode());
//         const fontTexture = textureFactory.createFontTexture();
//         this.initUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
//         this.initDebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
//         const mainCamera = cameraFactory.createMainCamera();
//         this.setMainCamera(mainCamera);
//         const mainRenderer = rendererFactory.createMainRenderer();
//         this.setMainRenderer(mainRenderer)
//         this.initGltfMeshRenderer(rendererFactory);
//         this.getUISystem().setMainRenderer(mainRenderer)
//     }
//     tick() {
//         this.tickClock();
//         const device = this.getDevice();
//         const mainCamera = this.getMainCamera();
//         mainCamera.rotateViewPerFrame(this.getFrames());
//         const gltfRoot = this.getGLTFObjRootNode();
//         gltfRoot.updateWorldMatrix()
//         device.viewportTo(ViewPortType.Full);
//         this.getGLTFRenderer().render(this.getMainCamera(), gltfRoot)
//         this.getUISystem().update();
//         this.getUISystem().render(device.gl);
//         device.viewportTo(ViewPortType.TopRight)
//         this.getDebugSystem().renderCamera(mainCamera);
//         this.getDebugSystem().render(gltfRoot, this.getGLTFRenderer());
//         requestAnimationFrame(() => this.tick())
//     }

// }


import BrowserDevice from "../device/BrowserDevice.js";
import AGame from "./AGame.js";

export default class BrowserMeshGame extends AGame {
    constructor(el: HTMLElement) {
        super(new BrowserDevice(el.appendChild(document.createElement("canvas"))));
    }
}