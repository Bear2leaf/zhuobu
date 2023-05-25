import { ViewPortType } from "../device/Device.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
import BrowserGame from "./BrowserGame.js";

export default class BrowserMeshGame extends BrowserGame {
    async load() {
        const device = this.getDevice();
        await device.loadShaderTxtCache("Sprite")
        await device.loadShaderTxtCache("Point")
        await device.loadShaderTxtCache("VertexColorTriangle")
        await device.loadShaderTxtCache("Mesh")
        await device.loadShaderTxtCache("Line")
        await device.loadShaderTxtCache("SkinMesh")
        await device.loadFontCache("boxy_bold_font")
        await device.loadImageCache("boxy_bold_font")
        await device.loadImageCache("test");
        await device.loadGLTFCache("hello")
        await device.loadGLTFCache("whale.CYCLES");
        await device.loadGLTFCache("hello-multi");

    }
    init() {

        const device = this.getDevice();
        const deviceInfo = device.getDeviceInfo();

        device.gl.init();
        const gltfCache = device.getGLTFCache();
        const bufferCache = device.getGLBCache();
        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const fontTexture = textureFactory.createTexture("boxy_bold_font");
        const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTexture("test"), device.getFontCache())
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
        const rendererFactory = new RendererFactory(device.gl, device.getTxtCache())
        const gltf = this.createGLTF(drawObjectFactory, textureFactory, gltfCache, bufferCache, "hello-multi");
        this.setGLTFObj(gltf.createRootNode());
        console.log(this.getGLTFObjRootNode())
        this.initUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
        this.initDebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
        const mainCamera = cameraFactory.createMainCamera();
        this.setMainCamera(mainCamera);
        const mainRenderer = rendererFactory.createMainRenderer();
        this.setMainRenderer(mainRenderer)
        this.initGltfMeshRenderer(rendererFactory);
        this.getUISystem().setMainRenderer(mainRenderer)
    }
    tick() {
        this.tickClock();
        const device = this.getDevice();
        const mainCamera = this.getMainCamera();
        mainCamera.rotateViewPerFrame(this.getFrames());
        const gltfRoot = this.getGLTFObjRootNode();
        gltfRoot.updateWorldMatrix()
        device.viewportTo(ViewPortType.Full);
        this.getGLTFRenderer().render(this.getMainCamera(), gltfRoot)
        this.getUISystem().update();
        this.getUISystem().render(device.gl);
        device.viewportTo(ViewPortType.TopRight)
        this.getDebugSystem().renderCamera(mainCamera);
        this.getDebugSystem().render(gltfRoot, this.getGLTFRenderer());
        requestAnimationFrame(() => this.tick())
    }

}