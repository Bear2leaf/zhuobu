import EventManager from "./EventManager.js";
import SingleColorCanvas from "../canvas/SingleColorCanvas.js";
import SDFCanvas from "../canvas/SDFCanvas.js";
import Device from "../device/Device.js";
import OnEntityRegisterComponents from "../observer/OnEntityRegisterComponents.js";


export default class OffscreenCanvasManager {
    private readonly offscreenCanvas = new SingleColorCanvas;
    private readonly sdfCanvas = new SDFCanvas;
    private eventManager?: EventManager
    setEventManager(eventManager: EventManager) {
        this.eventManager = eventManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    initObservers() {
        const observer = new OnEntityRegisterComponents();
        observer.setSubject(this.getEventManager().entityRegisterComponents);
        observer.setSDFCanvas(this.sdfCanvas);
    }
    setDevice(device: Device): void {
        this.offscreenCanvas.setContext(device.getOffscreenCanvasRenderingContext());
        this.sdfCanvas.setContext(device.getSDFCanvasRenderingContext());
    }
}