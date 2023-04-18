import MsgDispatcher from "../handler/MsgDispatcher.js";
import BrowserDevice from "./BrowserDevice.js";
import WxDevice from "./WxDevice.js";
export const wx = (globalThis as any).wx;

export type TouchInfoFunction = (info?: { x: number, y: number }) => void
export type DeviceInfo = { windowWidth: number; windowHeight: number; pixelRatio: number; }
export type FontInfo = import("../renderer/TextRenderer").FontInfo;
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
export async function loadImage(url: string) {
    const img = device.createImage() as HTMLImageElement;
    img.src = url;
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    device.imageCache.set(url, img);
}


export interface Device {
    readonly gl: WebGL2RenderingContext;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache: Map<string, string>;
    readonly fontCache: Map<string, FontInfo>;
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
    await device.readTxt("static/txt/hello.txt").then(console.log)
    device.txtCache.set("static/shader/VertexColorTriangle.frag.txt", await device.readTxt("static/shader/VertexColorTriangle.frag.txt"))
    device.txtCache.set("static/shader/VertexColorTriangle.vert.txt", await device.readTxt("static/shader/VertexColorTriangle.vert.txt"))
    device.txtCache.set("static/shader/Sprite.vert.txt", await device.readTxt("static/shader/Sprite.vert.txt"))
    device.txtCache.set("static/shader/Sprite.frag.txt", await device.readTxt("static/shader/Sprite.frag.txt"))
    device.txtCache.set("static/shader/Point.vert.txt", await device.readTxt("static/shader/Point.vert.txt"))
    device.txtCache.set("static/shader/Point.frag.txt", await device.readTxt("static/shader/Point.frag.txt"))
    device.txtCache.set("static/shader/Line.vert.txt", await device.readTxt("static/shader/Line.vert.txt"))
    device.txtCache.set("static/shader/Line.frag.txt", await device.readTxt("static/shader/Line.frag.txt"))

    await device.readJson("static/gltf/hello.gltf").then(console.log)
    await device.readBuffer("static/gltf/hello.bin").then(console.log)
    device.fontCache.set("static/font/font_info.json", await device.readJson("static/font/font_info.json") as FontInfo);
    await loadImage("static/font/boxy_bold_font.png");
    await loadImage("static/sprite/happy.png");
    await loadImage("static/texture/test.png");

    // const msgDispatcher = new MsgDispatcher();
    // device.createWorker("static/worker/nethack.js", msgDispatcher.operation.bind(msgDispatcher));

    device.gl.enable(device.gl.CULL_FACE)
    device.gl.enable(device.gl.DEPTH_TEST)
    device.gl.enable(device.gl.SCISSOR_TEST)
}).then(() => cb());

export async function loadShaderTxtCache(device: Device, name: string, baseURL: string = "") {
    device.txtCache.set(`static/shader/${name}.vert.txt`, await device.readTxt(`${baseURL}static/shader/${name}.vert.txt`))
    device.txtCache.set(`static/shader/${name}.frag.txt`, await device.readTxt(`${baseURL}static/shader/${name}.frag.txt`))
}
