import Texture from "./Texture.js";
import TiledLayer from "./TiledLayer.js";
import TiledTileSet from "./TiledTileSet.js";

export default class TiledMap {
    private readonly project : string;
    private readonly layers: TiledLayer[];
    private readonly x: number;
    private readonly y: number;
    readonly tilesets: TiledTileSet[];
    readonly backgroundcolor: string;

    constructor(project: string, x: number, y: number, info: any) {
        this.project = project;
        this.layers = [];
        this.x = x;
        this.y = y;
        this.tilesets= [];
        for (const tileset of info.tilesets) {
            this.tilesets.push(new TiledTileSet(this.project, tileset));
        }
        this.tilesets.sort((b, a) => a.firstgid - b.firstgid)
        for (const layer of info.layers) {
            this.layers.push(new TiledLayer(layer));
        }
        this.backgroundcolor = info.backgroundcolor;
    }
    async init() {
        for (const tileset of this.tilesets) {
            await tileset.init();
        }
        
    }
    draw(textures: Map<string, Texture>) {
        this.layers.forEach(layer => {
            layer.draw(this.tilesets, textures)
        })
    }
}