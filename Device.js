var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WxDevice {
    constructor() {
        this.deviceInfo = wx.getWindowInfo();
        this.gl = this.createCanvas().getContext('webgl2');
    }
    clearRenderer() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    createCanvas() {
        const canvas = wx.createCanvas();
        if (typeof document === 'undefined') {
            const { windowWidth, windowHeight, pixelRatio } = this.deviceInfo;
            (canvas.clientWidth) = windowWidth * pixelRatio;
            (canvas.clientHeight) = windowHeight * pixelRatio;
            (canvas.width) = windowWidth * pixelRatio;
            (canvas.height) = windowHeight * pixelRatio;
        }
        return canvas;
    }
    loadSubpackage() {
        return new Promise(resolve => {
            const task = wx.loadSubpackage({
                name: "static",
                success(res) {
                    console.log("load static success", res);
                    resolve(null);
                },
                fail(res) {
                    console.error("load static fail", res);
                }
            });
            task.onProgressUpdate((res) => {
                console.log(res.progress); // 可通过 onProgressUpdate 接口监听下载进度
                console.log(res.totalBytesWritten);
                console.log(res.totalBytesExpectedToWrite);
            });
        });
    }
    createImage() {
        return wx.createImage();
    }
    getWindowInfo() {
        return this.deviceInfo;
    }
    createWebAudioContext() {
        return wx.createWebAudioContext();
    }
    onTouchStart(listener) {
        wx.onTouchStart((e) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist");
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchMove(listener) {
        wx.onTouchMove((e) => {
            const touch = e.touches[0];
            if (!touch) {
                throw new Error("touch not exist");
            }
            listener({ x: touch.clientX, y: touch.clientY });
        });
    }
    onTouchEnd(listener) {
        wx.onTouchEnd((e) => {
            listener();
        });
    }
    onTouchCancel(listener) {
        wx.onTouchCancel((e) => {
            listener();
        });
    }
    readJson(file) {
        return new Promise(resolve => resolve(JSON.parse(String.fromCharCode(...new Uint8Array(wx.getFileSystemManager().readFileSync(file))))));
    }
    readTxt(file) {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file, 'utf-8')));
    }
    readBuffer(file) {
        return new Promise(resolve => resolve(wx.getFileSystemManager().readFileSync(file)));
    }
}
class BrowserDevice {
    constructor() {
        this.gl = this.createCanvas().getContext('webgl2');
        this.isMouseDown = false;
    }
    clearRenderer() {
        this.gl.clearColor(0, 0, 0, 1);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
    createCanvas() {
        const canvas = document.getElementById("canvas");
        if (!canvas) {
            throw new Error("canvas not exist");
        }
        canvas.width = this.getWindowInfo().windowWidth * this.getWindowInfo().pixelRatio;
        canvas.height = this.getWindowInfo().windowHeight * this.getWindowInfo().pixelRatio;
        return canvas;
    }
    loadSubpackage() {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    createImage() {
        return new Image();
    }
    getWindowInfo() {
        return {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pixelRatio: devicePixelRatio,
        };
    }
    createWebAudioContext() {
        return new AudioContext();
    }
    onTouchStart(listener) {
        window.onpointerdown = (e) => {
            this.isMouseDown = true;
            listener({ x: e.clientX, y: e.clientY });
        };
    }
    onTouchMove(listener) {
        window.onpointermove = (e) => {
            if (this.isMouseDown) {
                listener({ x: e.clientX, y: e.clientY });
            }
        };
    }
    onTouchEnd(listener) {
        window.onpointerup = (e) => {
            this.isMouseDown = false;
            listener({ x: e.clientX, y: e.clientY });
        };
    }
    onTouchCancel(listener) {
        window.onpointercancel = (e) => {
            this.isMouseDown = false;
            listener({ x: e.clientX, y: e.clientY });
        };
    }
    readJson(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(file);
            return yield response.json();
        });
    }
    readTxt(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(file);
            return yield response.text();
        });
    }
    readBuffer(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(file);
            return yield response.arrayBuffer();
        });
    }
}
export const device = typeof wx !== 'undefined' ? new WxDevice() : new BrowserDevice();
export default (cb) => device.loadSubpackage().then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield device.readTxt("static/txt/hello.txt").then(console.log);
    yield device.readJson("static/gltf/hello.gltf").then(console.log);
    yield device.readBuffer("static/gltf/hello.bin").then(console.log);
})).then(() => cb());
//# sourceMappingURL=Device.js.map