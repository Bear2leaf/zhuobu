import Click from "../subject/Click.js";
import TouchCommand from "./TouchCommand.js";

export default class TouchStartCommand extends TouchCommand {
    private click?: Click;

    setClick(click?: Click) {
        this.click = click;
    }
    getClick(): Click {
        if (!this.click) throw new Error("Click not set");
        return this.click;
    }
    execute(): void {
        this.getClick().setPosition(this.getX(), this.getY());
        this.getClick().notify();
    }
}