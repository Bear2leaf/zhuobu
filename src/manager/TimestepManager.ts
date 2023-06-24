import Game from "../game/Game.js";
import Manager from "./Manager";

export default class TimestepManager implements Manager {
    constructor(private readonly game: Game) {  }
    
}