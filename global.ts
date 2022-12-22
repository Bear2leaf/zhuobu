
declare const wx: any;
let isMouseDown = false;
export let fs: string;
export let vs: string;
const isWX = typeof wx !== 'undefined';
export const device = {
    isWX:  isWX,
    createCanvas: isWX ? wx.createCanvas : () => document.getElementById("canvas"),
    loadSubpackage: isWX ? () => new Promise<null>(resolve => {
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
    }) : (async () => {}),
    createImage: isWX ? wx.createImage : () => new Image(),
    getWindowInfo: isWX ? wx.getWindowInfo : () => ({
        windowWidth: device.createCanvas().width,
        windowHeight: device.createCanvas().height,
        pixelRatio: devicePixelRatio,
    }),
    createWebAudioContext: isWX ? wx.createWebAudioContext : () => new AudioContext(),
    onTouchStart: isWX ? wx.onTouchStart : (listener: any) => { window.onpointerdown = (e: PointerEvent) => (isMouseDown = true) && listener(e); window.ontouchstart = listener; },
    onTouchMove: isWX ? wx.onTouchMove : (listener: any) => { window.onpointermove = (e: PointerEvent) => isMouseDown && listener(e); window.ontouchmove = listener; },
    onTouchEnd: isWX ? wx.onTouchEnd : (listener: any) => { window.onpointerup = (e: PointerEvent) => { isMouseDown = false; listener(e); window.ontouchend = listener; } },
    onTouchCancel: isWX ? wx.onTouchCancel : (listener: any) => { window.onpointercancel = (e: PointerEvent) => { isMouseDown = false; listener(e); window.ontouchcancel = listener; } },
    readJson: isWX
        ? (file: string): Promise<any> => new Promise(resolve => resolve(JSON.parse(String.fromCharCode(...new Uint8Array(wx.getFileSystemManager().readFileSync(file))))))
        : (file: string): Promise<any> => fetch(file).then(response => response.json()),
    readTxt: isWX
        ? (file: string): Promise<string> => new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8')))
        : (file: string): Promise<string> => fetch(file).then(response => response.text()),
    readBuffer: isWX
        ? (file: string): Promise<ArrayBuffer> => new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file)))
        : (file: string): Promise<ArrayBuffer> => fetch(file).then(response => response.arrayBuffer())
}
export const gl = device.createCanvas().getContext('webgl2') as WebGL2RenderingContext;
export const phyObjs: number[][] = [];
export const NUM = 0;

export default (cb: Function) => device.loadSubpackage().then(async () => {
    await device.readTxt("static/txt/hello.txt").then(console.log)
    vs = await device.readTxt("static/txt/vs.txt");
    fs = await device.readTxt("static/txt/fs.txt");
    await device.readJson("static/gltf/hello.gltf").then(console.log)
    await device.readBuffer("static/gltf/hello.bin").then(console.log)
}).then(() => cb());



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