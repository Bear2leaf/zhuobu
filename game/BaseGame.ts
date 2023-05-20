import DebugSystem from "../system/DebugSystem.js";
import UISystem from "../system/UISystem.js";
import GLTF from "../loader/gltf/GLTF.js";
import MsgDispatcher from "../handler/MsgDispatcher.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import DrawObject from "../drawobject/DrawObject.js";
import Gasket from "../drawobject/Gasket.js";
import TexturedCube from "../drawobject/TexturedCube.js";
import MeshRenderer from "../renderer/MeshRenderer.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import Device, { ViewPortType } from "../device/Device.js";
import Texture from "../texture/Texture.js";
import TextureFactory from "../factory/TextureFactory.js";

export default abstract class BaseGame {
  private debugSystem?: DebugSystem;
  private uiSystem?: UISystem;
  private msgDispatcher?: MsgDispatcher;
  private gltf?: GLTF;
  private mainCamera?: PerspectiveCamera;
  private mainRenderer?: TriangleRenderer;
  private gasket?: Gasket;
  private cube?: TexturedCube;
  private gltfObjs?: DrawObject[];
  private gltfRenderer?: MeshRenderer;
  private readonly device: Device;
  constructor(device: Device) {
    this.device = device;
    this.load().then(() => {
      this.init();
      this.tick(0);
    });
  }

  getDevice() {
    return this.device;
  }
  getUISystem() {
    if (!this.uiSystem) {
      throw new Error("uiSystem is not set");
    }
    return this.uiSystem;
  }

  createUISystem(cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory, fontTexture: Texture) {

    this.uiSystem = new UISystem(fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), cameraFactory, rendererFactory, drawObjectFactory);
  }



  async load() {
    await this.device.loadShaderTxtCache("Sprite")
    await this.device.loadShaderTxtCache("Point")
    await this.device.loadShaderTxtCache("VertexColorTriangle")
    await this.device.loadShaderTxtCache("Line")
    await this.device.loadShaderTxtCache("Mesh")
    await this.device.loadFontCache("boxy_bold_font")
    await this.device.loadImageCache("boxy_bold_font")
    await this.device.loadImageCache("happy");
    await this.device.loadImageCache("test");
    await this.device.loadSubpackage()

    await this.device.loadGLTFCache("hello")
    await this.device.loadGLTFCache("hello-multi")
    await this.device.loadGLTFCache("whale.CYCLES");
  }
  init() {
    const deviceInfo = this.device.getDeviceInfo();
    const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight);

    const textureFactory = new TextureFactory(this.device.gl, this.device.getImageCache());
    const fontTexture = textureFactory.createTexture("boxy_bold_font");

    const drawObjectFactory = new DrawObjectFactory(this.device.gl, textureFactory.createTexture("test"));

    const rendererFactory = new RendererFactory(this.device.gl, this.device.getTxtCache(), this.device.getFontCache());
    this.uiSystem = new UISystem(fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), cameraFactory, rendererFactory, drawObjectFactory)
    this.debugSystem = new DebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
    this.msgDispatcher = new MsgDispatcher();
    const gltfCache = this.device.getGltfCache();
    const bufferCache = this.device.getGlbCache();
    this.gltf = new GLTF(drawObjectFactory, gltfCache, bufferCache);
    // this.msgDispatcher && this.device.createWorker("static/worker/nethack.js", this.msgDispatcher.operation.bind(this.msgDispatcher));
    this.device.gl.enable(this.device.gl.CULL_FACE)
    this.device.gl.enable(this.device.gl.DEPTH_TEST)
    this.device.gl.enable(this.device.gl.SCISSOR_TEST)

    this.mainCamera = cameraFactory.createMainCameraSingleton()
    this.mainRenderer = rendererFactory.createMainRenderer();
    this.gasket = drawObjectFactory.createGasket();
    this.cube = drawObjectFactory.createTexturedCube();
    this.gltfObjs = this.gltf.createDrawObjects();
    this.gltfRenderer = rendererFactory.createGLTFMeshRenderer();
    this.uiSystem.setMainRenderer(this.mainRenderer);
    this.uiSystem.render(this.device.gl, 0, 0)

  }
  tick(frame: number) {
    if (!this.mainCamera) {
      throw new Error("mainCamera is not initialized");
    }
    if (!this.mainRenderer) {
      throw new Error("mainRenderer is not initialized");
    }
    if (!this.gasket) {
      throw new Error("gasket is not initialized");
    }
    if (!this.cube) {
      throw new Error("cube is not initialized");
    }
    if (!this.debugSystem) {
      throw new Error("debugSystem is not initialized");
    }
    if (!this.uiSystem) {
      throw new Error("uiSystem is not initialized");
    }
    if (!this.gltfObjs) {
      throw new Error("gltfObjs is not initialized");
    }
    if (!this.gltfRenderer) {
      throw new Error("gltfRenderer is not initialized");
    }

    this.device.clearRenderer();
    this.gasket.rotatePerFrame(frame);
    this.cube.rotatePerFrame(frame);
    this.mainCamera.rotateViewPerFrame(frame);
    this.mainRenderer.render(this.mainCamera, this.gasket);
    this.mainRenderer.render(this.mainCamera, this.cube);
    this.gltfObjs.forEach(gltfObj => this.mainCamera && this.gltfRenderer && this.gltfRenderer.render(this.mainCamera, gltfObj));

    this.device.viewportTo(ViewPortType.TopRight)
    this.device.clearRenderer();
    this.debugSystem.renderCamera(this.mainCamera);
    this.debugSystem.render(this.gasket, this.mainRenderer)
    this.debugSystem.render(this.cube, this.mainRenderer);
    this.gltfObjs.forEach(gltfObj => this.debugSystem && this.gltfRenderer && this.debugSystem.render(gltfObj, this.gltfRenderer));

    this.device.viewportTo(ViewPortType.Full)
    this.uiSystem.render(this.device.gl, this.device.now(), frame);
    requestAnimationFrame(() => this.tick(++frame))
  }
}