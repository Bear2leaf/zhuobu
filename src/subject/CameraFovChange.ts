import Observer from "../observer/Observer.js";
import OnCameraFovChange from "../observer/OnCameraFovChange.js";
import Subject from "./Subject.js";

export default class CameraFovChange extends Subject {
    fov: number = 0;


    private readonly observers: (OnCameraFovChange)[] = [];
    public register(observer: Observer): void {
        if (observer instanceof OnCameraFovChange) {
            this.observers.push(observer);
        } else {
            throw new Error("Not support observer");
        }
        super.register(observer);
    }
    public notify(): void {
        this.observers.forEach(observer => {
            if (observer instanceof OnCameraFovChange) {
                observer.fov = this.fov;
            } else {
                throw new Error("Not support observer");
            }
        })
        super.notify();
    }
}
