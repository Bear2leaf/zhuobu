
import Device, { DeviceInfo, TouchInfoFunction, ViewPortType } from "../device/Device.js";
import Game from "../game/Game.js";
import RenderingContext from "../renderingcontext/RenderingContext.js";
import Manager from "./Manager.js";

export default class DeviceManager implements Manager {
    constructor(private readonly device: Device) {
    }
    get gl(): RenderingContext { return this.device.gl };
    getDeviceInfo(): DeviceInfo { return this.device.getDeviceInfo() };
    viewportTo(type: ViewPortType): void { this.device.viewportTo(type) };
    now(): number { return this.device.now() };
    loadSubpackage(): Promise<null> { return this.device.loadSubpackage() };
    createImage(): HTMLImageElement { return this.device.createImage() };
    createWorker(path: string, handlerCallback: Function): void { this.device.createWorker(path, handlerCallback) };
    createWebAudioContext(): AudioContext { return this.device.createWebAudioContext() };
    onTouchStart(listener: TouchInfoFunction): void { this.device.onTouchStart(listener) };
    onTouchMove(listener: TouchInfoFunction): void { this.device.onTouchMove(listener) };
    onTouchEnd(listener: TouchInfoFunction): void { this.device.onTouchEnd(listener) };
    onTouchCancel(listener: TouchInfoFunction): void { this.device.onTouchCancel(listener) };
    readJson(file: string): Promise<Object> { return this.device.readJson(file) };
    readTxt(file: string): Promise<string> { return this.device.readTxt(file) };
    readBuffer(file: string): Promise<ArrayBuffer> { return this.device.readBuffer(file) };
}