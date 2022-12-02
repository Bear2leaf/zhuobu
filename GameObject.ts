import Renderer from "./Renderer.js";

export default interface GameObject {
    update(): void;
    draw(renderer: Renderer): void;

}