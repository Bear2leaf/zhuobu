var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var ViewPortType;
(function (ViewPortType) {
    ViewPortType[ViewPortType["Full"] = 0] = "Full";
    ViewPortType[ViewPortType["TopRight"] = 1] = "TopRight";
})(ViewPortType || (ViewPortType = {}));
function viewportTo(type) {
    const { windowWidth, windowHeight, pixelRatio } = this.getWindowInfo();
    const leftWidth = windowWidth * (2 / 3) * pixelRatio;
    const rightWidth = windowWidth * (1 / 3) * pixelRatio;
    const leftHeight = windowHeight * (2 / 3) * pixelRatio;
    const rightHeight = windowHeight * (1 / 3) * pixelRatio;
    switch (type) {
        case ViewPortType.TopRight:
            this.gl.viewport(leftWidth, leftHeight, rightWidth, rightHeight);
            this.gl.scissor(leftWidth, leftHeight, rightWidth, rightHeight);
            device.gl.clearColor(0.4, 0.4, 0.4, 1);
            break;
        default:
            this.gl.viewport(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
            this.gl.scissor(0, 0, windowWidth * pixelRatio, windowHeight * pixelRatio);
            device.gl.clearColor(0.3, 0.3, 0.3, 1);
            break;
    }
}
function clearRenderer() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
}
function getWindowInfo() {
    return this.deviceInfo;
}
class WxDevice {
    constructor() {
        this.getWindowInfo = getWindowInfo;
        this.clearRenderer = clearRenderer;
        this.viewportTo = viewportTo;
        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
        this.deviceInfo = wx.getWindowInfo();
        if (typeof document !== 'undefined') {
            this.deviceInfo.pixelRatio = 1;
        }
        this.gl = this.createCanvas().getContext('webgl2');
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
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise(resolve => {
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
            const img = device.createImage();
            img.src = "static/font/boxy_bold_font.png";
            yield new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
            return null;
        });
    }
    createImage() {
        return wx.createImage();
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
        this.getWindowInfo = getWindowInfo;
        this.clearRenderer = clearRenderer;
        this.viewportTo = viewportTo;
        this.imageCache = new Map();
        this.txtCache = new Map();
        this.fontCache = new Map();
        this.deviceInfo = {
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            pixelRatio: devicePixelRatio,
        };
        this.gl = this.createCanvas().getContext('webgl2');
        this.isMouseDown = false;
    }
    createCanvas() {
        const canvas = document.getElementById("canvas");
        if (!canvas) {
            throw new Error("canvas not exist");
        }
        canvas.width = this.deviceInfo.windowWidth * this.deviceInfo.pixelRatio;
        canvas.height = this.deviceInfo.windowHeight * this.deviceInfo.pixelRatio;
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
    device.txtCache.set("static/obj/cube.obj", yield device.readTxt("static/obj/cube.obj"));
    device.fontCache.set("static/font/font_info.json", yield device.readJson("static/font/font_info.json"));
    const img = device.createImage();
    img.src = "static/font/boxy_bold_font.png";
    yield new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    device.imageCache.set("static/font/boxy_bold_font.png", img);
    device.gl.enable(device.gl.CULL_FACE);
    device.gl.enable(device.gl.DEPTH_TEST);
    device.gl.enable(device.gl.SCISSOR_TEST);
})).then(() => cb());
//# sourceMappingURL=Device.js.map