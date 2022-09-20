import m4 from "./m4";
import ResourceManager from "./resource_manager";
import SpriteRenderer from "./sprite_renderer";

enum GameState {
    GAME_ACTIVE,
    GAME_MENU,
    GAME_WIN
}

export default class Game {
    private readonly state: GameState
    private readonly keys: Array<boolean>
    private readonly width: number;
    private readonly height: number;
    renderer?: SpriteRenderer;
    constructor(width: number, height: number) {
        this.state = GameState.GAME_ACTIVE
        this.keys = new Array(1024)
        this.width = width
        this.height = height
        console.log(ResourceManager.textures, ResourceManager.shaders)
    }

    async init() {
        await ResourceManager.loadShader("shaders/sprite.vs", "shaders/sprite.fs", "sprite")
        this.renderer = new SpriteRenderer(ResourceManager.getShader("sprite"));
        const projection: Mat4 = m4.ortho(0, this.width, this.height, 0, -1, 1)

        ResourceManager.getShader('sprite').use().setInteger('sprite', 0);
        ResourceManager.getShader('sprite').setMatrix4('projection', projection);
        await ResourceManager.loadTexture('textures/awesomeface.png', true, 'face');

        console.log(projection)
    }
    processInut(dt: number) { }
    update(dt: number) { }
    render() {
        this.renderer!.clear();
        this.renderer!.drawSprite(ResourceManager.getTexture('face'), [100, 250, 0], [100, 100, 0], 45, [0, 1, 0])
    }
}