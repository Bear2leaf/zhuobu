import GameLevel from "./game_level";
import GameObject from "./game_object";
import m4 from "./m4";
import ResourceManager from "./resource_manager";
import SpriteRenderer from "./sprite_renderer";

enum GameState {
    GAME_ACTIVE,
    GAME_MENU,
    GAME_WIN
}

const PLAYER_SIZE_X = 100;
const PLAYER_SIZE_Y = 20;
const PLAYER_VELOCITY = 0.25;

export const GLFW_KEY_A = 0;
export const GLFW_KEY_D = 1;

export default class Game {
    private readonly state: GameState
    readonly keys: Array<boolean>
    readonly width: number;
    readonly height: number;
    private readonly levels: GameLevel[];
    private level: number;
    private player?: GameObject;
    renderer?: SpriteRenderer;
    constructor(width: number, height: number) {
        this.state = GameState.GAME_ACTIVE
        this.keys = new Array(1024)
        this.width = width
        this.height = height
        this.level = 0;
        this.levels = [];
    }

    async init() {
        await ResourceManager.loadShader("shaders/sprite.vs", "shaders/sprite.fs", "sprite")
        const projection: Mat4 = m4.ortho(0, this.width, this.height, 0, -1, 1)

        ResourceManager.getShader('sprite').use().setInteger('sprite', 0);
        ResourceManager.getShader('sprite').setMatrix4('projection', projection);
        this.renderer = new SpriteRenderer(ResourceManager.getShader("sprite"));
        // load textures
        await ResourceManager.loadTexture("textures/background.jpg", false, "background");
        await ResourceManager.loadTexture("textures/awesomeface.png", true, "face");
        await ResourceManager.loadTexture("textures/block.png", false, "block");
        await ResourceManager.loadTexture("textures/block_solid.png", false, "block_solid");
        await ResourceManager.loadTexture("textures/paddle.png", true, "paddle");
        // load levels
        const one: GameLevel = new GameLevel();
        await one.load("levels/one.lvl", this.width, this.height / 2);
        const two: GameLevel = new GameLevel();
        await two.load("levels/two.lvl", this.width, this.height / 2);
        const three: GameLevel = new GameLevel();
        await three.load("levels/three.lvl", this.width, this.height / 2);
        const four: GameLevel = new GameLevel();
        await four.load("levels/four.lvl", this.width, this.height / 2);
        this.levels.push(one);
        this.levels.push(two);
        this.levels.push(three);
        this.levels.push(four);


        const playerPos: Vec2 = [this.width / 2.0 - PLAYER_SIZE_X / 2, this.height - PLAYER_SIZE_Y]
        this.player = new GameObject(playerPos, [PLAYER_SIZE_X, PLAYER_SIZE_Y], ResourceManager.getTexture('paddle'));
    }
    processInut(dt: number) {
        if (this.state == GameState.GAME_ACTIVE) {
            const velocity = PLAYER_VELOCITY * dt;
            // move playerboard
            if (this.keys[GLFW_KEY_A]) {
                if (this.player!.position[0] >= 0.0)
                    this.player!.position[0] -= velocity;
            }
            if (this.keys[GLFW_KEY_D]) {
                if (this.player!.position[0] <= this.width - this.player!.size[0])
                    this.player!.position[0] += velocity;
            }
        }
    }
    update(dt: number) {
    }
    render() {
        if (this.state === GameState.GAME_ACTIVE) {
            this.renderer!.clear()
            this.renderer!.drawSprite(ResourceManager.getTexture('background'), [0, 0, 0], [this.width, this.height, 0])
            this.levels[this.level].draw(this.renderer!);
            this.player!.draw(this.renderer!);
        }
    }
}