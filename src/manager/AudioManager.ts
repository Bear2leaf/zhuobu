import DemoAudio from "../audio/DemoAudio.js";
import Manager from "./Manager.js";


export default class AudioManager extends Manager<unknown> {
    addObjects(): void {
        [
            DemoAudio
        ].forEach(ctor => {
            this.add(ctor);
        });
    }
    async load(): Promise<void> {
    }
    init(): void {
        
    }
    update(): void {
    }
}