import Observer from "../observer/Observer.js";
import OnCameraChange from "../observer/OnCameraFovChange.js";
import Subject from "./Subject.js";

export default class CameraFovChange extends Subject {
    fov: number = 0;


    private readonly observers: (OnCameraChange)[] = [];
    public register(observer: Observer): void {
        if (observer instanceof OnCameraChange) {
            this.observers.push(observer);
        } else {
            throw new Error("Not support observer");
        }
        super.register(observer);
    }
    public notify(): void {
        this.observers.forEach(observer => {
            if (observer instanceof OnCameraChange) {
                observer.fov = this.fov;
            } else {
                throw new Error("Not support observer");
            }
        })
        super.notify();
    }
}
