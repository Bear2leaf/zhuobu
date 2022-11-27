import GameObject from "./game_object.js";
import ResourceManager from "./resource_manager.js";
import SpriteRenderer from "./sprite_renderer.js";

export default class GameLevel {
    bricks: GameObject[] = [];
    async load(file: string, levelWidth: number, levelHeight: number, top: number) {
        this.bricks = [];
        const tileString = await ResourceManager.loadStringFromFile(file);
        const tileData: number[][] = tileString.replace(/[ \t]/g, '').split('\n').map(line => line.split('').map(c => parseInt(c)))
        if (tileData.length > 0) {
            this.init(tileData, levelWidth, levelHeight, top );
        }
    }
    draw(renderer: SpriteRenderer) {

        for (const tile of this.bricks)
            if (!tile.destroyed)
                tile.draw(renderer);
    }
    isComplete() {

        for (const tile of this.bricks)
            if (!tile.isSolid && !tile.destroyed)
                return false;
        return true;
    }
    private init(tileData: number[][], levelWidth: number, levelHeight: number, offsetTop: number) {
        const height = tileData.length;
        const width = tileData[0].length;
        const unitWidth = levelWidth / width;
        const unitHeight = levelHeight / height;
        const size: Vec2 = [unitWidth, unitHeight];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (tileData[y][x] === 1) {
                    const pos: Vec2 = [unitWidth * x, unitHeight * y + offsetTop];
                    const obj: GameObject = new GameObject(pos, size, ResourceManager.getTexture('block_solid'), [0.8, 0.8, 0.7]);
                    obj.isSolid = true;
                    this.bricks.push(obj);
                } else if (tileData[y][x] > 1) {
                    let color: Vec3 = [1, 1, 1];
                    if (tileData[y][x] === 2) {
                        color = [0.2, 0.6, 1.0];
                    } else if (tileData[y][x] === 3) {
                        color = [0.0, 0.7, 0.0];
                    } else if (tileData[y][x] === 4) {
                        color = [0.8, 0.8, 0.4];
                    } else if (tileData[y][x] === 5) {
                        color = [1.0, 0.5, 0.0];
                    }
                    const pos: Vec2 = [unitWidth * x, unitHeight * y + offsetTop];
                    this.bricks.push(new GameObject(pos, size, ResourceManager.getTexture('block'), color));
                }
            }
        }

    }
}