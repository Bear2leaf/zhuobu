import Component from "../entity/Component.js";

export default class AnimationController extends Component {

    private time: number = 0;
    private paused: boolean = false;

    isPaused(): boolean {
        return this.paused;
    }
    toggle(): void {
        this.paused = !this.paused;
    }
    tick(): void {
        if (this.paused) {
            return;
        }
        this.time += 10;
    }
    getTime(): number {
        return this.time;
    }
    update(): void {
        if (this.paused) {
            return;
        }
        this.tick();
    }
}