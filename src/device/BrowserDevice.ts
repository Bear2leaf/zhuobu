import Device from "./Device.js";

export default class BrowserDevice implements Device {
    private isMouseDown: boolean;
    private readonly canvasGL: HTMLCanvasElement;
    private readonly canvas2D: HTMLCanvasElement;
    readonly contextGL: WebGL2RenderingContext;
    readonly context2D: CanvasRenderingContext2D;
    constructor() {
        const canvasGL = document.createElement("canvas");
        canvasGL.width = 512;
        canvasGL.height = 512;
        canvasGL.style.width = "100%";
        document.body.append(canvasGL);
        const canvas2D = document.createElement("canvas");
        canvas2D.style.display = "none";
        document.body.append(canvas2D);
        this.contextGL = canvasGL.getContext("webgl2")!;
        this.context2D = canvas2D.getContext("2d")!;
        this.canvasGL = canvasGL;
        this.canvas2D = canvas2D;
        this.isMouseDown = false;
    }
    getWindowInfo(): WindowInfo {
        return {
            width: this.canvasGL.width,
            height: this.canvasGL.height,
            ratio: window.devicePixelRatio
        }
    }
    now(): number {
        return performance.now();
    }
    reload(): void {
        window.location.reload();
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
    createWorker(path: string, onMessageCallback: (data: WorkerResponse, callback: (data: WorkerRequest) => void) => void): void {
        const worker = new Worker(path, { type: "module" });
        worker.onmessage = (e: MessageEvent) => onMessageCallback(e.data, worker.postMessage.bind(worker))
    }
    onTouchStart(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvasGL.onpointerdown = (e: PointerEvent) => {
            this.isMouseDown = true;
            const rect = this.canvasGL.getBoundingClientRect();
            const scaleRatio = windowInfo.width / rect.width;
            listener({ x: e.clientX * scaleRatio - rect.left, y: e.clientY * scaleRatio - rect.top });
        };
    }
    onTouchMove(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvasGL.onpointermove = (e: PointerEvent) => {
            if (this.isMouseDown) {
                const rect = this.canvasGL.getBoundingClientRect();
                const scaleRatio = windowInfo.width / rect.width;
                listener({ x: e.clientX * scaleRatio - rect.left, y: e.clientY * scaleRatio - rect.top });
            }
        };
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvasGL.onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = this.canvasGL.getBoundingClientRect();
            const scaleRatio = windowInfo.width / rect.width;
            listener({ x: e.clientX * scaleRatio - rect.left, y: e.clientY * scaleRatio - rect.top });
        }
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvasGL.onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = this.canvasGL.getBoundingClientRect();
            const scaleRatio = windowInfo.width / rect.width;
            listener({ x: e.clientX * scaleRatio - rect.left, y: e.clientY * scaleRatio - rect.top });
        }
    }
    async readJson(file: string): Promise<Object> {
        const response = await fetch(file);
        return await response.json();
    }
    async readText(file: string): Promise<string> {
        const response = await fetch(file);
        return await response.text();
    }
    async readBuffer(file: string): Promise<ArrayBuffer> {
        const response = await fetch(file);
        return await response.arrayBuffer();
    }
}
