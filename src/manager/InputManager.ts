import Device from "../device/Device.js";
import EventManager from "./EventManager.js";
import OnEntityRegisterComponents from "../observer/OnEntityRegisterComponents.js";
import TouchCommand from "../command/TouchCommand.js";
import TouchStartCommand from "../command/TouchStartCommand.js";
import TouchMoveCommand from "../command/TouchMoveCommand.js";
import TouchEndCommand from "../command/TouchEndCommand.js";
export default class InputManager {
    private readonly touchCommands: TouchCommand[] = [];
    private device?: Device;
    private eventManager?: EventManager;
    getDevice() {
        if (!this.device) throw new Error("Device not set");
        return this.device;
    }
    setDevice(device: Device) {
        this.device = device;
    }
    initInput(): void {
        this.getDevice().onTouchStart((touchInfo) => {
            const command = new TouchStartCommand();
            command.setTouchInfo(touchInfo);
            command.setWindowInfo(this.getDevice().getWindowInfo());
            command.setClick(this.getEventManager().click);
            command.setClickPick(this.getEventManager().clickPick);
            this.touchCommands.push(command);
        });
        this.getDevice().onTouchMove((touchInfo) => {
            const command = new TouchMoveCommand();
            command.setTouchInfo(touchInfo);
            command.setWindowInfo(this.getDevice().getWindowInfo());
            this.touchCommands.push(command);
        });
        this.getDevice().onTouchEnd((touchInfo) => {
            const command = new TouchEndCommand();
            command.setTouchInfo(touchInfo);
            command.setWindowInfo(this.getDevice().getWindowInfo());
            this.touchCommands.push(command);
        })
        this.getDevice().onTouchCancel((touchInfo) => {
            const command = new TouchEndCommand();
            command.setTouchInfo(touchInfo);
            command.setWindowInfo(this.getDevice().getWindowInfo());
            this.touchCommands.push(command);
        })

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
        const onEntityRegisterComponents = new OnEntityRegisterComponents();
        onEntityRegisterComponents.setSubject(this.getEventManager().entityRegisterComponents);
        onEntityRegisterComponents.setOnClick(this.getEventManager().onClick);

    }
    process(): void {
        while (this.touchCommands.length > 0) {
            const command = this.touchCommands.shift();
            if (command) {
                command.execute();
            }
        }
    }
}