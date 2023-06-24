import Game from "../game/Game.js";
import Manager from "./Manager.js";

export default class SceneManager implements Manager {
    constructor(private readonly game: Game) { }
}