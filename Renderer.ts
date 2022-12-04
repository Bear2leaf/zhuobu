import GameObject from "./GameObject.js";

export default interface Renderer {
    init(): Promise<void>;
    render(): void;
    add(gameObject: GameObject): void;
}