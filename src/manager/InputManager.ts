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
        if (this.touch.getIsTouchingStart()) {

            const x = this.touch.getX();
            const y = this.touch.getY();
            this.getEventManager().click.setPosition(x, y);
            this.getEventManager().click.notify();
            this.getEventManager().clickPick.setPosition(x, y);
            this.getEventManager().clickPick.checkIsPicked();
            this.touch.setIsTouchingStart(false);
        }
    }
}