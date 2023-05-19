import BrowserDevice from "../device/BrowserDevice.js";
import DFactory from "../factory/DrawObjectFactory.js";
import Texture from "../texture/Texture.js";

// component without shadow dom, test drawobject factory
export default class DrawObjectFactory extends HTMLElement {
    constructor() {
        super();
        const canvas = this.parentElement?.getElementsByTagName("canvas")?.item(0) || 'canvas';
        const device = new BrowserDevice(canvas);
        const texture = new Texture(device.gl, 1, 1);
        const factory = new DFactory(device.gl, texture);
        factory.createGasket();
        this.appendChild(document.createTextNode("DrawObjectFactory"));
    }
}
