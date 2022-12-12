import { twgl } from "./static/game.js";

export const libs: {
    twgl: typeof twgl
} = {
    twgl: null!
};
declare const wx: any;
let isMouseDown = false;
export const device = {
    createCanvas: typeof wx !== 'undefined' ? wx.createCanvas : () => document.getElementById("canvas"),
    createWorker: (path: string, opt: WorkerOptions): Promise<Worker> => typeof wx !== 'undefined' ? new Promise(resolve => {

        var task = wx.loadSubpackage({
            name: "static",
            success(res: any) {
                console.log("load static success", res)
                resolve(wx.createWorker(path, opt))
            },
            fail(res: any) {
                console.log("load static fail", res)
            }
        })

        task.onProgressUpdate((res: any) => {
            console.log(res.progress) // 可通过 onProgressUpdate 接口监听下载进度
            console.log(res.totalBytesWritten)
            console.log(res.totalBytesExpectedToWrite)
        })
    }) : (async () => new Worker(path, opt))(),
    createImage: typeof wx !== 'undefined' ? wx.createImage : () => new Image(),
    getWindowInfo: typeof wx !== 'undefined' ? wx.getWindowInfo : () => ({
        windowWidth: device.createCanvas().width,
        windowHeight: device.createCanvas().height,
        pixelRatio: devicePixelRatio,
    }),
    createWebAudioContext: typeof wx !== 'undefined' ? wx.createWebAudioContext : () => new AudioContext(),
    onTouchStart: typeof wx !== 'undefined' ? wx.onTouchStart : (listener: any) => { window.onpointerdown = (e: PointerEvent) => (isMouseDown = true) && listener(e); window.ontouchstart = listener; },
    onTouchMove: typeof wx !== 'undefined' ? wx.onTouchMove : (listener: any) => { window.onpointermove = (e: PointerEvent) => isMouseDown && listener(e); window.ontouchmove = listener; },
    onTouchEnd: typeof wx !== 'undefined' ? wx.onTouchEnd : (listener: any) => { window.onpointerup = (e: PointerEvent) => { isMouseDown = false; listener(e); window.ontouchend = listener; } },
    onTouchCancel: typeof wx !== 'undefined' ? wx.onTouchCancel : (listener: any) => { window.onpointercancel = (e: PointerEvent) => { isMouseDown = false; listener(e); window.ontouchcancel = listener; } },
    readJson: typeof wx !== 'undefined'
        ? (file: string): Promise<any> => new Promise(resolve => resolve(JSON.parse(String.fromCharCode(...new Uint8Array(wx.getFileSystemManager().readFileSync(file))))))
        : (file: string): Promise<any> => fetch(file).then(response => response.json()),
    readTxt: typeof wx !== 'undefined'
        ? (file: string): Promise<string> => new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8')))
        : (file: string): Promise<string> => fetch(file).then(response => response.text()),
    readBuffer: typeof wx !== 'undefined'
        ? (file: string): Promise<ArrayBuffer> => new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file)))
        : (file: string): Promise<ArrayBuffer> => fetch(file).then(response => response.arrayBuffer())
}
export const gl = device.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
export const phyObjs: number[][] = [];
export const NUM = 200;

export default device.createWorker("workers/worker.wasm.js", { type: 'module' }).then(async (worker) => {
    device.readTxt("static/txt/hello.txt").then(console.log)
    device.readBuffer("static/obj/hello.obj").then(console.log)
    device.readBuffer("static/mtl/hello.mtl").then(console.log)
    function physicsCallback(event: MessageEvent) {
        var data = event.data;
        if (data.isReady) {
            worker.postMessage(typeof wx !== 'undefined' ? { data: NUM } : NUM);
            return
        }
        (data as { objects: number[][], currFPS: number, allFPS: number }).objects.forEach((object, index) => phyObjs[index] = object);
    }
    if (typeof wx !== 'undefined') {
        (worker as any).onMessage(physicsCallback)
    } else {
        worker.onmessage = physicsCallback
        worker.onerror = console.error
    }
    Object.assign(libs, await import("./static/game.js"));
});


if (typeof wx !== 'undefined' && typeof document === 'undefined') {
    const { windowWidth, windowHeight, pixelRatio } = device.getWindowInfo();
    ((gl.canvas as any).clientWidth) = windowWidth * pixelRatio;
    ((gl.canvas as any).clientHeight) = windowHeight * pixelRatio;
    ((gl.canvas as any).width) = windowWidth * pixelRatio;
    ((gl.canvas as any).height) = windowHeight * pixelRatio;
}


export function hexToRGBA(hexString: string): [number, number, number, number] {
    if (/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g.test(hexString)) {
        const a = Number.parseInt(hexString.slice(1, 3), 16) / 255;
        const r = Number.parseInt(hexString.slice(3, 5), 16) / 255;
        const g = Number.parseInt(hexString.slice(5, 7), 16) / 255;
        const b = Number.parseInt(hexString.slice(7, 9), 16) / 255;
        return [r, g, b, a];
    } else if (/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g.test(hexString)) {
        const r = Number.parseInt(hexString.slice(1, 3), 16) / 255;
        const g = Number.parseInt(hexString.slice(3, 5), 16) / 255;
        const b = Number.parseInt(hexString.slice(5, 7), 16) / 255;
        return [r, g, b, 255];
    }
    else {
        throw new Error(`unsupport hex color string: ${hexString}`);
    }
}