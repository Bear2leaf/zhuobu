import Game from "../game/Game.js";
import Manager from "./Manager.js";


export default class AudioManager implements Manager {
    constructor(private readonly game: Game) {
    }
    load(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    init(): void {
        throw new Error("Method not implemented.");
    }
    tick(): void {
        throw new Error("Method not implemented.");
    }
}