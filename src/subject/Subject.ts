import Observer from "../observer/Observer.js";

export default abstract class Subject {
    private readonly listeners: Observer[] = [];
    public register(observer: Observer): void {
        console.debug(observer, "is pushed!");
        this.listeners.push(observer);
    }

    public unregister(observer: Observer): void {
        const n: number = this.listeners.indexOf(observer);
        if (n !== -1) {
            console.debug(observer, "is removed");
            this.listeners.splice(n, 1);
        }
    }

    public notify(): void {
        // console.debug("notify all the observers", this.listeners);
        var i: number
            , max: number;

        for (i = 0, max = this.listeners.length; i < max; i += 1) {
            this.listeners[i].notify();
        }
    }
}