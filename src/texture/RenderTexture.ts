import Device from "../device/Device.js";
import GLTexture from "./GLTexture.js";
import { TextureBindIndex } from "./Texture.js";

export default class RenderTexture extends GLTexture {
    setDevice(device: Device): void {
        super.setDevice(device);
        this.setBindIndex(TextureBindIndex.Render);
    }
    
}