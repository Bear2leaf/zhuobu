
declare const wx: any;

interface Device {
    readonly gl: WebGL2RenderingContext;
    createCanvas(): HTMLCanvasElement;
    loadSubpackage(): Promise<null>;
    createImage(): HTMLImageElement;
    getWindowInfo(): { windowWidth: number, windowHeight: number, pixelRatio: number };
    createWebAudioContext(): AudioContext;
    onTouchStart(listener: Function): void;
    onTouchMove(listener: Function): void;
    onTouchEnd(listener: Function): void;
    onTouchCancel(listener: Function): void;
    readJson(file: string): Promise<Object>;
    readTxt(file: string): Promise<string>;
    readBuffer(file: string): Promise<ArrayBuffer>;
    clearRenderer(): void;
}
class WxDevice implements Device {
    gl: WebGL2RenderingContext;
    constructor() {
        this.gl = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
    }
    clearRenderer(): void {
        this.gl.clearColor(0, 0, 0, 1)
        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    }
    createCanvas(): HTMLCanvasElement {
        const canvas = wx.createCanvas()
        if (typeof document === 'undefined') {
            const { windowWidth, windowHeight, pixelRatio } = this.getWindowInfo();
            (canvas.clientWidth) = windowWidth * pixelRatio;
            (canvas.clientHeight) = windowHeight * pixelRatio;
            (canvas.width) = windowWidth * pixelRatio;
            (canvas.height) = windowHeight * pixelRatio;
        }
        return canvas
    }
    loadSubpackage(): Promise<null> {
        return new Promise<null>(resolve => {
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
                console.log(res.progress) // 可通过 onProgressUpdate 接口监听下载进度
                console.log(res.totalBytesWritten)
                console.log(res.totalBytesExpectedToWrite)
            })
        });
    }
    createImage(): HTMLImageElement {
        return wx.createImage();
    }
    getWindowInfo(): { windowWidth: number; windowHeight: number; pixelRatio: number; } {
        return wx.getWindowInfo();
    }
    createWebAudioContext(): AudioContext {
        return wx.createWebAudioContext();
    }
    onTouchStart(listener: Function): void {
        wx.onTouchStart(listener);
    }
    onTouchMove(listener: Function): void {
        wx.onTouchMove(listener);
    }
    onTouchEnd(listener: Function): void {
        wx.onTouchEnd(listener);
    }
    onTouchCancel(listener: Function): void {
        wx.onTouchCancel(listener);
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

class BrowserDevice implements Device {
    gl: WebGL2RenderingContext;
    private isMouseDown: boolean;
    constructor() {
        this.gl = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
        this.isMouseDown = false;
    }
    clearRenderer(): void {
        this.gl.clearColor(0, 0, 0, 1)
        this.gl.enable(this.gl.DEPTH_TEST)
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
    }
    createCanvas(): HTMLCanvasElement {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
        if (!canvas) {
            throw new Error("canvas not exist");
        }
        return canvas;
    }
    async loadSubpackage(): Promise<null> {
        return null;
    }
    createImage(): HTMLImageElement {
        return new Image();
    }
    getWindowInfo(): { windowWidth: number; windowHeight: number; pixelRatio: number; } {
        return {
            windowWidth: device.createCanvas().width,
            windowHeight: device.createCanvas().height,
            pixelRatio: devicePixelRatio,
        };
    }
    createWebAudioContext(): AudioContext {
        return new AudioContext();
    }
    onTouchStart(listener: Function): void {
        window.onpointerdown = (e: PointerEvent) => (this.isMouseDown = true) && listener(e);
    }
    onTouchMove(listener: Function): void {
        window.onpointermove = (e: PointerEvent) => this.isMouseDown && listener(e);
    }
    onTouchEnd(listener: Function): void {
        window.onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            listener(e);
        }
    }
    onTouchCancel(listener: Function): void {
        window.onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            listener(e);
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

export const device: Device = typeof wx !== 'undefined' ? new WxDevice() : new BrowserDevice()

device.onTouchStart(console.log)
device.onTouchMove(console.log)
device.onTouchEnd(console.log)
device.onTouchCancel(console.log)

export default (cb: Function) => device.loadSubpackage().then(async () => {
    await device.readTxt("static/txt/hello.txt").then(console.log)
    await device.readJson("static/gltf/hello.gltf").then(console.log)
    await device.readBuffer("static/gltf/hello.bin").then(console.log)
}).then(() => cb());

