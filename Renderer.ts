export default interface Renderer {
init(): Promise<void>;
    drawText(x: number, y: number, scale: number, color: [number, number, number, number], spacing: number, ...chars: string[]): void;
}