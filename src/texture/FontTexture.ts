import Device from "../device/Device.js";
import GLTexture from "./GLTexture.js";

export default class FontTexture extends GLTexture {
    setDevice(device: Device): void {
        super.setDevice(device);
        // this.generate(0, 0, this.getCacheManager().getImage("boxy_bold_font"));
    }

}