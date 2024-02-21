export default class Ticker {

    private elapsed = 0;
    private delta = 0;
    now = 0;

    tick(time: number, callback: () => void) {
        this.delta = time - this.now;
        this.elapsed += this.delta;
        this.now = time;

        requestAnimationFrame((time) => {
            callback();
            this.tick(time, callback)
        })
    }
}