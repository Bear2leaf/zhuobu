import Device from "../device/Device.js";


export default abstract class Cache<T> {
    protected device?: Device;
    abstract load(name: string): Promise<void>;
    abstract get(name: string): T;
    setDevice(device: Device): void {
        this.device = device;
    }
    getDevice(): Device {
        if (this.device === undefined) throw new Error(`device not found`);
        return this.device;
    }
    
}