
export default interface Renderer {
    init(): Promise<void>;
    render(): void;
}