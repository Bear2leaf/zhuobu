import GLRenderingContext from "../renderingcontext/GLRenderingContext.js";
import OffscreenCanvasRenderingContext from "../renderingcontext/OffscreenCanvasRenderingContext.js";
import { WorkerRequest, WorkerResponse } from "../types/index.js";
import Device, { WindowInfo, TouchInfoFunction } from "./Device.js";
export type Rectangle = { left: number, top: number, width: number, height: number, right: number, bottom: number }

export default class BrowserDevice extends Device {
    private isMouseDown: boolean;
    private readonly canvas: HTMLCanvasElement;
    private readonly offscreenCanvas: HTMLCanvasElement
    constructor(canvas: HTMLCanvasElement, offscreencanvas: HTMLCanvasElement, sdfcanvas: HTMLCanvasElement) {
        super(new GLRenderingContext(canvas), new OffscreenCanvasRenderingContext(offscreencanvas), new OffscreenCanvasRenderingContext(sdfcanvas));
        this.canvas = canvas;
        this.offscreenCanvas = offscreencanvas;
        this.isMouseDown = false;
    }
    getWindowInfo(): WindowInfo {
        return {
            windowWidth: this.canvas.width / window.devicePixelRatio,
            windowHeight: this.canvas.height / window.devicePixelRatio,
            pixelRatio: window.devicePixelRatio
        }
    }
    getMiniGameWindowInfo(): WindowInfo {
        return {
            windowWidth: 414,
            windowHeight: 896,
            pixelRatio: 3
        }
    }
    getPerformance(): Performance {
        return performance;
    }
    now(): number {
        return this.getPerformance().now();
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
    createWorker(path: string, onMessageCallback: (data: WorkerResponse[]) => void, setPostMessageCallback: (callback: (data: WorkerRequest) => void) => void): void {
        const worker = new Worker(path, { type: "module" });
        setPostMessageCallback(worker.postMessage.bind(worker))
        worker.onmessage = (e: MessageEvent) => onMessageCallback(e.data)
    }
    onTouchStart(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvas.onpointerdown = (e: PointerEvent) => {
            this.isMouseDown = true;
            const rect = this.canvas.getBoundingClientRect();
            const scaleRatio = windowInfo.windowWidth / rect.width;
            listener({ x: e.clientX * scaleRatio - rect.left, y: e.clientY * scaleRatio - rect.top });
        };
    }
    onTouchMove(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvas.onpointermove = (e: PointerEvent) => {
            if (this.isMouseDown) {
                const rect = this.canvas.getBoundingClientRect();
                const scaleRatio = windowInfo.windowWidth / rect.width;
                listener({ x: e.clientX * scaleRatio - rect.left, y: e.clientY * scaleRatio - rect.top });
            }
        };
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvas.onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = this.canvas.getBoundingClientRect();
            const scaleRatio = windowInfo.windowWidth / rect.width;
            listener({ x: e.clientX * scaleRatio - rect.left, y: e.clientY * scaleRatio - rect.top });
        }
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        const windowInfo = this.getWindowInfo();
        this.canvas.onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = this.canvas.getBoundingClientRect();
            const scaleRatio = windowInfo.windowWidth / rect.width;
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
