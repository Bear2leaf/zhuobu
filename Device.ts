declare const wx: any;
export type TouchInfoFunction = (info?: { x: number, y: number }) => void
type DeviceInfo = { windowWidth: number; windowHeight: number; pixelRatio: number; }
type FontInfo = import("./renderer/TextRenderer").FontInfo;
export enum ViewPortType {
    Full,
    TopRight
}


function viewportTo(this: Device, type: ViewPortType): void {
    const { windowWidth, windowHeight, pixelRatio } = this.getWindowInfo();
    const leftWidth = windowWidth * (2 / 3) * pixelRatio
    const rightWidth = windowWidth * (1 / 3) * pixelRatio;
    const leftHeight = windowHeight * (2 / 3) * pixelRatio
    const rightHeight = windowHeight * (1 / 3) * pixelRatio;
    switch (type) {
        case ViewPortType.TopRight:
            this.gl.viewport(leftWidth, leftHeight, rightWidth, rightHeight);
            this.gl.scissor(leftWidth, leftHeight, rightWidth, rightHeight);
            device.gl.clearColor(0.4, 0.4, 0.4, 1)
            break;

        default:
            this.gl.viewport(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
            this.gl.scissor(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
            device.gl.clearColor(0.3, 0.3, 0.3, 1)
            break;
    }
}
function clearRenderer(this: Device): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
}
function getWindowInfo(this: Device): DeviceInfo {
    return this.deviceInfo;
}
interface Device {
    readonly gl: WebGL2RenderingContext;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache: Map<string, string>;
    readonly fontCache: Map<string, FontInfo>;
    readonly deviceInfo: DeviceInfo
    now(): number;
    createCanvas(): HTMLCanvasElement;
    loadSubpackage(): Promise<null>;
    createImage(): HTMLImageElement;
    createWorker(path: string, handlerCallback: Function): void;
    getWindowInfo(): { windowWidth: number, windowHeight: number, pixelRatio: number };
    createWebAudioContext(): AudioContext;
    onTouchStart(listener: TouchInfoFunction): void;
    onTouchMove(listener: TouchInfoFunction): void;
    onTouchEnd(listener: TouchInfoFunction): void;
    onTouchCancel(listener: TouchInfoFunction): void;
    readJson(file: string): Promise<Object>;
    readTxt(file: string): Promise<string>;
    readBuffer(file: string): Promise<ArrayBuffer>;
    clearRenderer(): void;
    viewportTo(type: ViewPortType): void;
}
class WxDevice implements Device {
    readonly gl: WebGL2RenderingContext;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache: Map<string, string>;
    readonly fontCache: Map<string, FontInfo>;
    readonly deviceInfo: DeviceInfo;
    private readonly performance: Performance;
    constructor() {
        this.performance = wx.getPerformance();
        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
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
        await new Promise<null>(resolve => {
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
        })
        const img = device.createImage() as HTMLImageElement;
        img.src = "static/font/boxy_bold_font.png";
        await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; })
        return null;
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

class BrowserDevice implements Device {
    readonly gl: WebGL2RenderingContext;
    private isMouseDown: boolean;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache: Map<string, string>;
    readonly fontCache: Map<string, import("./renderer/TextRenderer").FontInfo>;
    readonly deviceInfo: DeviceInfo;
    constructor() {
        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
        this.deviceInfo = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pixelRatio: devicePixelRatio,
        };
        this.gl = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
        this.isMouseDown = false;
    }
    now = () => performance.now();
    getWindowInfo = getWindowInfo
    clearRenderer = clearRenderer
    viewportTo = viewportTo
    createCanvas(): HTMLCanvasElement {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
        if (!canvas) {
            throw new Error("canvas not exist");
        }
        canvas.width = this.deviceInfo.windowWidth * this.deviceInfo.pixelRatio;
        canvas.height = this.deviceInfo.windowHeight * this.deviceInfo.pixelRatio;
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
        window.onpointerdown = (e: PointerEvent) => {
            this.isMouseDown = true;
            listener({ x: e.clientX, y: e.clientY });
        };
    }
    onTouchMove(listener: TouchInfoFunction): void {
        window.onpointermove = (e: PointerEvent) => {
            if (this.isMouseDown) {
                listener({ x: e.clientX, y: e.clientY })
            }
        };
    }
    onTouchEnd(listener: TouchInfoFunction): void {
        window.onpointerup = (e: PointerEvent) => {
            this.isMouseDown = false;
            listener({ x: e.clientX, y: e.clientY });
        }
    }
    onTouchCancel(listener: TouchInfoFunction): void {
        window.onpointercancel = (e: PointerEvent) => {
            this.isMouseDown = false;
            listener({ x: e.clientX, y: e.clientY });
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


export default (cb: Function) => device.loadSubpackage().then(async () => {
    await device.readTxt("static/txt/hello.txt").then(console.log)
    await device.readJson("static/gltf/hello.gltf").then(console.log)
    await device.readBuffer("static/gltf/hello.bin").then(console.log)
    device.txtCache.set("static/obj/cube.obj", await device.readTxt("static/obj/cube.obj"));
    device.fontCache.set("static/font/font_info.json", await device.readJson("static/font/font_info.json") as FontInfo);
    await loadImage("static/font/boxy_bold_font.png");
    await loadImage("static/sprite/happy.png");


    device.gl.enable(device.gl.CULL_FACE)
    device.gl.enable(device.gl.DEPTH_TEST)
    device.gl.enable(device.gl.SCISSOR_TEST)
}).then(() => cb());

async function loadImage(url: string) {
    const img = device.createImage() as HTMLImageElement;
    img.src = url;
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    device.imageCache.set(url, img);
}

