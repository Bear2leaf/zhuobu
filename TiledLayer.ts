import { gl } from "./global.js";
import Texture from "./Texture.js";
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
    draw(tilesets: TiledTileSet[], textures: Map<string, Texture>) {
        if (!this.data) {
            return []
        }
        const batchByTexture: Map<string, number[]> = new Map();
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
            const tex_xpos = ((grid - tileset.firstgid) % tileset.columns) * w;
            const tex_ypos = Math.floor((grid - tileset.firstgid) / tileset.columns) * h;
            // update VBO for each character
            const vertices = [
                xpos, ypos + h, (tex_xpos) / sheet_w, (tex_ypos + tex_h) / sheet_h,
                xpos + w, ypos, (tex_xpos + tex_w) / sheet_w, (tex_ypos) / sheet_h,
                xpos, ypos, (tex_xpos) / sheet_w, (tex_ypos) / sheet_h,
                xpos, ypos + h, (tex_xpos) / sheet_w, (tex_ypos + tex_h) / sheet_h,
                xpos + w, ypos + h, (tex_xpos + tex_w) / sheet_w, (tex_ypos + tex_h) / sheet_h,
                xpos + w, ypos, (tex_xpos + tex_w) / sheet_w, (tex_ypos) / sheet_h
            ];
            if (!batchByTexture.has(tileset.source)) {
                batchByTexture.set(tileset.source, vertices);
            } else {
                batchByTexture.get(tileset.source)!.push(...vertices);
            }
        }
        for (const key of batchByTexture.keys()) {
            const vertices = batchByTexture.get(key);
            if (vertices === undefined) {
                throw new Error("no vertices");
            }
            const texture = textures.get(key);
            if (texture === undefined) {
                throw new Error("no texture");
            }
            texture.bind();
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, new Float32Array(vertices), 0);
            gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 4);
        }
    }
}