var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import GameLevel from "./game_level";
import GameObject from "./game_object";
import m4 from "./m4";
import ResourceManager from "./resource_manager";
import SpriteRenderer from "./sprite_renderer";
var GameState;
(function (GameState) {
    GameState[GameState["GAME_ACTIVE"] = 0] = "GAME_ACTIVE";
    GameState[GameState["GAME_MENU"] = 1] = "GAME_MENU";
    GameState[GameState["GAME_WIN"] = 2] = "GAME_WIN";
})(GameState || (GameState = {}));
const PLAYER_SIZE_X = 100;
const PLAYER_SIZE_Y = 20;
const PLAYER_VELOCITY = 0.25;
export const GLFW_KEY_A = 0;
export const GLFW_KEY_D = 1;
export default class Game {
    constructor(width, height) {
        this.state = GameState.GAME_ACTIVE;
        this.keys = new Array(1024);
        this.width = width;
        this.height = height;
        this.level = 0;
        this.levels = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ResourceManager.loadShader("shaders/sprite.vs", "shaders/sprite.fs", "sprite");
            const projection = m4.ortho(0, this.width, this.height, 0, -1, 1);
            ResourceManager.getShader('sprite').use().setInteger('sprite', 0);
            ResourceManager.getShader('sprite').setMatrix4('projection', projection);
            this.renderer = new SpriteRenderer(ResourceManager.getShader("sprite"));
            // load textures
            yield ResourceManager.loadTexture("textures/background.jpg", false, "background");
            yield ResourceManager.loadTexture("textures/awesomeface.png", true, "face");
            yield ResourceManager.loadTexture("textures/block.png", false, "block");
            yield ResourceManager.loadTexture("textures/block_solid.png", false, "block_solid");
            yield ResourceManager.loadTexture("textures/paddle.png", true, "paddle");
            // load levels
            const one = new GameLevel();
            yield one.load("levels/one.lvl", this.width, this.height / 2);
            const two = new GameLevel();
            yield two.load("levels/two.lvl", this.width, this.height / 2);
            const three = new GameLevel();
            yield three.load("levels/three.lvl", this.width, this.height / 2);
            const four = new GameLevel();
            yield four.load("levels/four.lvl", this.width, this.height / 2);
            this.levels.push(one);
            this.levels.push(two);
            this.levels.push(three);
            this.levels.push(four);
            const playerPos = [this.width / 2.0 - PLAYER_SIZE_X / 2, this.height - PLAYER_SIZE_Y];
            this.player = new GameObject(playerPos, [PLAYER_SIZE_X, PLAYER_SIZE_Y], ResourceManager.getTexture('paddle'));
        });
    }
    processInut(dt) {
        if (this.state == GameState.GAME_ACTIVE) {
            const velocity = PLAYER_VELOCITY * dt;
            // move playerboard
            if (this.keys[GLFW_KEY_A]) {
                if (this.player.position[0] >= 0.0)
                    this.player.position[0] -= velocity;
            }
            if (this.keys[GLFW_KEY_D]) {
                if (this.player.position[0] <= this.width - this.player.size[0])
                    this.player.position[0] += velocity;
            }
        }
    }
    update(dt) {
    }
    render() {
        if (this.state === GameState.GAME_ACTIVE) {
            this.renderer.clear();
            this.renderer.drawSprite(ResourceManager.getTexture('background'), [0, 0, 0], [this.width, this.height, 0]);
            this.levels[this.level].draw(this.renderer);
            this.player.draw(this.renderer);
        }
    }
}
//# sourceMappingURL=game.js.map