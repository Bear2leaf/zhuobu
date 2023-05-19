import Device, { DeviceInfo, TouchInfoFunction } from "./Device.js";

export default class BrowserDevice extends Device {
    private isMouseDown: boolean;
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.isMouseDown = false;
    }
    getDeviceInfo(): DeviceInfo {
        return {
            windowWidth: 300,
            windowHeight: 150,
            pixelRatio: devicePixelRatio,
        };
    }
    getPerformance(): Performance {
        return performance;
    }
    now = () => performance.now();
    createCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement {
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
        this.getCanvas().onpointerdown = (e: PointerEvent) => {
            this.isMouseDown = true;
            const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
            listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };
    }
    onTouchMove(listener: TouchInfoFunction): void {
        this.getCanvas().onpointermove = (e: PointerEvent) => {
            if (this.isMouseDown) {
                const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
                listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
        };
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        this.getCanvas().onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
            listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        this.getCanvas().onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = (this.gl.canvas as HTMLCanvasElement).getBoundingClientRect();
            listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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
