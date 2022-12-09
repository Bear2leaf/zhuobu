import { device } from "./global.js";
import TiledMap from "./TiledMap.js";

export default class TiledWorld {
    private readonly project: string;
    readonly maps: TiledMap[];
    constructor(id : string) {
        this.project = id;
        this.maps = [];
    }
    async init() {
        const mapInfos = await device.readJson("/world.json");
        for (const mapInfo of mapInfos.maps) {
            const info = await device.readJson("tiled/" + this.project + "/" + mapInfo.fileName);
            const tiledMap = new TiledMap(this.project, mapInfo.x, mapInfo.y, info);
            await tiledMap.init();
            this.maps.push(tiledMap);
        }
    }
    getBgColor(): string {
        return this.maps[0].backgroundcolor;
    }
    getVertices() {
        return this.maps.reduce<number[]>((prev, cur) => {
            prev.push(...cur.getVertices());
            return prev;
        },[]);
    }
}