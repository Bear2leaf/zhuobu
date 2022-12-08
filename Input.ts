export default class Input {
    private pressed: boolean;
    readonly origin: [number, number];
    readonly current: [number, number];
    get delta() {
        return [this.current[0] - this.origin[0], this.current[1] - this.origin[1]];
    }
    constructor() {
        this.pressed = false;
        this.origin = [0, 0];
        this.current = [0, 0];
    }
    update(current: [number, number], pressed: boolean) {
        current[0] = Math.floor(current[0]);
        current[1] = Math.floor(current[1]);
        if (!pressed) {
            current[0] = this.origin[0];
            current[1] = this.origin[1];
        }
        if (~this.pressed ^ ~pressed) {
            this.origin[0] = current[0];
            this.origin[1] = current[1];
        }
        this.current[0] = current[0];
        this.current[1] = current[1];
        this.pressed = pressed;

    }
}