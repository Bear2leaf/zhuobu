export default class Clock {
    elapsed = 0;
    frames = 0;
    pause = true;
    delta = 0;
    now = 0;
    fps = 0;
    tick(time: number) {
        this.delta = time - this.now;
        this.elapsed += this.delta;
        this.now = time;
        this.frames++;
        if (this.elapsed > 1000) {
            this.fps = this.frames / this.elapsed * 1000
            this.elapsed = 0;
            this.frames = 0;
        }
    }
}