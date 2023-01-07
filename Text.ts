
export default class Text {
    x: number;
    y: number;
    scale: number;
    readonly color: [number, number, number, number];
    readonly spacing: number;
    readonly chars: string[]
    readonly originX: number;
    readonly originY: number;
    constructor(x: number, y: number, scale: number, color: [number, number, number, number], spacing: number, ...chars: string[]) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.color = color;
        this.spacing = spacing;
        this.chars = chars;
        this.originX = 0;
        this.originY = 0;
    }

}