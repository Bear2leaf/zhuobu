import MsgDispatcher from "../handler/MsgDispatcher.js";
import GLTF from "../loader/gltf/GLTF.js";
import { FontInfo } from "../renderer/TextRenderer.js";
import BrowserDevice from "./BrowserDevice.js";
import WxDevice from "./WxDevice.js";
export const wx = (globalThis as any).wx;

export type TouchInfoFunction = (info?: { x: number, y: number }) => void
export type DeviceInfo = { windowWidth: number; windowHeight: number; pixelRatio: number; }
export enum ViewPortType {
    Full,
    TopRight
}


export function viewportTo(this: Device, type: ViewPortType): void {
    const { windowWidth, windowHeight, pixelRatio } = this.getWindowInfo();
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
const device = typeof wx !== 'undefined' ? new WxDevice() : new BrowserDevice();
export async function loadImage(url: string) {
  const img = device.createImage() as HTMLImageElement;
  img.src = url;
  await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
  device.getImageCache().set(url, img);
}

export async function loadGLTFCache(name: string) {
  device.getGltfCache().set(`static/gltf/${name}.gltf`, await device.readJson(`static/gltf/${name}.gltf`) as GLTF)
  device.getGlbCache().set(`static/gltf/${name}.bin`, await device.readBuffer(`static/gltf/${name}.bin`))
}
export async function loadFontCache(name: string) {
  device.getFontCache().set(`resource/font/${name}.json`, await device.readJson(`resource/font/${name}.json`) as FontInfo)
  await loadImage(`resource/font/${name}.png`)
}

export async function loadShaderTxtCache(name: string) {
  device.getTxtCache().set(`resource/shader/${name}.vert.sk`, await device.readTxt(`resource/shader/${name}.vert.sk`))
  device.getTxtCache().set(`resource/shader/${name}.frag.sk`, await device.readTxt(`resource/shader/${name}.frag.sk`))
}

export interface Device {
    get gl(): WebGL2RenderingContext;
    isWx(): boolean;
    getImageCache(): Map<string, HTMLImageElement>;
    getTxtCache(): Map<string, string>;
    getFontCache(): Map<string, FontInfo>;
    getGltfCache(): Map<string, GLTF>;
    getGlbCache(): Map<string, ArrayBuffer>;
    now(): number;
    createCanvas(): HTMLCanvasElement;
    loadSubpackage(): Promise<null>;
    createImage(): HTMLImageElement;
    createWorker(path: string, handlerCallback: Function): void;
    getWindowInfo(): { windowWidth: number, windowHeight: number, pixelRatio: number };
    createWebAudioContext(): AudioContext;
    onTouchStart(listener: TouchInfoFunction): void;
    onTouchMove(listener: TouchInfoFunction): void;
    onTouchEnd(listener: TouchInfoFunction): void;
    onTouchCancel(listener: TouchInfoFunction): void;
    readJson(file: string): Promise<Object>;
    readTxt(file: string): Promise<string>;
    readBuffer(file: string): Promise<ArrayBuffer>;
    clearRenderer(): void;
    viewportTo(type: ViewPortType): void;
}
export default device

