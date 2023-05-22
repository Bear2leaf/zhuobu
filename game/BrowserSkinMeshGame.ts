import { ViewPortType } from "../device/Device.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
import { Vec3 } from "../math/Vector.js";
import BrowserGame from "./BrowserGame.js";

export default class BrowserSkinMeshGame extends BrowserGame {
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
        await device.loadGLTFCache("whale.CYCLES");

    }
    init() {

        const device = this.getDevice();
        const deviceInfo = device.getDeviceInfo();

        const gltfCache = device.getGLTFCache();
        const bufferCache = device.getGLBCache();

        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const fontTexture = textureFactory.createTexture("boxy_bold_font");
        const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTexture("test"), device.getFontCache())
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
        const rendererFactory = new RendererFactory(device.gl, device.getTxtCache())
        const gltf = this.createGLTF(drawObjectFactory, textureFactory, gltfCache, bufferCache);
        this.setGLTFObj(gltf.createRootNode(device.gl));
        // this.initUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
        // this.initDebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
        const mainCamera = cameraFactory.createMainCamera();
        this.setMainCamera(mainCamera);
        const mainRenderer = rendererFactory.createMainRenderer();
        this.setMainRenderer(mainRenderer)
        this.initGLTFSkinMeshRenderer(rendererFactory);
        // this.getUISystem().setMainRenderer(mainRenderer)
        this.getMainCamera().getView()
    }
    tick(frame: number) {
        const device = this.getDevice();
        device.clearRenderer();
        // this.getMainCamera().rotateViewPerFrame(frame);
        // this.renderGltfObjs()
        // device.viewportTo(ViewPortType.LeftTop)
        // device.clearRenderer();
        // this.getDebugSystem().render(this.getGLTFObjRootNode(), this.getGLTFRenderer());
        device.viewportTo(ViewPortType.Full);


        this.getGLTFRenderer().render(this.getMainCamera(), this.getGLTFObjRootNode())
        // this.getUISystem().update(frame);
        // this.getUISystem().render(device.gl, device.now(), frame);
        requestAnimationFrame(() => this.tick(++frame))
    }

}