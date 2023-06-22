import DebugSystem from "../system/DebugSystem.js";
import UISystem from "../system/UISystem.js";
import GLTF from "../loader/gltf/GLTF.js";
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
import Matrix from "../math/Matrix.js";
import { Vec3 } from "../math/Vector.js";
import Clock from "../clock/Clock.js";
import ShaderFactory from "../factory/ShaderFactory.js";

export default abstract class BaseGame {
  private debugSystem?: DebugSystem;
  private uiSystem?: UISystem;
  private mainCamera?: PerspectiveCamera;
  private mainRenderer?: TriangleRenderer;
  private gasket?: Node;
  private cube?: Node;
  private gltfRootNode?: Node;
  private gltfRenderer?: Renderer;
  private readonly device: Device;
  private readonly clock: Clock;
  constructor(device: Device) {
    this.device = device;
    this.clock = new Clock(device);
    this.load().then(() => {
      this.init();
      this.tick();
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

    this.uiSystem = new UISystem(this.clock, fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), cameraFactory, rendererFactory, drawObjectFactory);
  }
  initDebugSystem(cameraFactory: CameraFactory, rendererFactory: RendererFactory, drawObjectFactory: DrawObjectFactory) {

    this.debugSystem = new DebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
  }

  createGLTF(drawObjectFactory: DrawObjectFactory, textureFactory: TextureFactory, name?: string) {
    if (!name) {
      name = "hello";
    }
    return new GLTF(name, drawObjectFactory, textureFactory, this.device.getGLTFCache(), this.device.getGLBCache());
  }
  getFrames() {
    return this.clock.getFrames();
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
    await this.device.loadShaderTxtCache("SkinMesh")
    await this.device.loadFontCache("boxy_bold_font")
    await this.device.loadSubpackage()
    await this.device.loadImageCache("happy");

    await this.device.loadGLTFCache("hello")
    await this.device.loadGLTFCache("hello-multi")
    await this.device.loadGLTFCache("whale.CYCLES");
  }
  init() {
    this.device.gl.init();
    const deviceInfo = this.device.getDeviceInfo();
    const cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight);
    const textureFactory = new TextureFactory(this.device.gl, this.device.getImageCache());
    const drawObjectFactory = new DrawObjectFactory(this.device.gl, textureFactory.createTestTexture(), this.device.getFontCache());
    const shaderFactory = new ShaderFactory(this.device.getTxtCache(), this.device.gl);
    const rendererFactory = new RendererFactory(this.device.gl, shaderFactory);

    const fontTexture = textureFactory.createFontTexture();
    this.uiSystem = new UISystem(this.clock, fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), cameraFactory, rendererFactory, drawObjectFactory)
    this.debugSystem = new DebugSystem(cameraFactory, rendererFactory, drawObjectFactory);
    const gltf = this.createGLTF(drawObjectFactory, textureFactory, "whale.CYCLES");


    this.setMainCamera(cameraFactory.createMainCamera());
    this.initGLTFSkinMeshRenderer(rendererFactory);
    this.mainRenderer = rendererFactory.createMainRenderer();
    this.gasket = drawObjectFactory.createGasket();
    this.cube = drawObjectFactory.createTexturedCube();
    this.setGLTFObj(gltf.createRootNode());
    this.uiSystem.setMainRenderer(this.mainRenderer);

  }
  tickClock() {
    this.clock.tick()
  }
  tick() {
    if (!this.mainCamera) {
      throw new Error("mainCamera is not initialized");
    }
    if (!this.mainRenderer) {
      throw new Error("mainRenderer is not initialized");
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
    if (!this.gasket) {
      throw new Error("gasket is not initialized");
    }
    this.tickClock();
    this.gasket.getDrawObjects().forEach((drawObject) => {
      drawObject.update(this.gasket!);
    });
    this.cube.getDrawObjects().forEach((drawObject) => {
      drawObject.update(this.cube!);
    });
    this.gltfRootNode.updateWorldMatrix(Matrix.translation(new Vec3(0, 0, 10)))
    this.mainCamera.rotateViewPerFrame(this.getFrames());
    this.device.viewportTo(ViewPortType.Full)
    this.mainRenderer.render(this.mainCamera, this.gasket);
    this.mainRenderer.render(this.mainCamera, this.cube);
    this.gltfRenderer.render(this.mainCamera, this.gltfRootNode);
    this.getUISystem().update();
    this.getUISystem().render(this.device.gl);
    this.device.viewportTo(ViewPortType.TopRight)
    this.debugSystem.renderCamera(this.mainCamera);
    this.debugSystem.render(this.gasket, this.mainRenderer)
    this.debugSystem.render(this.cube, this.mainRenderer);
    this.debugSystem.render(this.gltfRootNode, this.gltfRenderer);
    requestAnimationFrame(() => this.tick())
  }
}