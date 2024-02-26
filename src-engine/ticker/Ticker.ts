export default class Ticker {

    private elapsed = 0;
    delta = 0;
    now = 0;

    tick(time: number, callback: () => void) {
        this.delta = time - this.now;
        this.elapsed += this.delta;
        this.now = time;
        callback();
        requestAnimationFrame((time) => {
            this.tick(time, callback)
        })
    }
}