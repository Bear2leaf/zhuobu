import Manager from "./Manager.js";


export default class AudioManager extends Manager<unknown> {
    init(): void {
        console.log("AudioManager init");
    }
}