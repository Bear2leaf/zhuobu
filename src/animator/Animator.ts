import Component from "../component/Component.js";

export default class Animator extends Component {
    private time: number = 0;
    private paused: boolean = false;

    setTime(time: number): void {
        this.time = time;
    }
    getTime(): number {
        return this.time;
    }
    animate(): void {
        throw new Error("Method not implemented.");
    }
    update(): void {
        this.animate();
    }
    isPaused(): boolean {
        return this.paused;
    }
    toggle(): void {
        this.paused = !this.paused;
    }
}