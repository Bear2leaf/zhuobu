var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GameObject from "./game_object.js";
import ResourceManager from "./resource_manager.js";
export default class GameLevel {
    constructor() {
        this.bricks = [];
    }
    load(file, levelWidth, levelHeight, top) {
        return __awaiter(this, void 0, void 0, function* () {
            this.bricks = [];
            const tileString = yield ResourceManager.loadStringFromFile(file);
            const tileData = tileString.replace(/[ \t]/g, '').split('\n').map(line => line.split('').map(c => parseInt(c)));
            if (tileData.length > 0) {
                this.init(tileData, levelWidth, levelHeight, top);
            }
        });
    }
    draw(renderer) {
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
    init(tileData, levelWidth, levelHeight, offsetTop) {
        const height = tileData.length;
        const width = tileData[0].length;
        const unitWidth = levelWidth / width;
        const unitHeight = levelHeight / height;
        const size = [unitWidth, unitHeight];
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                if (tileData[y][x] === 1) {
                    const pos = [unitWidth * x, unitHeight * y + offsetTop];
                    const obj = new GameObject(pos, size, ResourceManager.getTexture('block_solid'), [0.8, 0.8, 0.7]);
                    obj.isSolid = true;
                    this.bricks.push(obj);
                }
                else if (tileData[y][x] > 1) {
                    let color = [1, 1, 1];
                    if (tileData[y][x] === 2) {
                        color = [0.2, 0.6, 1.0];
                    }
                    else if (tileData[y][x] === 3) {
                        color = [0.0, 0.7, 0.0];
                    }
                    else if (tileData[y][x] === 4) {
                        color = [0.8, 0.8, 0.4];
                    }
                    else if (tileData[y][x] === 5) {
                        color = [1.0, 0.5, 0.0];
                    }
                    const pos = [unitWidth * x, unitHeight * y + offsetTop];
                    this.bricks.push(new GameObject(pos, size, ResourceManager.getTexture('block'), color));
                }
            }
        }
    }
}
//# sourceMappingURL=game_level.js.map