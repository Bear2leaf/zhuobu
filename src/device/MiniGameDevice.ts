import GLRenderingContext from "../renderingcontext/GLRenderingContext.js";
import OffscreenCanvasRenderingContext from "../renderingcontext/OffscreenCanvasRenderingContext.js";
import Device, { WindowInfo, TouchInfoFunction } from "./Device.js";

type MiniGameType = {
    createCanvas: Function,
    getSystemInfoSync: Function,
    getWindowInfo: Function,
    getPerformance: Function,
    createImage: Function,
    createWebAudioContext: Function,
    createWorker: Function,
    onTouchStart: Function,
    onTouchMove: Function,
    onTouchEnd: Function,
    onTouchCancel: Function,
    getFileSystemManager: Function
    loadSubpackage: Function
}

const wx = (globalThis as unknown as {wx: MiniGameType}).wx;
type MiniGameTouchInfo = { touches: { clientX: number, clientY: number }[] }

export default class MiniGameDevice extends Device {
    private readonly divideTimeBy: number;
    constructor() {
        const canvas = wx.createCanvas()
        const offscreenCanvas = wx.createCanvas()
        const sdfcanvas = wx.createCanvas()
        const isDevTool = wx.getSystemInfoSync().platform === "devtools";
        const { windowWidth, windowHeight, pixelRatio } = wx.getWindowInfo();
        (canvas.width) = windowWidth * pixelRatio;
        (canvas.height) = windowHeight * pixelRatio;
        super(new GLRenderingContext(canvas), new OffscreenCanvasRenderingContext(offscreenCanvas), new OffscreenCanvasRenderingContext(sdfcanvas));
        this.divideTimeBy = isDevTool ? 1 : 1000;
    }

    getWindowInfo(): WindowInfo {
        return wx.getWindowInfo();
    }
    getCanvasInfo(): WindowInfo {
        return wx.getWindowInfo();
    }
    getPerformance(): Performance {
        return wx.getPerformance();
    }
    now(): number {
        return this.getPerformance().now() / this.divideTimeBy;
    }
    async loadSubpackage(): Promise<null> {
        return await new Promise<null>(resolve => {
            const task = wx.loadSubpackage({
                name: "resources",
                success(res: {errMsg: string}) {
                    // console.debug("load resources success", res)
                    resolve(null)
                },
                fail(res: {errMsg: string}) {
                    console.error("load resources fail", res)
                }
            })

            task.onProgressUpdate((res: {[key: string]: number}) => {
                // console.debug(`onProgressUpdate: ${Object.keys(res).map(key => `${key}: ${res[key]}`).join(", ")}`)
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
        worker.onMessage((data: { type: string, args: unknown[] }) => {
            handlerCallback((message: WorkerRequest) => worker.postMessage(message), data);
        })
    }
    onTouchStart(listener: TouchInfoFunction): void {
        wx.onTouchStart((e: MiniGameTouchInfo) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist")
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchMove(listener: TouchInfoFunction): void {
        wx.onTouchMove((e: MiniGameTouchInfo) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist")
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        wx.onTouchEnd((e: MiniGameTouchInfo) => {
            listener();
        });
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        wx.onTouchCancel((e: MiniGameTouchInfo) => {
            listener();
        });
    }
    readJson(file: string): Promise<Object> {
        return new Promise(resolve => resolve(JSON.parse(String.fromCharCode(...new Uint8Array(wx.getFileSystemManager().readFileSync(file))))));
    }
    readText(file: string): Promise<string> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8')));
    }
    readBuffer(file: string): Promise<ArrayBuffer> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file)));
    }
}

