import GLTF from "../loader/gltf/GLTF.js";
import { FontInfo } from "../renderer/TextRenderer.js";
import { Device, DeviceInfo,  TouchInfoFunction, clearRenderer, getWindowInfo, viewportTo, wx } from "./Device.js";

export default class WxDevice implements Device {
    readonly gl: WebGL2RenderingContext;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache: Map<string, string>;
    readonly fontCache: Map<string, FontInfo>;
    readonly gltfCache: Map<string, GLTF>;
    readonly glbCache: Map<string, ArrayBuffer>;
    readonly deviceInfo: DeviceInfo;
    private readonly performance: Performance;
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
        this.gl = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
    }
    now = () => this.performance.now() / (typeof document !== 'undefined' ? 1 : 1000);
    getWindowInfo = getWindowInfo
    clearRenderer = clearRenderer
    viewportTo = viewportTo
    createCanvas(): HTMLCanvasElement {
        const canvas = wx.createCanvas()
        if (typeof document === 'undefined') {
            const { windowWidth, windowHeight, pixelRatio } = this.deviceInfo;
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

