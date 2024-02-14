import { WorkerRequest } from "../worker/WorkerMessageType.js";
import Observer from "./Observer.js";

export default class OnCameraFovChange extends Observer {
    postMessage?: (data: WorkerRequest) => void;
    fov: number = 0;
    oldFov: number = 0;
    public notify(): void {
        if (this.fov === this.oldFov) {
            return;
        }
        this.oldFov = this.fov;
        this.postMessage!(
            { type: "UpdateCameraFov", args: [this.fov] }
        )
    }

}
