import TiledTileSet from "./TiledTileSet.js";

export default class TiledLayer {
    private readonly x: number;
    private readonly y: number;
    private readonly width: number;
    private readonly height: number;
    private readonly data?: number[];
    constructor(layer: any) {
        this.x = layer.x;
        this.y = layer.y;
        this.width = layer.width;
        this.height = layer.height;
        this.data = layer.data;
    }
    getVertices(tilesets: TiledTileSet[]): number[] {
        if (!this.data) {
            return []
        }
        const batch: number[] = [];
        for (let index = 0; index < this.data.length; index++) {
            const grid = this.data[index];
            if (!grid) {
                continue;
            }
            const tileset = tilesets.find(o => o.firstgid <= grid)
            if (!tileset) {
                throw new Error("tileset not found");
            }
            const sheet_h = tileset.imageHeight;
            const sheet_w = tileset.imageWidth;
            const h = tileset.tileHeight;
            const w = tileset.tileWidth;
            const xpos = this.x + (index % this.width) * w;
            const ypos = this.y + Math.floor(index / this.width) * h;
            const tex_h = tileset.tileHeight;
            const tex_w = tileset.tileWidth;
            const tex_xpos = ((grid - 1) % tileset.columns) * w;
            const tex_ypos = Math.floor((grid - 1) / tileset.columns) * h;
            // update VBO for each character
            const vertices = new Float32Array([
                xpos, ypos + h, (tex_xpos) / sheet_w, (tex_ypos + tex_h) / sheet_h,
                xpos + w, ypos, (tex_xpos + tex_w) / sheet_w, (tex_ypos) / sheet_h,
                xpos, ypos, (tex_xpos) / sheet_w, (tex_ypos) / sheet_h,
                xpos, ypos + h, (tex_xpos) / sheet_w, (tex_ypos + tex_h) / sheet_h,
                xpos + w, ypos + h, (tex_xpos + tex_w) / sheet_w, (tex_ypos + tex_h) / sheet_h,
                xpos + w, ypos, (tex_xpos + tex_w) / sheet_w, (tex_ypos) / sheet_h
            ]);
            batch.push(...vertices);
        }
        return batch;
    }
}