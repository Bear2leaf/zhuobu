
declare const wx: any;
export type TouchInfoFunction = (info?: { x: number, y: number }) => void
type DeviceInfo =  { windowWidth: number; windowHeight: number; pixelRatio: number; }
export enum ViewPortType {
    Full,
    TopRight
}


function viewportTo(this: Device, type: ViewPortType): void {
    const { windowWidth, windowHeight, pixelRatio } = this.getWindowInfo();
    switch (type) {
        case ViewPortType.TopRight:
            this.gl.viewport(windowWidth * (2 / 3) * pixelRatio, windowHeight * (2 / 3) * pixelRatio, windowWidth * (1 / 3) * pixelRatio, windowHeight * (1 / 3) * pixelRatio);
            break;
    
        default:
            this.gl.viewport(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
            break;
    }
}
function clearRenderer(this: Device): void {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT)
}
function getWindowInfo(this: Device): DeviceInfo{
    return this.deviceInfo;
}
interface Device {
    readonly gl: WebGL2RenderingContext;
    readonly imageCache : Map<string, HTMLImageElement>;
    readonly txtCache : Map<string, string>;
    readonly fontCache : Map<string, import("./TextRenderer").FontInfo>;
    readonly deviceInfo: DeviceInfo
    createCanvas(): HTMLCanvasElement;
    loadSubpackage(): Promise<null>;
    createImage(): HTMLImageElement;
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
    readonly txtCache : Map<string, string>;
    readonly fontCache: Map<string, import("./TextRenderer").FontInfo>;
    readonly deviceInfo: DeviceInfo;
    constructor() {
        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
        this.deviceInfo =  wx.getWindowInfo();
        if (typeof document !== 'undefined') {
            this.deviceInfo.pixelRatio = 1;
        }
        this.gl = this.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
    }
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
                console.log(res.progress) // 可通过 onProgressUpdate 接口监听下载进度
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
    gl: WebGL2RenderingContext;
    private isMouseDown: boolean;
    readonly imageCache: Map<string, HTMLImageElement>;
    readonly txtCache : Map<string, string>;
    readonly fontCache: Map<string, import("./TextRenderer").FontInfo>;
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
    device.fontCache.set("static/font/font_info.json", await device.readJson("static/font/font_info.json") as import("./TextRenderer").FontInfo);
    const img = device.createImage() as HTMLImageElement;
    img.src = "static/font/boxy_bold_font.png";
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; })
    device.imageCache.set("static/font/boxy_bold_font.png", img);

    device.gl.clearColor(0.3, 0.3, 0.3, 1)

    device.gl.enable(device.gl.DEPTH_TEST)
}).then(() => cb());

