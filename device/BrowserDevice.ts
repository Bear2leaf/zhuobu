import GLTF from "../loader/gltf/GLTF.js";
import { Device, DeviceInfo, TouchInfoFunction, viewportTo } from "./Device.js";

export default class BrowserDevice implements Device {
    private isMouseDown: boolean;
    private readonly webgl2RenderingContext: WebGL2RenderingContext;
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
        this.webgl2RenderingContext = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
        this.isMouseDown = false;
    }
    isWx(): boolean {
        return false;
    }
    get gl(): WebGL2RenderingContext {
        return this.webgl2RenderingContext;
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
    getGltfCache(): Map<string, GLTF>{
        return this.gltfCache;
    }
    getGlbCache(): Map<string, ArrayBuffer>{
        return this.glbCache;
    }
    now = () => performance.now();
    getWindowInfo = () => this.deviceInfo;
    clearRenderer = () => this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    viewportTo = viewportTo
    createCanvas(): HTMLCanvasElement {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
        if (!canvas) {
            throw new Error("canvas not exist");
        }
        canvas.width = this.getWindowInfo().windowWidth * this.getWindowInfo().pixelRatio;
        canvas.height = this.getWindowInfo().windowHeight * this.getWindowInfo().pixelRatio;
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
            const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
            listener({ x:  e.clientX - rect.left, y: e.clientY - rect.top });
        };
    }
    onTouchMove(listener: TouchInfoFunction): void {
        window.onpointermove = (e: PointerEvent) => {
            if (this.isMouseDown) {
                const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
                listener({ x:  e.clientX - rect.left, y: e.clientY - rect.top });
            }
        };
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        window.onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
            listener({ x:  e.clientX - rect.left, y: e.clientY - rect.top });
        }
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        window.onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
            listener({ x:  e.clientX - rect.left, y: e.clientY - rect.top });
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
