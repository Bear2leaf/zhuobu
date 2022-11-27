import AudioManager from "./audio_engine.js";
import BallObject from "./ball_object.js";
import GameLevel from "./game_level.js";
import GameObject from "./game_object.js";
import m4 from "./m4.js";
import { Device } from "./resource_manager.js";
import ParticleGenerator from "./particle_generator.js";
import PostProcessor from "./post_processor.js";
import PowerUp from "./power_up.js";
import ResourceManager from "./resource_manager.js";
import SpriteRenderer from "./sprite_renderer.js";
import TextRenderer from "./text_renderer.js";
import v3 from "./v3.js";

export enum GameState {
    GAME_ACTIVE,
    GAME_MENU,
    GAME_WIN
}

enum Direction {
    UP,
    RIGHT,
    DOWN,
    LEFT
}

type Collision = [boolean, Direction, Vec2]
const PIXEL_RATIO = !Device.getDeviceInfo ? Device.getWindowInfo().pixelRatio : 1;
const PLAYER_SIZE_X = 100 * PIXEL_RATIO;
const PLAYER_SIZE_Y = 20 * PIXEL_RATIO;
const PLAYER_VELOCITY = 500 * PIXEL_RATIO;
const BALL_RADIUS = 12.5 * PIXEL_RATIO;
const INITIAL_BALL_VELOCITY_X: number = 100 * PIXEL_RATIO
const INITIAL_BALL_VELOCITY_Y: number = -350 * PIXEL_RATIO

export const GLFW_KEY_A = 0;
export const GLFW_KEY_D = 1;
export const GLFW_KEY_SPACE = 2;
export const GLFW_KEY_ENTER = 3;
export const GLFW_KEY_W = 4;
export const GLFW_KEY_S = 5;

export default class Game {

    private readonly audioManager: AudioManager;
    state: GameState
    readonly keys: Array<boolean>
    readonly keysProcessed: Array<boolean>
    private readonly top: number;
    private readonly bottom: number;
    private readonly width: number;
    private readonly height: number;
    private readonly levels: GameLevel[];
    private readonly powerUps: PowerUp[];
    private level: number;
    private lives: number;
    player?: GameObject;
    private ball?: BallObject;
    private renderer?: SpriteRenderer;
    private text?: TextRenderer;
    private particles?: ParticleGenerator;
    private readonly collision: Collision;
    private effects?: PostProcessor;
    private shakeTime: number = 0;


