import { Device, DeviceInfo, TouchInfoFunction, clearRenderer, getWindowInfo, viewportTo } from "./Device.js";

export default class BrowserDevice implements Device {
    readonly gl: WebGL2RenderingContext;
    private isMouseDown: boolean;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache: Map<string, string>;
    readonly fontCache: Map<string, import("../renderer/TextRenderer").FontInfo>;
    readonly deviceInfo: DeviceInfo;
    constructor() {
        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
        this.deviceInfo = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pixelRatio: devicePixelRatio,
        };
        this.gl = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
        this.isMouseDown = false;
    }
    now = () => performance.now();
    getWindowInfo = getWindowInfo
    clearRenderer = clearRenderer
    viewportTo = viewportTo
    createCanvas(): HTMLCanvasElement {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
        if (!canvas) {
            throw new Error("canvas not exist");
        }
        canvas.width = this.deviceInfo.windowWidth * this.deviceInfo.pixelRatio;
        canvas.height = this.deviceInfo.windowHeight * this.deviceInfo.pixelRatio;
        return canvas;
    }
    async loadSubpackage(): Promise<null> {
        return null;
    }
    createImage(): HTMLImageElement {
        return new Image();
    }
    createWebAudioContext(): AudioContext {
        return new AudioContext();
    }
    createWorker(path: string, handlerCallback: Function): void {
        const worker = new Worker(path);
        worker.onmessage =
            (e: MessageEvent) => {
                handlerCallback(worker, ...e.data)
            }
    }
    onTouchStart(listener: TouchInfoFunction): void {
        window.onpointerdown = (e: PointerEvent) => {
            this.isMouseDown = true;
            listener({ x: e.clientX, y: e.clientY });
        };
    }
    onTouchMove(listener: TouchInfoFunction): void {
        window.onpointermove = (e: PointerEvent) => {
            if (this.isMouseDown) {
                listener({ x: e.clientX, y: e.clientY })
            }
        };
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        window.onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            listener({ x: e.clientX, y: e.clientY });
        }
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        window.onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            listener({ x: e.clientX, y: e.clientY });
        }
    }
    async readJson(file: string): Promise<Object> {
        const response = await fetch(file);
        return await response.json();
    }
    async readTxt(file: string): Promise<string> {
        const response = await fetch(file);
        return await response.text();
    }
    async readBuffer(file: string): Promise<ArrayBuffer> {
        const response = await fetch(file);
        return await response.arrayBuffer();
    }
}
