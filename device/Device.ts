import GLTF from "../loader/gltf/GLTF.js";
import { FontInfo } from "../renderer/TextRenderer.js";

export type DeviceInfo = { windowWidth: number; windowHeight: number; pixelRatio: number; }

export type TouchInfoFunction = (info?: { x: number, y: number }) => void
export enum ViewPortType {
    Full,
    TopRight
}
export default abstract class Device {
  private readonly glContext: WebGL2RenderingContext;
  private readonly imageCache: Map<string, HTMLImageElement>;
  private readonly txtCache: Map<string, string>;
  private readonly fontCache: Map<string, import("../renderer/TextRenderer").FontInfo>;
  private readonly gltfCache: Map<string, GLTF>;
  private readonly glbCache: Map<string, ArrayBuffer>;
  private readonly performance: Performance;
  private readonly deviceInfo: DeviceInfo;
  constructor(canvas?: string | HTMLCanvasElement) {

    this.glContext = this.createCanvas(canvas).getContext('webgl2') as WebGL2RenderingContext;
    this.imageCache = new Map();
    this.txtCache = new Map();
    this.fontCache = new Map();
    this.gltfCache = new Map();
    this.glbCache = new Map();
    this.deviceInfo = this.getDeviceInfo();
    this.performance = this.getPerformance();
    if (typeof document !== 'undefined') {
      this.deviceInfo.pixelRatio = 1;
    }
  }
  get gl(): WebGL2RenderingContext {
    return this.glContext;
  }
  abstract getDeviceInfo(): DeviceInfo;
  abstract getPerformance(): Performance;
  getImageCache(): Map<string, HTMLImageElement> {
    return this.imageCache;
  }
  getTxtCache(): Map<string, string> {
    return this.txtCache;
  }
  getFontCache(): Map<string, FontInfo> {
    return this.fontCache;
  }
  getGltfCache(): Map<string, GLTF> {
    return this.gltfCache;
  }
  getGlbCache(): Map<string, ArrayBuffer> {
    return this.glbCache;
  }
  clearRenderer() { this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT); }
  viewportTo(this: Device, type: ViewPortType): void {
    const { windowWidth, windowHeight, pixelRatio } = this.deviceInfo;
    const leftWidth = windowWidth * (2 / 3) * pixelRatio
    const rightWidth = windowWidth * (1 / 3) * pixelRatio;
    const leftHeight = windowHeight * (2 / 3) * pixelRatio
    const rightHeight = windowHeight * (1 / 3) * pixelRatio;
    switch (type) {
      case ViewPortType.TopRight:
        this.gl.viewport(leftWidth, leftHeight, rightWidth, rightHeight);
        this.gl.scissor(leftWidth, leftHeight, rightWidth, rightHeight);
        this.gl.clearColor(0.4, 0.4, 0.4, 1)
        break;

      default:
        this.gl.viewport(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
        this.gl.scissor(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
        this.gl.clearColor(0.3, 0.3, 0.3, 1)
        break;
    }
  }
  now(): number {
    return this.performance.now() / (typeof document !== 'undefined' ? 1 : 1000);
  }
  async loadImage(url: string) {
    const img = this.createImage() as HTMLImageElement;
    img.src = url;
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    this.getImageCache().set(url, img);
  }
  
  async loadGLTFCache(name: string) {
    this.getGltfCache().set(`static/gltf/${name}.gltf`, await this.readJson(`static/gltf/${name}.gltf`) as GLTF)
    this.getGlbCache().set(`static/gltf/${name}.bin`, await this.readBuffer(`static/gltf/${name}.bin`))
  }
  async loadFontCache(name: string) {
    this.getFontCache().set(`resource/font/${name}.json`, await this.readJson(`resource/font/${name}.json`) as FontInfo)
    await this.loadImage(`resource/font/${name}.png`)
  }
  
  async loadShaderTxtCache(name: string) {
    this.getTxtCache().set(`resource/shader/${name}.vert.sk`, await this.readTxt(`resource/shader/${name}.vert.sk`))
    this.getTxtCache().set(`resource/shader/${name}.frag.sk`, await this.readTxt(`resource/shader/${name}.frag.sk`))
  }
  abstract createCanvas(canvas?: string | HTMLCanvasElement): HTMLCanvasElement;
  abstract loadSubpackage(): Promise<null>;
  abstract createImage(): HTMLImageElement;
  abstract createWorker(path: string, handlerCallback: Function): void;
  abstract createWebAudioContext(): AudioContext;
  abstract onTouchStart(listener: TouchInfoFunction): void;
  abstract onTouchMove(listener: TouchInfoFunction): void;
  abstract onTouchEnd(listener: TouchInfoFunction): void;
  abstract onTouchCancel(listener: TouchInfoFunction): void;
  abstract readJson(file: string): Promise<Object>;
  abstract readTxt(file: string): Promise<string>;
  abstract readBuffer(file: string): Promise<ArrayBuffer>;
}

