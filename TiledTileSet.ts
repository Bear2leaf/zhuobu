import { device } from "./global.js";

export default class TiledTileSet {
    private readonly project: string;
    readonly firstgid: number;
    readonly source: string;
    columns!: number;
    tileWidth!: number;
    tileHeight!: number;
    imageWidth!: number;
    imageHeight!: number;
    readonly image: HTMLImageElement;
    constructor(project: string, info: any) {
        this.project = project;
        this.firstgid = info.firstgid;
        this.source = info.source;
        this.image = device.createImage();
    }
    async init() {
        const info = await device.readJson("tiled/" + this.project + "/" + this.source);
        if (!info.columns || !info.imageheight || !info.imagewidth || !info.tilewidth || !info.tileheight || !info.image ) {
            throw new Error("wrong format tileset info");
        }
        this.columns = info.columns;
        this.imageHeight = info.imageheight;
        this.imageWidth = info.imagewidth;
        this.tileWidth = info.tilewidth;
        this.tileHeight = info.tileheight;
        this.image.src = "tiled/" + this.project + "/" + info.image;
        await new Promise((resolve, reject) => { this.image.onload = resolve; this.image.onerror = reject; })
    }
}