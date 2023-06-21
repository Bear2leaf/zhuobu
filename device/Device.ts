import { FontInfo } from "../drawobject/Text.js";
import GLTF from "../loader/gltf/GLTF.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";

export type DeviceInfo = { windowWidth: number; windowHeight: number; pixelRatio: number; }

export type TouchInfoFunction = (info?: { x: number, y: number }) => void
export enum ViewPortType {
    Full,
    TopRight,
    LeftTop
}
export default abstract class Device {
  private readonly renderingContext: RenderingContext;
  private readonly imageCache: Map<string, HTMLImageElement>;
  private readonly txtCache: Map<string, string>;
  private readonly fontCache: Map<string, FontInfo>;
  private readonly gltfCache: Map<string, GLTF>;
  private readonly glbCache: Map<string, ArrayBuffer>;
  private readonly performance: Performance;
  private readonly deviceInfo: DeviceInfo;
  constructor(renderingContext: RenderingContext) {
    this.txtCache = new Map();
    this.renderingContext = renderingContext;
    this.imageCache = new Map();
    this.fontCache = new Map();
    this.gltfCache = new Map();
    this.glbCache = new Map();
    this.deviceInfo = this.getDeviceInfo();
    this.performance = this.getPerformance();
    if (typeof document !== 'undefined') {
      this.deviceInfo.pixelRatio = 1;
    }
  }
  get gl(): RenderingContext {
    return this.renderingContext;
  }
  abstract getDeviceInfo(): DeviceInfo;
  protected abstract getPerformance(): Performance;
  getImageCache(): Map<string, HTMLImageElement> {
    return this.imageCache;
  }
  getTxtCache(): Map<string, string> {
    return this.txtCache;
  }
  getFontCache(): Map<string, FontInfo> {
    return this.fontCache;
  }
  getGLTFCache(): Map<string, GLTF> {
    return this.gltfCache;
  }
  getGLBCache(): Map<string, ArrayBuffer> {
    return this.glbCache;
  }
  viewportTo(type: ViewPortType): void {
    const { windowWidth, windowHeight, pixelRatio } = this.deviceInfo;
    const leftWidth = windowWidth * (2 / 3) * pixelRatio
    const rightWidth = windowWidth * (1 / 3) * pixelRatio;
    const leftHeight = windowHeight * (2 / 3) * pixelRatio
    const rightHeight = windowHeight * (1 / 3) * pixelRatio;
    switch (type) {
      case ViewPortType.TopRight:
        this.gl.viewportTo(leftWidth, leftHeight, rightWidth, rightHeight);
        this.gl.clear(0.3, 0.3, 0.3, 1)
        break;

      default:
        this.gl.viewportTo(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
        this.gl.clear(0.4, 0.4, 0.4, 1)
        break;
    }
  }
  now(): number {
    return this.performance.now() / (typeof document !== 'undefined' ? 1 : 1000);
  }
  async loadImageCache(url: string) {
    url = `resource/texture/${url}.png`
    const img = this.createImage() as HTMLImageElement;
    img.src = url;
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    this.getImageCache().set(url, img);
  }
  
  async loadGLTFCache(name: string) {
    this.getGLTFCache().set(`resource/gltf/${name}.gltf`, await this.readJson(`resource/gltf/${name}.gltf`) as GLTF)
    this.getGLBCache().set(`resource/gltf/${name}.bin`, await this.readBuffer(`resource/gltf/${name}.bin`))
  }
  async loadFontCache(name: string) {
    this.getFontCache().set(`static/font/${name}.json`, await this.readJson(`static/font/${name}.json`) as FontInfo)
    const fontTextureUrl = `static/font/${name}.png`
    const img = this.createImage() as HTMLImageElement;
    img.src = fontTextureUrl;
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    this.getImageCache().set(fontTextureUrl, img);
  }
  
  async loadShaderTxtCache(name: string) {
    this.getTxtCache().set(`static/shader/${name}.vert.sk`, await this.readTxt(`static/shader/${name}.vert.sk`))
    this.getTxtCache().set(`static/shader/${name}.frag.sk`, await this.readTxt(`static/shader/${name}.frag.sk`))
  }
  abstract createCanvas(canvas?: HTMLCanvasElement): HTMLCanvasElement;
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

