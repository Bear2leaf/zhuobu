import DebugSystem from "../system/DebugSystem.js";
import UISystem from "../system/UISystem.js";
import GLTF from "../loader/gltf/GLTF.js";
import MsgDispatcher from "../handler/MsgDispatcher.js";
import CameraFactory from "../factory/CameraFactory.js";
import DrawObjectFactory from "../factory/DrawObjectFactory.js";
import RendererFactory from "../factory/RendererFactory.js";
import { PerspectiveCamera } from "../camera/PerspectiveCamera.js";
import { TriangleRenderer } from "../renderer/TriangleRenderer.js";
import Device, { ViewPortType } from "../device/Device.js";
import Texture from "../texture/Texture.js";
import TextureFactory from "../factory/TextureFactory.js";
import Renderer from "../renderer/Renderer.js";
import Node from "../structure/Node.js";

export default abstract class BaseGame {
  private debugSystem?: DebugSystem;
  private uiSystem?: UISystem;
  private msgDispatcher?: MsgDispatcher;
  private mainCamera?: PerspectiveCamera;
  private mainRenderer?: TriangleRenderer;
  private gasket?: Node;
  private cube?: Node;
  private gltfRootNode?: Node;
  private gltfRenderer?: Renderer;
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
  getDebugSystem() {
    if (!this.debugSystem) {
      throw new Error("debugSystem is not set");
    }
    return this.debugSystem;
  }
  getMainRenderer() {
    if (!this.mainRenderer) {
      throw new Error("mainRenderer is not set");
    }
    return this.mainRenderer;
  }
  setMainRenderer(mainRenderer: TriangleRenderer) {
    this.mainRenderer = mainRenderer;
  }
  getGLTFObjRootNode() {
    if (!this.gltfRootNode) {
      throw new Error("gltfRootNode is not set");
    }
    return this.gltfRootNode;
  }
  getMainCamera() {
    if (!this.mainCamera) {
      throw new Error("mainCamera is not set");
    }
    return this.mainCamera;
  }
  setMainCamera(mainCamera: PerspectiveCamera) {
    this.mainCamera = mainCamera;
  }
  initGLTFSkinMeshRenderer(rendererFactory: RendererFactory) {
    this.gltfRenderer = rendererFactory.createGLTFSkinMeshRenderer();
  }
  getGLTFRenderer() {
    if (!this.gltfRenderer) {
      throw new Error("gltfRenderer is not set");
    }
    return this.gltfRenderer;
  }
  initGltfMeshRenderer(rendererFactory: RendererFactory) {
    this.gltfRenderer = rendererFactory.createGLTFMeshRenderer();
  }

  initUISystem(cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory, fontTexture: Texture) {

    this.uiSystem = new UISystem(fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), cameraFactory, rendererFactory, drawObjectFactory);
  }
  initDebugSystem(cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory) {

    this.debugSystem = new DebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
  }

  createGLTF(drawObjectFactory: DrawObjectFactory, textureFactory: TextureFactory, gltfCache: Map<string, GLTF>, bufferCache: Map<string, ArrayBuffer>) {

    return new GLTF(drawObjectFactory, textureFactory, gltfCache, bufferCache);
  }

  setGLTFObj(obj: Node) {
    this.gltfRootNode = obj;
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

    const drawObjectFactory = new DrawObjectFactory(this.device.gl, textureFactory.createTexture("test"), this.device.getFontCache());

    const rendererFactory = new RendererFactory(this.device.gl, this.device.getTxtCache());
    this.uiSystem = new UISystem(fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), cameraFactory, rendererFactory, drawObjectFactory)
    this.debugSystem = new DebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
    this.msgDispatcher = new MsgDispatcher();
    const gltfCache = this.device.getGLTFCache();
    const bufferCache = this.device.getGLBCache();
    const gltf = this.createGLTF(drawObjectFactory, textureFactory, gltfCache, bufferCache);
    // this.msgDispatcher && this.device.createWorker("static/worker/nethack.js", this.msgDispatcher.operation.bind(this.msgDispatcher));
    this.device.gl.enable(this.device.gl.CULL_FACE)
    this.device.gl.enable(this.device.gl.DEPTH_TEST)
    this.device.gl.enable(this.device.gl.SCISSOR_TEST)

    this.setMainCamera(cameraFactory.createMainCamera());
    this.initGltfMeshRenderer(rendererFactory);
    this.mainRenderer = rendererFactory.createMainRenderer();
    this.gasket = drawObjectFactory.createGasket();
    this.cube = drawObjectFactory.createTexturedCube();
    this.setGLTFObj(gltf.createRootNode());
    this.uiSystem.setMainRenderer(this.mainRenderer);

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
    if (!this.gltfRootNode) {
      throw new Error("gltfObj is not initialized");
    }
    if (!this.gltfRenderer) {
      throw new Error("gltfRenderer is not initialized");
    }

    this.device.clearRenderer();
    this.gasket.getDrawObjects().forEach((drawObject) => {
      drawObject.update(this.gasket!);
    });
    this.cube.getDrawObjects().forEach((drawObject) => {
      drawObject.update(this.cube!);
    });
    this.mainCamera.rotateViewPerFrame(frame);
    this.mainRenderer.render(this.mainCamera, this.gasket);
    this.mainRenderer.render(this.mainCamera, this.cube);
    this.gltfRenderer.render(this.mainCamera, this.gltfRootNode);
    this.device.viewportTo(ViewPortType.TopRight)
    this.device.clearRenderer();
    this.debugSystem.renderCamera(this.mainCamera);
    this.debugSystem.render(this.gasket, this.mainRenderer)
    this.debugSystem.render(this.cube, this.mainRenderer);
    this.debugSystem.render(this.gltfRootNode, this.gltfRenderer);
    this.device.viewportTo(ViewPortType.Full)
    this.getUISystem().update(this.device.now(), frame);
    this.getUISystem().render(this.device.gl);
    requestAnimationFrame(() => this.tick(++frame))
  }
}