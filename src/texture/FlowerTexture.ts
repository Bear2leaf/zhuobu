import Device from "../device/Device.js";
import GLTexture from "./GLTexture.js";

export default class FlowerTexture extends GLTexture {
    setDevice(device: Device): void {
        super.setDevice(device);
        // this.generate(2, 2, this.getCacheManager().getImage("flowers"));

        // this.getSceneManager().first().getComponents(Flowers).forEach(comp => {
        //     comp.getEntity().get(DrawObject).setTexture(this);
        // });
    }

}