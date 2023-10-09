import Device from "../device/Device.js";
import SingletonCollection from "./SingletonCollection.js";

export default abstract class Manager<T extends Object> extends SingletonCollection<T> {
    private device?: Device;
    setDevice(device: Device) {
        this.device = device;
    }
    getDevice() {
        if (this.device === undefined ){
            throw new Error(`device not found`);
        }
        return this.device;
    }
    abstract addObjects(): void;
    abstract load(): Promise<void>;
    abstract init(): void;
    abstract update(): void;
}