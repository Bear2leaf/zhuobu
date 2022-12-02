import Renderer from "./Renderer";

export default interface GameObject {
    update(): void;
    draw(renderer: Renderer): void;

}