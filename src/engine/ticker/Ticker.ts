export default class Ticker {
    private elapsed = 0;
    pause = true;
    delta = 0;
    now = 0;
    callback?: () => void;
    tick(time: number) {
        this.delta = time - this.now;
        this.elapsed += this.delta;
        this.now = time;
        this.callback!();
    }
}