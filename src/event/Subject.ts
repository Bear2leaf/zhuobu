import Observer from "./Observer.js";

export default class Subject {
    private readonly observers: Observer[] = [];

    register(observer: Observer): void {
        console.log(observer, "is pushed!");
        this.observers.push(observer);
    }

    unregister(observer: Observer): void {
        const n: number = this.observers.indexOf(observer);
        console.log(observer, "is removed");
        this.observers.splice(n, 1);
    }

    notify(): void {
        console.log("notify all the observers", this.observers);
        const max = this.observers.length;

        for (let i = 0; i < max; i++) {
            this.observers[i].notify();
        }
    }
}