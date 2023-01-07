import { device } from "./Device.js";
import { Vec2 } from "./Vector.js";
export default class Texture {
    constructor() {
        this.tex = device.gl.createTexture();
        this.internalFormat = device.gl.RGBA;
        this.imageFormat = device.gl.RGBA;
        this.wrapS = device.gl.REPEAT;
        this.wrapT = device.gl.REPEAT;
        this.filterMin = device.gl.NEAREST;
        this.filterMax = device.gl.NEAREST;
        this.width = 0;
        this.height = 0;
    }
    generate(data) {
        device.gl.bindTexture(device.gl.TEXTURE_2D, this.tex);
        if (data) {
            device.gl.texImage2D(device.gl.TEXTURE_2D, 0, this.internalFormat, this.imageFormat, device.gl.UNSIGNED_BYTE, data);
            this.width = data.width;
            this.height = data.height;
        }
        else {
            device.gl.texImage2D(device.gl.TEXTURE_2D, 0, this.internalFormat, device.getWindowInfo().windowWidth, device.getWindowInfo().windowHeight, 0, this.imageFormat, device.gl.UNSIGNED_BYTE, null);
            this.width = device.getWindowInfo().windowWidth;
            this.height = device.getWindowInfo().windowHeight;
        }
        device.gl.texParameteri(device.gl.TEXTURE_2D, device.gl.TEXTURE_WRAP_S, this.wrapS);
        device.gl.texParameteri(device.gl.TEXTURE_2D, device.gl.TEXTURE_WRAP_T, this.wrapT);
        device.gl.texParameteri(device.gl.TEXTURE_2D, device.gl.TEXTURE_MIN_FILTER, this.filterMin);
        device.gl.texParameteri(device.gl.TEXTURE_2D, device.gl.TEXTURE_MAG_FILTER, this.filterMax);
        device.gl.bindTexture(device.gl.TEXTURE_2D, null);
    }
    getSize() {
        return new Vec2(this.width, this.height);
    }
    bind() {
        device.gl.bindTexture(device.gl.TEXTURE_2D, this.tex);
    }
}
//# sourceMappingURL=Texture.js.map