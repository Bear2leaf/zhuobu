import { device } from "./global.js";

export default class TiledTileSet {
    private readonly project: string;
    private readonly firstgid: number;
    private readonly source: string;
    readonly image: HTMLImageElement;
    constructor(project: string, info: any) {
        this.project = project;
        this.firstgid = info.firstgid;
        this.source = info.source;
        this.image = device.createImage();
    }
    async init() {
        const tilesetInfo = await device.readJson("tiled/" + this.project + "/" + this.source);
        this.image.src = "tiled/" + this.project + "/" + tilesetInfo.image;
        await new Promise((resolve, reject) => { this.image.onload = resolve; this.image.onerror = reject; })
    }
}