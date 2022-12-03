export default interface Renderer {
    init(): Promise<void>;
    drawText(x: number, y: number, scale: number, spacing: number, color: [number, number, number, number], ...chars: string[]): void;
}