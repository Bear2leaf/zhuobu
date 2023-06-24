import Game from "../game/Game.js";
import Manager from "./Manager.js";

export default class RendererManager implements Manager {
    constructor(private readonly game: Game) { }
}