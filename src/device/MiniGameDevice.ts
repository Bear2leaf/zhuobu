import GLRenderingContext from "../renderingcontext/GLRenderingContext.js";
import OffscreenCanvasRenderingContext from "../renderingcontext/OffscreenCanvasRenderingContext.js";
import { WorkerResponse, WorkerRequest } from "../types/index.js";
import Device, { WindowInfo, TouchInfoFunction } from "./Device.js";





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
        super(new GLRenderingContext(canvas as unknown as HTMLCanvasElement), new OffscreenCanvasRenderingContext(offscreenCanvas as unknown as HTMLCanvasElement), new OffscreenCanvasRenderingContext(sdfcanvas as unknown as HTMLCanvasElement));
        this.divideTimeBy = isDevTool ? 1 : 1000;
    }

    getWindowInfo(): WindowInfo {
        return wx.getWindowInfo();
    }
    getMiniGameWindowInfo(): WindowInfo {
        return this.getWindowInfo();
    }
    getPerformance(): Performance {
        return wx.getPerformance() as Performance;
    }
    now(): number {
        return this.getPerformance().now() / this.divideTimeBy;
    }
    reload(): void {

    }
    async loadSubpackage(): Promise<null> {
        return await new Promise<null>(resolve => {
            const task = wx.loadSubpackage({
                name: "resources",
                success(res: { errMsg: string }) {
                    console.debug("load resources success", res)
                    resolve(null)
                },
                fail(res: { errMsg: string }) {
                    console.error("load resources fail", res)
                },
                complete() {
                    console.debug("load resources complete");
                }
            })

            task.onProgressUpdate((res) => {
                console.debug(`onProgressUpdate: ${res.progress}, ${res.totalBytesExpectedToWrite}, ${res.totalBytesWritten}`)
            })
        });
    }
    createImage(): HTMLImageElement {
        return wx.createImage() as HTMLImageElement;
    }
    createWebAudioContext(): AudioContext {
        return wx.createWebAudioContext() as unknown as AudioContext;
    }
    createWorker(path: string, onMessageCallback: (data: WorkerResponse[]) => void, setPostMessageCallback: (callback: (data: WorkerRequest) => void) => void): void {
        const worker = wx.createWorker(path);
        setPostMessageCallback(worker.postMessage.bind(worker))
        worker.onMessage((data) => onMessageCallback(data as unknown as WorkerResponse[]))
    }
    onTouchStart(listener: TouchInfoFunction): void {
        wx.onTouchStart((e) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist")
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchMove(listener: TouchInfoFunction): void {
        wx.onTouchMove((e) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist")
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        wx.onTouchEnd((e) => {
            listener();
        });
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        wx.onTouchCancel((e) => {
            listener();
        });
    }
    readJson(file: string): Promise<Object> {
        return new Promise(resolve => resolve(JSON.parse(wx.getFileSystemManager().readFileSync(file, 'utf-8') as string)));
    }
    readText(file: string): Promise<string> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8') as string));
    }
    readBuffer(file: string): Promise<ArrayBuffer> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file) as ArrayBuffer));
    }
}

