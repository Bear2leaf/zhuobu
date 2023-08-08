import Component from "./Component.js";
import TRS from "./TRS.js";


export default class SinAnimation extends Component {
    private frame: number = 0;
    private paused: boolean = false;
    update(): void {
        if (this.paused) return;
        this.frame++;
        this.getEntity().get(TRS).getScale().set(10, 10, 1, 1);
        this.getEntity().get(TRS).getPosition().set(Math.sin(this.frame * 0.05) * 150 + 150, Math.cos(this.frame * 0.05) * 150 + 150, 0, 1);
    }
    toggle(): void {
        this.paused = !this.paused;
    }
}