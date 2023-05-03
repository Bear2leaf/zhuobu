import GLTF from "../loader/gltf/GLTF.js";
import { Device, DeviceInfo,  TouchInfoFunction, clearRenderer, getWindowInfo, viewportTo, wx } from "./Device.js";

export default class WxDevice implements Device {
    private readonly glContext: WebGL2RenderingContext;
    private readonly performance: Performance;
    private readonly imageCache: Map<string, HTMLImageElement>;
    private readonly txtCache: Map<string, string>;
    private readonly fontCache: Map<string, import("../renderer/TextRenderer").FontInfo>;
    private readonly gltfCache: Map<string, GLTF>;
    private readonly glbCache: Map<string, ArrayBuffer>;
    private readonly deviceInfo: DeviceInfo;
    constructor() {
        this.performance = wx.getPerformance();
        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
        this.gltfCache = new Map();
        this.glbCache = new Map();
        this.deviceInfo = wx.getWindowInfo();
        if (typeof document !== 'undefined') {
            this.deviceInfo.pixelRatio = 1;
        }
        this.glContext = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
    }
    get gl(): WebGL2RenderingContext {
        return this.glContext;
    }
    now = () => this.performance.now() / (typeof document !== 'undefined' ? 1 : 1000);

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
    getWindowInfo = getWindowInfo
    clearRenderer = clearRenderer
    viewportTo = viewportTo
    createCanvas(): HTMLCanvasElement {
        const canvas = wx.createCanvas()
        if (typeof document === 'undefined') {
            const { windowWidth, windowHeight, pixelRatio } = this.getDeviceInfo();
            (canvas.clientWidth) = windowWidth * pixelRatio;
            (canvas.clientHeight) = windowHeight * pixelRatio;
            (canvas.width) = windowWidth * pixelRatio;
            (canvas.height) = windowHeight * pixelRatio;
        }
        return canvas
    }
    async loadSubpackage(): Promise<null> {
        return await new Promise<null>(resolve => {
            const task = wx.loadSubpackage({
                name: "static",
                success(res: any) {
                    console.log("load static success", res)
                    resolve(null)
                },
                fail(res: any) {
                    console.error("load static fail", res)
                }
            })

            task.onProgressUpdate((res: any) => {
                console.log(res.progress)
                console.log(res.totalBytesWritten)
                console.log(res.totalBytesExpectedToWrite)
            })
        });
    }
    createImage(): HTMLImageElement {
        return wx.createImage();
    }
    createWebAudioContext(): AudioContext {
        return wx.createWebAudioContext();
    }
    createWorker(path: string, handlerCallback: Function): void {
        const worker = wx.createWorker(path);

        worker.onMessage((data: any) => {
            handlerCallback(worker, ...data);
        })
    }
    onTouchStart(listener: TouchInfoFunction): void {
        wx.onTouchStart((e: any) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist")
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchMove(listener: TouchInfoFunction): void {
        wx.onTouchMove((e: any) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist")
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        wx.onTouchEnd((e: any) => {
            listener();
        });
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        wx.onTouchCancel((e: any) => {
            listener();
        });
    }
    readJson(file: string): Promise<Object> {
        return new Promise(resolve => resolve(JSON.parse(String.fromCharCode(...new Uint8Array(wx.getFileSystemManager().readFileSync(file))))));
    }
    readTxt(file: string): Promise<string> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8')));
    }
    readBuffer(file: string): Promise<ArrayBuffer> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file)));
    }
}

