import Observer from "./Observer.js";

export default class OnCameraChange extends Observer {
    postMessage?: (data: WorkerRequest) => void;
    fov: number = 0;
    oldFov: number = 0;
    public notify(): void {
        if (this.fov === this.oldFov) {
            return;
        }
        this.oldFov = this.fov;
        this.postMessage!(
            { type: "UpdateCamera", args: [this.fov] }
        )
    }

}
