
import Device from "../device/Device.js";
import GLTexture from "./GLTexture.js";
import { TextureBindIndex } from "./Texture.js";

export default class JointTexture extends GLTexture {
    setDevice(device: Device): void {
        this.setBindIndex(TextureBindIndex.Joint);
        super.setDevice(device);
    }
}