import Manager from "./Manager.js";


export default class AudioManager extends Manager<unknown> {
    addObjects(): void {
    }
    async load(): Promise<void> {
    }
    init(): void {
        console.log("AudioManager init");
    }
    update(): void {
    }
}