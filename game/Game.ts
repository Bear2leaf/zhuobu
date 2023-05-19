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

export default abstract class Game {
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

  setUISystem(happySpriteTexture: Texture, fontTexture: Texture) {
    if (!this.cameraFactory) {
      throw new Error("cameraFactory is not set");
    }
    if (!this.drawObjectFactory) {
      throw new Error("drawObjectFactory is not set");
    }
    if (!this.rendererFactory) {
      throw new Error("rendererFactory is not set");
    }

    this.uiSystem = new UISystem(happySpriteTexture, fontTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), this.cameraFactory, this.rendererFactory, this.drawObjectFactory);
  }


  setCameraFactory(cameraFactory: CameraFactory) {
    this.cameraFactory = cameraFactory;
  }
  setDrawObjectFactory(drawObjectFactory: DrawObjectFactory) {
    this.drawObjectFactory = drawObjectFactory;
  }
  setRendererFactory(rendererFactory: RendererFactory) {
    this.rendererFactory = rendererFactory;
  }

  async load() {
    await this.device.loadShaderTxtCache("Sprite")
    await this.device.loadShaderTxtCache("Point")
    await this.device.loadShaderTxtCache("VertexColorTriangle")
    await this.device.loadShaderTxtCache("Line")
    await this.device.loadShaderTxtCache("Mesh")
    await this.device.loadFontCache("boxy_bold_font")
    await this.device.loadImage("resource/sprite/happy.png");
    await this.device.loadImage("resource/texture/test.png");
    await this.device.loadSubpackage()

    await this.device.loadGLTFCache("hello")
    await this.device.loadGLTFCache("hello-multi")
    await this.device.loadGLTFCache("whale.CYCLES");
  }
  init() {
    const deviceInfo = this.device.getDeviceInfo();
    this.cameraFactory = new CameraFactory(deviceInfo.windowWidth, deviceInfo.windowHeight);
    const defaultTexture = new Texture(this.device.gl);
    const textureImage = this.device.getImageCache().get("resource/texture/test.png");
    if (!textureImage) {
      throw new Error("textureImage not exist")
    }
    defaultTexture.generate(deviceInfo, textureImage);
    this.drawObjectFactory = new DrawObjectFactory(this.device.gl, defaultTexture);
    this.rendererFactory = new RendererFactory(this.device.gl, this.device.getTxtCache(), this.device.getFontCache());
    const textTexture = new Texture(this.device.gl);
    const fontImage = this.device.getImageCache().get("resource/font/boxy_bold_font.png");
    if (!fontImage) {
      throw new Error("fontImage not exist")
    }
    textTexture.generate(deviceInfo, fontImage);

    const happySpriteTexture = new Texture(this.device.gl);
    const happyImage = this.device.getImageCache().get("resource/sprite/happy.png");
    if (!happyImage) {
      throw new Error("happyImage not exist")
    }

    happySpriteTexture.generate(deviceInfo, happyImage);

    this.uiSystem = new UISystem(happySpriteTexture, textTexture, this.device.onTouchStart.bind(this.device), this.device.onTouchMove.bind(this.device), this.device.onTouchEnd.bind(this.device), this.device.onTouchCancel.bind(this.device), this.cameraFactory, this.rendererFactory, this.drawObjectFactory)
    this.debugSystem = new DebugSystem(this.cameraFactory, this.rendererFactory, this.drawObjectFactory);
    this.msgDispatcher = new MsgDispatcher();
    this.uiSystem.render(this.device.gl, 0, 0)
    const gltfCache = this.device.getGltfCache();
    const bufferCache = this.device.getGlbCache();
    this.gltf = new GLTF(this.drawObjectFactory, gltfCache, bufferCache);
    // this.msgDispatcher && this.device.createWorker("static/worker/nethack.js", this.msgDispatcher.operation.bind(this.msgDispatcher));
    this.device.gl.enable(this.device.gl.CULL_FACE)
    this.device.gl.enable(this.device.gl.DEPTH_TEST)
    this.device.gl.enable(this.device.gl.SCISSOR_TEST)

    defaultTexture.generate(this.device.getDeviceInfo(), textureImage);
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