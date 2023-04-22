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
            device.gl.clearColor(0.4, 0.4, 0.4, 1)
            break;

        default:
            this.gl.viewport(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
            this.gl.scissor(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
            device.gl.clearColor(0.3, 0.3, 0.3, 1)
            break;
    }
}
export function clearRenderer(this: Device): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
}
export function getWindowInfo(this: Device): DeviceInfo {
    return this.deviceInfo;
}
async function loadImage(url: string) {
    const img = device.createImage() as HTMLImageElement;
    img.src = url;
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    device.imageCache.set(url, img);
}

async function loadGLTFCache(device: Device, name: string) {
    device.gltfCache.set(`static/gltf/${name}.gltf`, await device.readJson(`static/gltf/${name}.gltf`) as GLTF)
    device.glbCache.set(`static/gltf/${name}.bin`, await device.readBuffer(`static/gltf/${name}.bin`))
}
async function loadFontCache(device: Device, name: string) {
    device.fontCache.set(`static/font/${name}.json`, await device.readJson(`static/font/${name}.json`) as FontInfo)
    await loadImage(`static/font/${name}.png`)
}

async function loadShaderTxtCache(device: Device, name: string) {
    device.txtCache.set(`static/shader/${name}.vert.txt`, await device.readTxt(`static/shader/${name}.vert.txt`))
    device.txtCache.set(`static/shader/${name}.frag.txt`, await device.readTxt(`static/shader/${name}.frag.txt`))
}


export interface Device {
    readonly gl: WebGL2RenderingContext;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache: Map<string, string>;
    readonly fontCache: Map<string, FontInfo>;
    readonly gltfCache: Map<string, GLTF>;
    readonly glbCache: Map<string, ArrayBuffer>;
    readonly deviceInfo: DeviceInfo
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
export const device: Device = typeof wx !== 'undefined' ? new WxDevice() : new BrowserDevice()


export default (cb: Function) => device.loadSubpackage().then(async () => {
    await loadShaderTxtCache(device, "VertexColorTriangle")
    await loadShaderTxtCache(device, "Sprite")
    await loadShaderTxtCache(device, "Point")
    await loadShaderTxtCache(device, "Line")

    await loadGLTFCache(device, "hello")

    await loadFontCache(device, "boxy_bold_font")
    
    await loadImage("static/sprite/happy.png");
    await loadImage("static/texture/test.png");

    // const msgDispatcher = new MsgDispatcher();
    // device.createWorker("static/worker/nethack.js", msgDispatcher.operation.bind(msgDispatcher));

    device.gl.enable(device.gl.CULL_FACE)
    device.gl.enable(device.gl.DEPTH_TEST)
    device.gl.enable(device.gl.SCISSOR_TEST)
}).then(() => cb());
