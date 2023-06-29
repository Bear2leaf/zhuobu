import Manager from "./Manager.js";

export default class CameraManager extends Manager<unknown> {
    init(): void {
        console.log("CameraManager init");
    }
}