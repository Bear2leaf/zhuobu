var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import m4 from "./m4";
import ResourceManager from "./resource_manager";
import SpriteRenderer from "./sprite_renderer";
var GameState;
(function (GameState) {
    GameState[GameState["GAME_ACTIVE"] = 0] = "GAME_ACTIVE";
    GameState[GameState["GAME_MENU"] = 1] = "GAME_MENU";
    GameState[GameState["GAME_WIN"] = 2] = "GAME_WIN";
})(GameState || (GameState = {}));
export default class Game {
    constructor(width, height) {
        this.state = GameState.GAME_ACTIVE;
        this.keys = new Array(1024);
        this.width = width;
        this.height = height;
        console.log(ResourceManager.textures, ResourceManager.shaders);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ResourceManager.loadShader("shaders/sprite.vs", "shaders/sprite.fs", "sprite");
            this.renderer = new SpriteRenderer(ResourceManager.getShader("sprite"));
            const projection = m4.ortho(0, this.width, this.height, 0, -1, 1);
            ResourceManager.getShader('sprite').use().setInteger('sprite', 0);
            ResourceManager.getShader('sprite').setMatrix4('projection', projection);
            yield ResourceManager.loadTexture('textures/awesomeface.png', true, 'face');
            console.log(projection);
        });
    }
    processInut(dt) { }
    update(dt) { }
    render() {
        this.renderer.clear();
        this.renderer.drawSprite(ResourceManager.getTexture('face'), [100, 250, 0], [100, 100, 0], 45, [0, 1, 0]);
    }
}
//# sourceMappingURL=game.js.map