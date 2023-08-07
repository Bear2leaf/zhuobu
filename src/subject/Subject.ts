import Component from "../component/Component.js";
import Observer from "../observer/Observer.js";

export default class Subject extends Component {
    private listeners: Observer[] = [];

    public register(observer: Observer): void {
        console.log(observer, "is pushed!");
        this.listeners.push(observer);
    }

    public unregister(observer: Observer): void {
        var n: number = this.listeners.indexOf(observer);
        console.log(observer, "is removed");
        this.listeners.splice(n, 1);
    }

    public notify(): void {
        console.log("notify all the observers", this.listeners);
        var i: number
          , max: number;

        for (i = 0, max = this.listeners.length; i < max; i += 1) {
            this.listeners[i].notify();
        }
    }
}