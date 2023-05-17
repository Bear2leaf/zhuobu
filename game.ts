import device, { loadFontCache, loadGLTFCache, loadImage, loadShaderTxtCache } from "./device/Device.js";
import DebugSystem from "./system/DebugSystem.js";
import UISystem from "./system/UISystem.js";
import GLTF from "./loader/gltf/GLTF.js";
import MsgDispatcher from "./handler/MsgDispatcher.js";
import CameraFactory from "./factory/CameraFactory.js";
import DrawObjectFactory from "./factory/DrawObjectFactory.js";
import RendererFactory from "./factory/RendererFactory.js";
import { PerspectiveCamera } from "./camera/PerspectiveCamera.js";
import DrawObject from "./drawobject/DrawObject.js";
import Gasket from "./drawobject/Gasket.js";
import TexturedCube from "./drawobject/TexturedCube.js";
import MeshRenderer from "./renderer/MeshRenderer.js";
import { TriangleRenderer } from "./renderer/TriangleRenderer.js";

class Game {
  private debugSystem?: DebugSystem;
  private uiSystem?: UISystem;
  private msgDispatcher?: MsgDispatcher;
  private cameraFactory?: CameraFactory;
  private drawObjectFactory?: DrawObjectFactory;
  private rendererFactory?: RendererFactory;
  private gltf?: GLTF;
  private mainCamera?: PerspectiveCamera;
  private mainRenderer?: TriangleRenderer;
  private gasket?: Gasket;
  private cube?: TexturedCube;
  private gltfObjs?: DrawObject[];
  private gltfRenderer?: MeshRenderer;
  async preload() {

    await loadShaderTxtCache("Sprite")
    await loadShaderTxtCache("Point")
    await loadShaderTxtCache("VertexColorTriangle")
    await loadShaderTxtCache("Line")
    await loadShaderTxtCache("Mesh")
    await loadFontCache("boxy_bold_font")
    await loadImage("resource/sprite/happy.png");
    await loadImage("resource/texture/test.png");
    this.cameraFactory = new CameraFactory();
    this.drawObjectFactory = new DrawObjectFactory();
    this.rendererFactory = new RendererFactory();
    this.uiSystem = new UISystem(this.cameraFactory, this.rendererFactory, this.drawObjectFactory)
    this.debugSystem = new DebugSystem(this.cameraFactory, this.rendererFactory, this.drawObjectFactory);
    this.msgDispatcher = new MsgDispatcher();
    this.uiSystem.render(0)
  }
  async load() {
    if (!this.drawObjectFactory) {
      throw new Error("drawObjectFactory is not initialized");
    }
    if (!this.rendererFactory) {
      throw new Error("rendererFactory is not initialized");
    }
    if (!this.cameraFactory) {
      throw new Error("cameraFactory is not initialized");
    }
    await device.loadSubpackage()

    await loadGLTFCache("hello")
    await loadGLTFCache("hello-multi")
    await loadGLTFCache("whale.CYCLES");
    this.gltf = new GLTF(this.drawObjectFactory);
    // this.msgDispatcher && device.createWorker("static/worker/nethack.js", this.msgDispatcher.operation.bind(this.msgDispatcher));
    device.gl.enable(device.gl.CULL_FACE)
    device.gl.enable(device.gl.DEPTH_TEST)
    device.gl.enable(device.gl.SCISSOR_TEST)

    this.mainCamera = this.cameraFactory.createMainCameraSingleton()
    this.mainRenderer = this.rendererFactory.createMainRendererSingleton();
    this.gasket = this.drawObjectFactory.createGasket();
    this.cube = this.drawObjectFactory.createTexturedCube();
    this.gltfObjs = this.gltf.createDrawObjects();
    this.gltfRenderer = this.rendererFactory.createGLTFMeshRenderer();

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
      throw new Error("cube3 is not initialized");
    }
    if (!this.debugSystem) {
      throw new Error("debugSystem5 is not initialized");
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

    device.clearRenderer();
    this.gasket.rotatePerFrame(frame);
    this.cube.rotatePerFrame(frame);
    this.mainCamera.rotateViewPerFrame(frame);
    this.mainRenderer.render(this.mainCamera, this.gasket);
    this.mainRenderer.render(this.mainCamera, this.cube);
    this.gltfObjs.forEach(gltfObj => this.mainCamera && this.gltfRenderer && this.gltfRenderer.render(this.mainCamera, gltfObj));
    this.debugSystem.renderCamera(this.mainCamera);
    this.debugSystem.render(this.gasket, this.mainRenderer)
    this.debugSystem.render(this.cube, this.mainRenderer);
    this.gltfObjs.forEach(gltfObj => this.debugSystem && this.gltfRenderer && this.debugSystem.render(gltfObj, this.gltfRenderer));
    this.uiSystem.render(frame);
    requestAnimationFrame(() => this.tick(++frame))
  }
}

if (device.isWx()) {
  const game = new Game();
  game.preload().then(() => game.load()).then(() => game.tick(0));
}