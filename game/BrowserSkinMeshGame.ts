import { ViewPortType } from "../device/Device.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import TextureFactory from "../factory/TextureFactory.js";
import Matrix from "../math/Matrix.js";
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

        device.gl.enable(device.gl.CULL_FACE)
        device.gl.enable(device.gl.DEPTH_TEST)
        device.gl.enable(device.gl.SCISSOR_TEST)
        const gltfCache = device.getGLTFCache();
        const bufferCache = device.getGLBCache();
        const textureFactory = new TextureFactory(device.gl, device.getImageCache());
        const fontTexture = textureFactory.createTexture("boxy_bold_font");
        const drawObjectFactory = new DrawObjectFactory(device.gl, textureFactory.createTexture("test"), device.getFontCache())
        const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight)
        const rendererFactory = new RendererFactory(device.gl, device.getTxtCache())
        const gltf = this.createGLTF(drawObjectFactory, textureFactory, gltfCache, bufferCache);
        this.setGLTFObj(gltf.createRootNode());
        this.initUISystem(cameraFactory, rendererFactory, drawObjectFactory, fontTexture);
        this.initDebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
        const mainCamera = cameraFactory.createMainCamera();
        this.setMainCamera(mainCamera);
        const mainRenderer = rendererFactory.createMainRenderer();
        this.setMainRenderer(mainRenderer)
        this.initGLTFSkinMeshRenderer(rendererFactory);
        this.getUISystem().setMainRenderer(mainRenderer)
    }
    tick(frame: number) {
        const device = this.getDevice();
        const mainCamera = this.getMainCamera();
        mainCamera.rotateViewPerFrame(frame);
        const gltfRoot = this.getGLTFObjRootNode();
        gltfRoot.updateWorldMatrix(Matrix.translation(new Vec3(0, 0, 10)))
        device.clearRenderer();
        this.getGLTFRenderer().render(this.getMainCamera(), gltfRoot)
        device.viewportTo(ViewPortType.TopRight)
        device.clearRenderer();
        this.getDebugSystem().renderCamera(mainCamera);
        this.getDebugSystem().render(gltfRoot, this.getGLTFRenderer());
        device.viewportTo(ViewPortType.Full);
        this.getUISystem().update(device.now(), frame);
        this.getUISystem().render(device.gl);
        requestAnimationFrame(() => this.tick(++frame))
    }

}