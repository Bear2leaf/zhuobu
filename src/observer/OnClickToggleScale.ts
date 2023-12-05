import Click from "../subject/Click.js";
import TRS from "../transform/TRS.js";
import Observer from "./Observer.js";

export default class OnClickToggleScale extends Observer {
    private isScaleUp: boolean = false;

    init(): void {
        console.debug("OnClickToggleScale", "is inited!");
        this.getSubject().register(this);
    }

    public notify(): void {
        // const trs = this.getEntity().get(TRS);
        // this.isScaleUp = !this.isScaleUp;
        // if (this.isScaleUp) {
        //     trs.getScale().x = 2;
        //     trs.getScale().y = 2;
        // } else {
        //     trs.getScale().x = 1;
        //     trs.getScale().y = 1;
        // }
    }

}
