import Click from "../subject/Click.js";
import ClickPickSubject from "../subject/ClickPick.js";
import TouchCommand from "./TouchCommand.js";

export default class TouchStartCommand extends TouchCommand {
    private click?: Click;
    private clickPick?: ClickPickSubject;

    setClick(click?: Click) {
        this.click = click;
    }
    getClick(): Click {
        if (!this.click) throw new Error("Click not set");
        return this.click;
    }
    setClickPick(clickPick?: ClickPickSubject) {
        this.clickPick = clickPick;
    }
    getClickPick(): ClickPickSubject {
        if (!this.clickPick) throw new Error("ClickPick not set");
        return this.clickPick;
    }
    execute(): void {
        this.getClick().setPosition(this.getX(), this.getY());
        this.getClickPick().setPosition(this.getX(), this.getY());
        this.getClick().notify();
        this.getClickPick().notify();
    }
}