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
  constructor(renderingContext: RenderingContext) {
    this.renderingContext = renderingContext;
  }
  get gl(): RenderingContext {
    return this.renderingContext;
  }
  viewportTo(type: ViewPortType): void {
    const { windowWidth, windowHeight, pixelRatio } = this.getWindowInfo();
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
  abstract getPerformance(): Performance;
  abstract getWindowInfo(): DeviceInfo;
  abstract now(): number;
  abstract loadSubpackage(): Promise<null>;
  abstract createImage(): HTMLImageElement;
  abstract createWorker(path: string, handlerCallback: Function): void;
  abstract createWebAudioContext(): AudioContext;
  abstract onTouchStart(listener: TouchInfoFunction): void;
  abstract onTouchMove(listener: TouchInfoFunction): void;
  abstract onTouchEnd(listener: TouchInfoFunction): void;
  abstract onTouchCancel(listener: TouchInfoFunction): void;
  abstract readJson(file: string): Promise<Object>;
  abstract readText(file: string): Promise<string>;
  abstract readBuffer(file: string): Promise<ArrayBuffer>;
}

