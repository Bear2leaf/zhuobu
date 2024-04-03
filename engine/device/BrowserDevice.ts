import Device from "./Device.js";

export default class BrowserDevice implements Device {
    private worker?: Worker;
    private isMouseDown: boolean;
    readonly canvasGL: HTMLCanvasElement;
    readonly canvas2D: HTMLCanvasElement;
    readonly contextGL: WebGL2RenderingContext;
    readonly context2D: CanvasRenderingContext2D;
    constructor(canvasGL: HTMLCanvasElement, canvas2D: HTMLCanvasElement) {
        canvasGL.width = 512 * devicePixelRatio;
        canvasGL.height = 512 * devicePixelRatio;
        canvasGL.style.width = "100%";
        canvas2D.style.display = "none";
        this.contextGL = canvasGL.getContext("webgl2")!;
        this.context2D = canvas2D.getContext("2d")!;
        this.canvasGL = canvasGL;
        this.canvas2D = canvas2D;
        this.isMouseDown = false;
    }
    getWindowInfo(): WindowInfo {
        return {
            width: this.canvasGL.width,
            height: this.canvasGL.height
        }
    }
    hideCanvas() {
        this.canvasGL.style.display = "none";
    }
    showCanvas() {
        this.canvasGL.style.display = "block;"
    }
    now(): number {
        return performance.now();
    }
    reload(): void {
        window.location.reload();
    }
    async loadSubpackage() {
        return null;
    }
    createImage(): HTMLImageElement {
        return new Image();
    }
    createWebAudioContext(): AudioContext {
        return new AudioContext();
    }
    setWorker(worker: Worker) {
        this.worker = worker;
    }
    createWorker(path: string, onMessageCallback: (data: WorkerResponse, callback: (data: WorkerRequest) => void) => void): void {
        if (this.worker) {
            const worker = this.worker;
            this.worker.onmessage = (e: MessageEvent) => onMessageCallback(e.data, worker.postMessage.bind(worker))
            return;
        } else {
            const worker = new Worker(path, { type: "module" });
            worker.onmessage = (e: MessageEvent) => onMessageCallback(e.data, worker.postMessage.bind(worker))
            this.worker = worker;
        }
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
