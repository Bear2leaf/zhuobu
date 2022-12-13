let isMouseDown = false;
export let twgl;
export let fs;
export let vs;
export const device = {
    createCanvas: typeof wx !== 'undefined' ? wx.createCanvas : () => document.getElementById("canvas"),
    createWorker: (path, opt) => typeof wx !== 'undefined' ? new Promise(resolve => {
        var task = wx.loadSubpackage({
            name: "static",
            success(res) {
                console.log("load static success", res);
                resolve(wx.createWorker(path, opt));
            },
            fail(res) {
                console.log("load static fail", res);
            }
        });
        task.onProgressUpdate((res) => {
            console.log(res.progress); // 可通过 onProgressUpdate 接口监听下载进度
            console.log(res.totalBytesWritten);
            console.log(res.totalBytesExpectedToWrite);
        });
    }) : (async () => new Worker(path, opt))(),
    createImage: typeof wx !== 'undefined' ? wx.createImage : () => new Image(),
    getWindowInfo: typeof wx !== 'undefined' ? wx.getWindowInfo : () => ({
        windowWidth: device.createCanvas().width,
        windowHeight: device.createCanvas().height,
        pixelRatio: devicePixelRatio,
    }),
    createWebAudioContext: typeof wx !== 'undefined' ? wx.createWebAudioContext : () => new AudioContext(),
    onTouchStart: typeof wx !== 'undefined' ? wx.onTouchStart : (listener) => { window.onpointerdown = (e) => (isMouseDown = true) && listener(e); window.ontouchstart = listener; },
    onTouchMove: typeof wx !== 'undefined' ? wx.onTouchMove : (listener) => { window.onpointermove = (e) => isMouseDown && listener(e); window.ontouchmove = listener; },
    onTouchEnd: typeof wx !== 'undefined' ? wx.onTouchEnd : (listener) => { window.onpointerup = (e) => { isMouseDown = false; listener(e); window.ontouchend = listener; }; },
    onTouchCancel: typeof wx !== 'undefined' ? wx.onTouchCancel : (listener) => { window.onpointercancel = (e) => { isMouseDown = false; listener(e); window.ontouchcancel = listener; }; },
    readJson: typeof wx !== 'undefined'
        ? (file) => new Promise(resolve => resolve(JSON.parse(String.fromCharCode(...new Uint8Array(wx.getFileSystemManager().readFileSync(file))))))
        : (file) => fetch(file).then(response => response.json()),
    readTxt: typeof wx !== 'undefined'
        ? (file) => new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8')))
        : (file) => fetch(file).then(response => response.text()),
    readBuffer: typeof wx !== 'undefined'
        ? (file) => new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file)))
        : (file) => fetch(file).then(response => response.arrayBuffer())
};
export const gl = device.createCanvas().getContext('webgl2');
export const phyObjs = [];
export const NUM = 0;
export default (cb) => device.createWorker("workers/worker.wasm.js", { type: 'module' }).then(async (worker) => {
    await device.readTxt("static/txt/hello.txt").then(console.log);
    vs = await device.readTxt("static/txt/vs.txt");
    fs = await device.readTxt("static/txt/fs.txt");
    await device.readBuffer("static/obj/hello.obj").then(console.log);
    await device.readBuffer("static/mtl/hello.mtl").then(console.log);
    function physicsCallback(event) {
        var data = event.data;
        if (data.isReady) {
            worker.postMessage(typeof wx !== 'undefined' ? { data: NUM } : NUM);
            return;
        }
        data.objects.forEach((object, index) => phyObjs[index] = object);
    }
    if (typeof wx !== 'undefined') {
        worker.onMessage(physicsCallback);
    }
    else {
        worker.onmessage = physicsCallback;
        worker.onerror = console.error;
    }
    const m = await import("./static/game.js");
    twgl = m.twgl;
}).then(() => cb());
if (typeof wx !== 'undefined' && typeof document === 'undefined') {
    const { windowWidth, windowHeight, pixelRatio } = device.getWindowInfo();
    (gl.canvas.clientWidth) = windowWidth * pixelRatio;
    (gl.canvas.clientHeight) = windowHeight * pixelRatio;
    (gl.canvas.width) = windowWidth * pixelRatio;
    (gl.canvas.height) = windowHeight * pixelRatio;
}
export function hexToRGBA(hexString) {
    if (/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g.test(hexString)) {
        const a = Number.parseInt(hexString.slice(1, 3), 16) / 255;
        const r = Number.parseInt(hexString.slice(3, 5), 16) / 255;
        const g = Number.parseInt(hexString.slice(5, 7), 16) / 255;
        const b = Number.parseInt(hexString.slice(7, 9), 16) / 255;
        return [r, g, b, a];
    }
    else if (/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/g.test(hexString)) {
        const r = Number.parseInt(hexString.slice(1, 3), 16) / 255;
        const g = Number.parseInt(hexString.slice(3, 5), 16) / 255;
        const b = Number.parseInt(hexString.slice(5, 7), 16) / 255;
        return [r, g, b, 255];
    }
    else {
        throw new Error(`unsupport hex color string: ${hexString}`);
    }
}
//# sourceMappingURL=global.js.map