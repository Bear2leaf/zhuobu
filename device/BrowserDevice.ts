import GLTF from "../loader/gltf/GLTF.js";
import { Device, DeviceInfo, TouchInfoFunction, clearRenderer, getWindowInfo, viewportTo } from "./Device.js";

export default class BrowserDevice implements Device {
    private isMouseDown: boolean;
    readonly gl: WebGL2RenderingContext;
    private readonly imageCache: Map<string, HTMLImageElement>;
    private readonly txtCache: Map<string, string>;
    private readonly fontCache: Map<string, import("../renderer/TextRenderer").FontInfo>;
    private readonly gltfCache: Map<string, GLTF>;
    private readonly glbCache: Map<string, ArrayBuffer>;
    private readonly deviceInfo: DeviceInfo;
    constructor() {

        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
        this.gltfCache = new Map();
        this.glbCache = new Map();
        this.deviceInfo = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pixelRatio: devicePixelRatio,
        };
        this.gl = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
        this.isMouseDown = false;
    }
    getImageCache(): Map<string, HTMLImageElement>{
        return this.imageCache;
    }
    getTxtCache(): Map<string, string>{
        return this.txtCache;
    }
    getFontCache(): Map<string, import("../renderer/TextRenderer").FontInfo>{
        return this.fontCache;
    }
    getDeviceInfo(): DeviceInfo{
        return this.deviceInfo;
    }
    getGltfCache(): Map<string, GLTF>{
        return this.gltfCache;
    }
    getGlbCache(): Map<string, ArrayBuffer>{
        return this.glbCache;
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
        canvas.width = this.getDeviceInfo().windowWidth * this.getDeviceInfo().pixelRatio;
        canvas.height = this.getDeviceInfo().windowHeight * this.getDeviceInfo().pixelRatio;
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
