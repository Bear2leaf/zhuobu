import State from "./State.js";

export default class StandaloneState extends State {
    init(): void {
        super.init();
        console.log("This is StandaloneState.")
    }
}