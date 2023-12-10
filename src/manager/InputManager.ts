import Touch from "../input/Touch.js";
import Device from "../device/Device.js";
import EventManager from "./EventManager.js";
import OnEntityRegisterComponents from "../observer/OnEntityRegisterComponents.js";
import OnClick from "../observer/OnClick.js";

export default class InputManager {
    private readonly touch = new Touch();
    private eventManager?: EventManager;
    initInput(device: Device): void {
        this.touch.setDevice(device);
        this.touch.init();
        this.getEventManager().click.setTouch(this.touch);
        this.getEventManager().clickPick.setTouch(this.touch);
    }
    setEventManager(eventManager: EventManager): void {
        this.eventManager = eventManager;
    }
    getEventManager(): EventManager {
        if (this.eventManager === undefined) {
            throw new Error("eventManager is undefined");
        }
        return this.eventManager;
    }
    
    initObservers() {
        const onClick = new OnClick();
        onClick.setSubject(this.getEventManager().click);
        const onEntityRegisterComponents = new OnEntityRegisterComponents();
        onEntityRegisterComponents.setSubject(this.getEventManager().entityRegisterComponents);
        onEntityRegisterComponents.setOnClick(onClick);
        
    }
    process(): void {
        if (this.touch.getIsTouchingStart() || this.touch.getIsTouching()) {
            this.getEventManager().click.notify();
        }
    }
}