import Component from "../entity/Component.js";

export default class Animator extends Component {
    private time: number = 0;
    private paused: boolean = false;

    tick(): void {
        if (this.paused) {
            return;
        }
        this.time += 10;
    }
    getTime(): number {
        return this.time;
    }
    animate(): void {
        throw new Error("Method not implemented.");
    }
    update(): void {
        if (this.paused) {
            return;
        }
        this.animate();
    }
    isPaused(): boolean {
        return this.paused;
    }
    toggle(): void {
        this.paused = !this.paused;
    }
}