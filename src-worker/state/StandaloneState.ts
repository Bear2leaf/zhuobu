import State from "./State.js";

export default class StandaloneState extends State {
    init(): void {
        super.init();
        console.log("This is StandaloneState.")
        this.device.emit({
            type: "SendModelTranslation",
            broadcast: true,
            args: [[0, 0, 0]]
        })
    }
}