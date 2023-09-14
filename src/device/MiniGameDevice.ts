import GLRenderingContext from "../contextobject/GLRenderingContext.js";
import Device, { DeviceInfo, TouchInfoFunction } from "./Device.js";

const wx = (globalThis as any).wx;

export default class MiniGameDevice extends Device {
    private readonly divideTimeBy: number;
    constructor() {
        const canvas = wx.createCanvas()
        const isDevTool = wx.getSystemInfoSync().platform === "devtools";
        const { windowWidth, windowHeight, pixelRatio } = wx.getWindowInfo();
        (canvas.width) = windowWidth * pixelRatio;
        (canvas.height) = windowHeight * pixelRatio;
        super(new GLRenderingContext(canvas));
        this.divideTimeBy = isDevTool ? 1 : 1000;
    }

    getWindowInfo(): DeviceInfo {
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
                success(res: any) {
                    console.debug("load resources success", res)
                    resolve(null)
                },
                fail(res: any) {
                    console.error("load resources fail", res)
                }
            })

            task.onProgressUpdate((res: any) => {
                console.debug(res.progress)
                console.debug(res.totalBytesWritten)
                console.debug(res.totalBytesExpectedToWrite)
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
            handlerCallback(worker, data);
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
    readText(file: string): Promise<string> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8')));
    }
    readBuffer(file: string): Promise<ArrayBuffer> {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file)));
    }
}