    constructor(top: number, bottom: number, windowWidth: number, windowHeight: number) {
        this.audioManager = new AudioManager();
        this.state = GameState.GAME_MENU
        this.keys = new Array(1024)
        this.keysProcessed = new Array(1024)
        this.top = top
        this.bottom = bottom
        this.width = windowWidth
        this.height = windowHeight
        this.level = 0;
        this.lives = 3;
        this.levels = [];
        this.powerUps = [];
        this.collision = [false, Direction.UP, [0, 0]];
    }
    async init() {
        Device.showLoading({ title: '初始化' })
        const projection: Mat4 = m4.ortho(0, this.width, this.height, 0, -1, 1)
        await ResourceManager.loadShader("shaders/sprite.vs", "shaders/sprite.fs", "sprite")
        await ResourceManager.loadShader("shaders/text_2d.vs", "shaders/text_2d.fs", "text_2d")
        await ResourceManager.loadShader("shaders/particle.vs", "shaders/particle.fs", "particle")
        await ResourceManager.loadShader("shaders/post_processing.vs", "shaders/post_processing.fs", "postprocessing");


        ResourceManager.getShader('sprite').use().setInteger('sprite', 0);
        ResourceManager.getShader('sprite').setMatrix4('projection', projection);
        ResourceManager.getShader('text_2d').use().setInteger('u_texture', 0);
        ResourceManager.getShader('text_2d').setMatrix4('projection', projection);
        ResourceManager.getShader('particle').use().setInteger('text_2d', 0);
        ResourceManager.getShader('particle').setMatrix4('projection', projection);
        // load textures
        await ResourceManager.loadTexture("textures/background.jpg", false, "background");
        await ResourceManager.loadTexture("textures/awesomeface.png", true, "face");
        await ResourceManager.loadTexture("textures/block.png", false, "block");
        await ResourceManager.loadTexture("textures/block_solid.png", false, "block_solid");
        await ResourceManager.loadTexture("textures/paddle.png", true, "paddle");
        await ResourceManager.loadTexture("textures/particle.png", true, "particle");
        await ResourceManager.loadTexture("textures/powerup_speed.png", true, "powerup_speed");
        await ResourceManager.loadTexture("textures/powerup_sticky.png", true, "powerup_sticky");
        await ResourceManager.loadTexture("textures/powerup_increase.png", true, "powerup_increase");
        await ResourceManager.loadTexture("textures/powerup_confuse.png", true, "powerup_confuse");
        await ResourceManager.loadTexture("textures/powerup_chaos.png", true, "powerup_chaos");
        await ResourceManager.loadTexture("textures/powerup_passthrough.png", true, "powerup_passthrough");
        await ResourceManager.loadTexture("textures/8x8-font.png", true, "8x8-font", true);


        this.renderer = new SpriteRenderer(ResourceManager.getShader("sprite").use());
        this.text = new TextRenderer(ResourceManager.getShader("text_2d").use());
        this.particles = new ParticleGenerator(ResourceManager.getShader("particle").use(), ResourceManager.getTexture('particle'), 500);
        this.effects = new PostProcessor(ResourceManager.getShader('postprocessing').use(), this.width, this.height);

        Device.showLoading({ title: '加载关卡' })
        // load levels
        const one: GameLevel = new GameLevel();
        await one.load("levels/one.lvl", this.width, this.height / 2, this.top);
        const two: GameLevel = new GameLevel();
        await two.load("levels/two.lvl", this.width, this.height / 2, this.top);
        const three: GameLevel = new GameLevel();
        await three.load("levels/three.lvl", this.width, this.height / 2, this.top);
        const four: GameLevel = new GameLevel();
        await four.load("levels/four.lvl", this.width, this.height / 2, this.top);
        this.levels.push(one);
        this.levels.push(two);
        this.levels.push(three);
        this.levels.push(four);


        const playerPos: Vec2 = [this.width / 2.0 - PLAYER_SIZE_X / 2, this.height - PLAYER_SIZE_Y + this.bottom - this.height]
        this.player = new GameObject(playerPos, [PLAYER_SIZE_X, PLAYER_SIZE_Y], ResourceManager.getTexture('paddle'));

        const ballPos: Vec2 = [playerPos[0] + PLAYER_SIZE_X / 2.0 - BALL_RADIUS, playerPos[1] - BALL_RADIUS * 2.0]
        this.ball = new BallObject(ballPos, BALL_RADIUS, [INITIAL_BALL_VELOCITY_X, INITIAL_BALL_VELOCITY_Y], ResourceManager.getTexture('face'));
        Device.showLoading({ title: '加载音乐' })
        this.audioManager.playBreakout();
        Device.hideLoading()
    }
    processInut(dt: number) {

        if (this.state === GameState.GAME_MENU) {
            if (this.keys[GLFW_KEY_ENTER] && !this.keysProcessed[GLFW_KEY_ENTER]) {
                this.state = GameState.GAME_ACTIVE;
                this.keysProcessed[GLFW_KEY_ENTER] = true;
            }
            if (this.keys[GLFW_KEY_W] && !this.keysProcessed[GLFW_KEY_W]) {
                this.level = (this.level + 1) % 4;
                this.keysProcessed[GLFW_KEY_W] = true;
            }
            if (this.keys[GLFW_KEY_S] && !this.keysProcessed[GLFW_KEY_S]) {
                if (this.level > 0)
                    --this.level;
                else
                    this.level = 3;
                //this.level = (this.level - 1) % 4;
                this.keysProcessed[GLFW_KEY_S] = true;
            }
        }
        if (this.state === GameState.GAME_WIN) {
            if (this.keys[GLFW_KEY_ENTER]) {
                this.keysProcessed[GLFW_KEY_ENTER] = true;
                this.effects!.chaos = false;
                this.state = GameState.GAME_MENU;
            }
        }
        if (this.state === GameState.GAME_ACTIVE) {
            const velocity = PLAYER_VELOCITY * dt;
            // move playerboard
            if (this.keys[GLFW_KEY_A]) {
                if (this.player!.position[0] >= 0.0) {
                    this.player!.position[0] -= velocity;
                    if (this.ball!.stuck) {
                        this.ball!.position[0] -= velocity;
                    }
                }
            }
            if (this.keys[GLFW_KEY_D]) {
                if (this.player!.position[0] <= this.width - this.player!.size[0]) {
                    this.player!.position[0] += velocity;
                    if (this.ball!.stuck) {
                        this.ball!.position[0] += velocity;
                    }
                }
            }
            if (this.keys[GLFW_KEY_SPACE]) {
                this.ball!.stuck = false;
            }
        }
    }
    update(dt: number) {
        this.ball!.move(dt, this.width);
        this.doCollisions();
        this.particles!.update(dt, this.ball!, 2, [this.ball!.radius, this.ball!.radius])
        this.updatePowerUps(dt);
        // reduce shake time
        if (this.shakeTime > 0.0) {
            this.shakeTime -= dt;
            if (this.shakeTime <= 0.0)
                this.effects!.shake = false;
        }
        if (this.ball!.position[1] >= this.height) {
            --this.lives;
            if (this.lives === 0) {
                this.resetLevel();
                this.state = GameState.GAME_MENU;
            }
            this.resetPlayer();
        }
        // check win condition
        if (this.state === GameState.GAME_ACTIVE && this.levels[this.level].isComplete()) {
            this.resetLevel();
            this.resetPlayer();
            this.effects!.chaos = true;
            this.state = GameState.GAME_WIN;
        }
    }
    render(time: number) {
        if (this.state === GameState.GAME_ACTIVE || this.state === GameState.GAME_MENU || this.state === GameState.GAME_WIN) {
            this.effects!.beginRender();
            this.renderer!.drawSprite(ResourceManager.getTexture('background'), [0, 0, 0], [this.width, this.height, 0])
            this.levels[this.level].draw(this.renderer!);
            this.player!.draw(this.renderer!);
            for (const powerUp of this.powerUps) {
                if (!powerUp.destroyed) {
                    powerUp.draw(this.renderer!);
                }
            }
            this.particles!.draw();
            this.ball!.draw(this.renderer!)
            this.text!.drawText(ResourceManager.getTexture('8x8-font'), `lvl-${this.level}`, 8, 16, 2, [1, 1, 1])
            this.text!.drawText(ResourceManager.getTexture('8x8-font'), `${Array(this.lives).fill('*').join('')}`, this.width - 8 * 8, 16, 2, [1, 1, 1])
            this.effects!.endRender();
            this.effects!.render(time);
        }
        if (this.state === GameState.GAME_MENU)
        {
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"Press ENTER", 0, this.height / 2.0 - 80, 4.0, [1,1,1]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"to start", 0, this.height / 2.0 - 40, 4.0, [1,1,1]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"Press W or S", 0, this.height / 2.0, 2, [1,1,1]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"Or swipe up or down", 0, this.height / 2.0 + 20.0, 2, [1,1,1]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"to select level", 0, this.height / 2.0 + 40.0, 2, [1,1,1]);
        }
        if (this.state === GameState.GAME_WIN)
        {
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"You WON!!!", 0, this.height / 2.0 - 80.0, 4.0, [0.0, 1.0, 0.0]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"Press ENTER", 0, this.height / 2.0 - 40, 4.0, [1.0, 1.0, 0.0]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"to retry", 0, this.height / 2.0, 4.0, [1.0, 1.0, 0.0]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"or ESC", 0, this.height / 2.0 + 40, 4.0, [1.0, 1.0, 0.0]);
            this.text!.drawText(ResourceManager.getTexture('8x8-font'),"to quit", 0, this.height / 2.0 + 80, 4.0, [1.0, 1.0, 0.0]);
        }
    }


    resetLevel() {
        if (this.level === 0)
            this.levels[0].load("levels/one.lvl", this.width, this.height / 2, this.top);
        else if (this.level === 1)
            this.levels[1].load("levels/two.lvl", this.width, this.height / 2, this.top);
        else if (this.level === 2)
            this.levels[2].load("levels/three.lvl", this.width, this.height / 2, this.top);
        else if (this.level === 3)
            this.levels[3].load("levels/four.lvl", this.width, this.height / 2, this.top);
        this.lives = 3;
    }

    resetPlayer() {
        // reset player/ball stats
        this.player!.size[0] = PLAYER_SIZE_X;
        this.player!.size[1] = PLAYER_SIZE_Y;
        this.player!.size[2] = 0;
        this.player!.position[0] = this.width / 2.0 - PLAYER_SIZE_X / 2.0;
        this.player!.position[1] = this.height - PLAYER_SIZE_Y, 0;
        this.player!.position[2] = 0;
        this.ball!.reset([this.player!.position[0] + PLAYER_SIZE_X / 2.0 - BALL_RADIUS, this.player!.position[1] - (BALL_RADIUS * 2.0)], [INITIAL_BALL_VELOCITY_X, INITIAL_BALL_VELOCITY_Y]);
        this.effects!.chaos = this.effects!.confuse = false;
        this.ball!.passThrough = this.ball!.sticky = false;
        this.player!.color[0] = 1;
        this.player!.color[1] = 1;
        this.player!.color[2] = 1;
        this.ball!.color[0] = 1;
        this.ball!.color[1] = 1;
        this.ball!.color[2] = 1;
    }
    clamp(value: number, a: number, b: number) {
        if (a > b) {
            const tmp = a;
            a = b;
            b = tmp;
        }
        if (value > b) {
            return b;
        } else if (value < a) {
            return a;
        } else {
            return value;
        }
    }

    // calculates which direction a vector is facing (N,E,S or W)
    vectorDirection(target: Vec2): Direction {
        const compass: Vec2[] = [
            [0.0, 1.0],	// up
            [1.0, 0.0],	// right
            [0.0, - 1.0],	// down
            [-1.0, 0.0]	// left
        ];
        let max = 0.0;
        let bestMatch = -1;
        for (let i = 0; i < 4; i++) {
            const dotProduct = v3.dot(v3.normalize([...target, 0]), [...compass[i], 0]);
            if (dotProduct > max) {
                max = dotProduct;
                bestMatch = i;
            }
        }
        return bestMatch;
    }
    checkPlayerCollision(one: GameObject, two: GameObject): boolean {

        // collision x-axis?
        const collisionX = one.position[0] + one.size[0] >= two.position[0] &&
            two.position[0] + two.size[0] >= one.position[0];
        // collision y-axis?
        const collisionY = one.position[1] + one.size[1] >= two.position[1] &&
            two.position[1] + two.size[1] >= one.position[1];
        // collision only if on both axes
        return collisionX && collisionY;
    }
    checkBallCollision(one: BallObject, two: GameObject): Collision {
        const center: Vec2 = [one.position[0] + one.radius, one.position[1] + one.radius]
        const aabbHalfExtends: Vec2 = [two.size[0] / 2.0, two.size[1] / 2.0]
        const aabbCenter: Vec2 = [two.position[0] + aabbHalfExtends[0], two.position[1] + aabbHalfExtends[1]]
        const difference: Vec2 = [center[0] - aabbCenter[0], center[1] - aabbCenter[1]]
        const clamped: Vec2 = [this.clamp(difference[0], -aabbHalfExtends[0], aabbHalfExtends[0]), this.clamp(difference[1], -aabbHalfExtends[1], aabbHalfExtends[1])]
        const closest: Vec2 = [aabbCenter[0] + clamped[0], aabbCenter[1] + clamped[1]]
        difference[0] = closest[0] - center[0]
        difference[1] = closest[1] - center[1]
        if (v3.length([...difference, 0]) < one.radius) {
            return [true, this.vectorDirection(difference), difference]
        } else {
            return this.collision
        }
    }
    doCollisions() {
        for (const box of this.levels[this.level].bricks) {
            if (!box.destroyed) {
                const collision = this.checkBallCollision(this.ball!, box);
                if (collision[0]) // if collision is true
                {
                    // destroy block if not solid
                    if (!box.isSolid) {
                        box.destroyed = true;
                        this.spawnPowerUps(box);
                        this.audioManager.playBleep();
                    } else {
                        this.shakeTime = 0.05;
                        this.effects!.shake = true;
                        this.audioManager.playSolid();
                    }
                    // collision resolution
                    const dir = collision[1];
                    const diffVector = collision[2]!;
                    if (!(this.ball!.passThrough && !box.isSolid)) {

                        if (dir === Direction.LEFT || dir === Direction.RIGHT) // horizontal collision
                        {
                            this.ball!.velocity[0] = -this.ball!.velocity[0]; // reverse horizontal velocity
                            // relocate
                            const penetration = this.ball!.radius - Math.abs(diffVector[0]);
                            if (dir === Direction.LEFT)
                                this.ball!.position[0] += penetration; // move ball to right
                            else
                                this.ball!.position[0] -= penetration; // move ball to left;
                        }
                        else // vertical collision
                        {
                            this.ball!.velocity[1] = -this.ball!.velocity[1]; // reverse vertical velocity
                            // relocate
                            const penetration = this.ball!.radius - Math.abs(diffVector[1]);
                            if (dir === Direction.UP)
                                this.ball!.position[1] -= penetration; // move ball back up
                            else
                                this.ball!.position[1] += penetration; // move ball back down
                        }
                    }
                }
            }
        }
        for (const powerUp of this.powerUps) {

            // first check if powerup passed bottom edge, if so: keep as inactive and destroy
            if (powerUp.position[1] >= this.height)
                powerUp.destroyed = true;

            if (this.checkPlayerCollision(this.player!, powerUp)) {	// collided with player, now activate powerup
                this.activatePowerUp(powerUp);
                powerUp.destroyed = true;
                powerUp.activated = true;
                this.audioManager.playPowerUp();
            }
        }
        // check collisions for player pad (unless stuck)
        const result = this.checkBallCollision(this.ball!, this.player!);
        if (!this.ball!.stuck && result[0]) {
            // check where it hit the board, and change velocity based on where it hit the board
            const centerBoard = this.player!.position[0] + this.player!.size[0] / 2.0;
            const distance = (this.ball!.position[0] + this.ball!.radius) - centerBoard;
            const percentage = distance / (this.player!.size[0] / 2.0);
            // then move accordingly
            const strength = 2.0;
            const oldVelocity = this.ball!.velocity;
            this.ball!.velocity[0] = INITIAL_BALL_VELOCITY_X * percentage * strength;
            //this.ball!.locity.y = -this.ball!.locity.y;
            const velocityVec3 = v3.mulScalar(v3.normalize([...this.ball!.velocity, 0]), v3.length([...oldVelocity, 0]))
            this.ball!.velocity[0] = velocityVec3[0];
            this.ball!.velocity[1] = velocityVec3[1];

            // fix sticky paddle
            this.ball!.velocity[1] = -1.0 * Math.abs(this.ball!.velocity[1]);
            this.ball!.stuck = this.ball!.sticky;
            this.audioManager.playBleepStuck();
        }
    }

    private shouldSpawn(chance: number): boolean {
        return !Math.floor(Math.random() * chance);
    }
    private activatePowerUp(powerUp: PowerUp): void {
        if (powerUp.type === "speed") {
            this.ball!.velocity[0] *= 1.2;
            this.ball!.velocity[1] *= 1.2;
        } else if (powerUp.type === "sticky") {
            this.ball!.sticky = true;
            this.player!.color[0] = 1;
            this.player!.color[1] = 0.5;
            this.player!.color[2] = 1;
        } else if (powerUp.type === "pass-through") {
            this.ball!.passThrough = true;
            this.ball!.color[0] = 1;
            this.ball!.color[1] = 0.5;
            this.ball!.color[2] = 0.5;
        } else if (powerUp.type === "pad-size-increase") {
            this.player!.size[0] += 50;
        } else if (powerUp.type === "confuse") {
            if (!this.effects!.chaos)
                this.effects!.confuse = true; // only activate if chaos wasn't already active
        } else if (powerUp.type === "chaos") {
            if (!this.effects!.confuse)
                this.effects!.chaos = true;
        }
    }
    private isOtherPowerUpActive(powerUps: PowerUp[], type: string): boolean {

        // Check if another PowerUp of the same type is still active
        // in which case we don't disable its effect (yet)
        for (const powerUp of powerUps) {
            if (powerUp.activated)
                if (powerUp.type === type)
                    return true;
        }
        return false;
    }

    spawnPowerUps(block: GameObject): void {
        if (this.shouldSpawn(75)) {
            this.powerUps.push(new PowerUp("speed", [0.5, 0.5, 1], 0, [block.position[0], block.position[1]], ResourceManager.getTexture("powerup_speed")))
        } else if (this.shouldSpawn(75)) {
            this.powerUps.push(new PowerUp("sticky", [0.5, 0.5, 1], 20, [block.position[0], block.position[1]], ResourceManager.getTexture("powerup_sticky")))
        } else if (this.shouldSpawn(75)) {
            this.powerUps.push(new PowerUp("pass-through", [0.5, 0.5, 1], 10, [block.position[0], block.position[1]], ResourceManager.getTexture("powerup_passthrough")))
        } else if (this.shouldSpawn(75)) {
            this.powerUps.push(new PowerUp("pad-size-increase", [0.5, 0.5, 1], 0, [block.position[0], block.position[1]], ResourceManager.getTexture("powerup_increase")))
        } else if (this.shouldSpawn(15)) {
            this.powerUps.push(new PowerUp("confuse", [0.5, 0.5, 1], 15, [block.position[0], block.position[1]], ResourceManager.getTexture("powerup_confuse")))
        } else if (this.shouldSpawn(15)) {
            this.powerUps.push(new PowerUp("chaos", [0.5, 0.5, 1], 15, [block.position[0], block.position[1]], ResourceManager.getTexture("powerup_chaos")))
        }
    }

    updatePowerUps(dt: number): void {

        for (const powerUp of this.powerUps) {
            powerUp.position[0] += powerUp.velocity[0] * dt;
            powerUp.position[1] += powerUp.velocity[1] * dt;
            if (powerUp.activated) {
                powerUp.duration -= dt;

                if (powerUp.duration <= 0.0) {
                    // remove powerup from list (will later be removed)
                    powerUp.activated = false;
                    // deactivate effects
                    if (powerUp.type === "sticky") {
                        if (!this.isOtherPowerUpActive(this.powerUps, "sticky")) {	// only reset if no other PowerUp of type sticky is active
                            this.ball!.sticky = false;
                            this.player!.color[0] = 1;
                            this.player!.color[1] = 1;
                            this.player!.color[2] = 1;
                        }
                    }
                    else if (powerUp.type === "pass-through") {
                        if (!this.isOtherPowerUpActive(this.powerUps, "pass-through")) {	// only reset if no other PowerUp of type pass-through is active
                            this.ball!.passThrough = false;
                            this.ball!.color[0] = 1;
                            this.ball!.color[1] = 1;
                            this.ball!.color[2] = 1;
                        }
                    }
                    else if (powerUp.type === "confuse") {
                        if (!this.isOtherPowerUpActive(this.powerUps, "confuse")) {	// only reset if no other PowerUp of type confuse is active
                            this.effects!.confuse = false;
                        }
                    }
                    else if (powerUp.type === "chaos") {
                        if (!this.isOtherPowerUpActive(this.powerUps, "chaos")) {	// only reset if no other PowerUp of type chaos is active
                            this.effects!.chaos = false;
                        }
                    }
                }
            }
        }

        // Remove all PowerUps from vector that are destroyed AND !activated (thus either off the map or finished)
        // Note we use a lambda expression to remove each PowerUp which is destroyed and not activated
        const invalidPowerUps = this.powerUps.filter(powerUp => powerUp.destroyed && !powerUp.activated);
        for (const iterator of invalidPowerUps) {
            this.powerUps.splice(this.powerUps.indexOf(iterator), 1);
        }
    }
}