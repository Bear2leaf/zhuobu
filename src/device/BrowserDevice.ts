import GLRenderingContext from "../renderingcontext/GLRenderingContext.js";
import OffscreenCanvasRenderingContext from "../renderingcontext/OffscreenCanvasRenderingContext.js";
import { WorkerRequest } from "../type/index.js";
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
            windowWidth: this.canvas.width,
            windowHeight: this.canvas.height,
            pixelRatio: 1
        }
    }
    getCanvasInfo(): WindowInfo {
        return {
            windowWidth: this.offscreenCanvas.width,
            windowHeight: this.offscreenCanvas.height,
            pixelRatio: 1
        }
    }
    getPerformance(): Performance {
        return performance;
    }
    now(): number {
        return this.getPerformance().now();
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
        const worker = new Worker(path, { type: "module" });
        worker.onmessage =
            (e: MessageEvent) => {
                handlerCallback((message: WorkerRequest) => worker.postMessage(message), e.data)
            }
    }
    onTouchStart(listener: TouchInfoFunction): void {
        this.canvas.onpointerdown = (e: PointerEvent) => {
            this.isMouseDown = true;
            const rect = this.canvas.getBoundingClientRect();
            listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        };
    }
    onTouchMove(listener: TouchInfoFunction): void {
        this.canvas.onpointermove = (e: PointerEvent) => {
            if (this.isMouseDown) {
                const rect = this.canvas.getBoundingClientRect();
                listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
            }
        };
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        this.canvas.onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = this.canvas.getBoundingClientRect();
            listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        this.canvas.onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            const rect = this.canvas.getBoundingClientRect();
            listener({ x: e.clientX - rect.left, y: e.clientY - rect.top });
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
