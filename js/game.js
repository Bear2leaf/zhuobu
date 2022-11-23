var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import BallObject from "./ball_object.js";
import GameLevel from "./game_level.js";
import GameObject from "./game_object.js";
import m4 from "./m4.js";
import ParticleGenerator from "./particle_generator.js";
import ResourceManager from "./resource_manager.js";
import SpriteRenderer from "./sprite_renderer.js";
import v3 from "./v3.js";
var GameState;
(function (GameState) {
    GameState[GameState["GAME_ACTIVE"] = 0] = "GAME_ACTIVE";
    GameState[GameState["GAME_MENU"] = 1] = "GAME_MENU";
    GameState[GameState["GAME_WIN"] = 2] = "GAME_WIN";
})(GameState || (GameState = {}));
var Direction;
(function (Direction) {
    Direction[Direction["UP"] = 0] = "UP";
    Direction[Direction["RIGHT"] = 1] = "RIGHT";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
})(Direction || (Direction = {}));
const PIXEL_RATIO = !wx.getDeviceInfo ? wx.getWindowInfo().pixelRatio : 1;
const PLAYER_SIZE_X = 100 * PIXEL_RATIO;
const PLAYER_SIZE_Y = 20 * PIXEL_RATIO;
const PLAYER_VELOCITY = 0.25 * PIXEL_RATIO;
const BALL_RADIUS = 12.5 * PIXEL_RATIO;
const INITIAL_BALL_VELOCITY_X = 0.1 * PIXEL_RATIO;
const INITIAL_BALL_VELOCITY_Y = -0.35 * PIXEL_RATIO;
export const GLFW_KEY_A = 0;
export const GLFW_KEY_D = 1;
export const GLFW_KEY_SPACE = 2;
export default class Game {
    constructor(width, height) {
        this.state = GameState.GAME_ACTIVE;
        this.keys = new Array(1024);
        this.width = width;
        this.height = height;
        this.level = 0;
        this.levels = [];
        this.collision = [false, Direction.UP, [0, 0]];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            wx.showLoading({ title: '初始化' });
            yield ResourceManager.loadShader("shaders/sprite.vs", "shaders/sprite.fs", "sprite");
            yield ResourceManager.loadShader("shaders/particle.vs", "shaders/particle.fs", "particle");
            const projection = m4.ortho(0, this.width, this.height, 0, -1, 1);
            ResourceManager.getShader('sprite').use().setInteger('sprite', 0);
            ResourceManager.getShader('sprite').setMatrix4('projection', projection);
            ResourceManager.getShader('particle').use().setInteger('sprite', 0);
            ResourceManager.getShader('particle').setMatrix4('projection', projection);
            // load textures
            yield ResourceManager.loadTexture("textures/background.jpg", false, "background");
            yield ResourceManager.loadTexture("textures/awesomeface.png", true, "face");
            yield ResourceManager.loadTexture("textures/block.png", false, "block");
            yield ResourceManager.loadTexture("textures/block_solid.png", false, "block_solid");
            yield ResourceManager.loadTexture("textures/paddle.png", true, "paddle");
            yield ResourceManager.loadTexture("textures/particle.png", true, "particle");
            this.renderer = new SpriteRenderer(ResourceManager.getShader("sprite"));
            this.particles = new ParticleGenerator(ResourceManager.getShader("particle"), ResourceManager.getTexture('particle'), 500);
            wx.showLoading({ title: '加载关卡' });
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
            const ballPos = [playerPos[0] + PLAYER_SIZE_X / 2.0 - BALL_RADIUS, playerPos[1] - BALL_RADIUS * 2.0];
            this.ball = new BallObject(ballPos, BALL_RADIUS, [INITIAL_BALL_VELOCITY_X, INITIAL_BALL_VELOCITY_Y], ResourceManager.getTexture('face'));
            wx.hideLoading();
        });
    }
    processInut(dt) {
        if (this.state === GameState.GAME_ACTIVE) {
            const velocity = PLAYER_VELOCITY * dt;
            // move playerboard
            if (this.keys[GLFW_KEY_A]) {
                if (this.player.position[0] >= 0.0) {
                    this.player.position[0] -= velocity;
                    if (this.ball.stuck) {
                        this.ball.position[0] -= velocity;
                    }
                }
            }
            if (this.keys[GLFW_KEY_D]) {
                if (this.player.position[0] <= this.width - this.player.size[0]) {
                    this.player.position[0] += velocity;
                    if (this.ball.stuck) {
                        this.ball.position[0] += velocity;
                    }
                }
            }
            if (this.keys[GLFW_KEY_SPACE]) {
                this.ball.stuck = false;
            }
        }
    }
    update(dt) {
        this.ball.move(dt, this.width);
        this.doCollisions();
        this.particles.update(dt, this.ball, 2, [this.ball.radius, this.ball.radius]);
        if (this.ball.position[1] >= this.height) {
            this.resetLevel();
            this.resetPlayer();
        }
    }
    render() {
        if (this.state === GameState.GAME_ACTIVE) {
            ResourceManager.gl.clearColor(0.0, 0.0, 0.0, 0.0);
            ResourceManager.gl.clear(ResourceManager.gl.COLOR_BUFFER_BIT);
            this.renderer.drawSprite(ResourceManager.getTexture('background'), [0, 0, 0], [this.width, this.height, 0]);
            this.levels[this.level].draw(this.renderer);
            this.player.draw(this.renderer);
            this.particles.draw();
            this.ball.draw(this.renderer);
        }
    }
    resetLevel() {
        if (this.level === 0)
            this.levels[0].load("levels/one.lvl", this.width, this.height / 2);
        else if (this.level === 1)
            this.levels[1].load("levels/two.lvl", this.width, this.height / 2);
        else if (this.level === 2)
            this.levels[2].load("levels/three.lvl", this.width, this.height / 2);
        else if (this.level === 3)
            this.levels[3].load("levels/four.lvl", this.width, this.height / 2);
    }
    resetPlayer() {
        // reset player/ball stats
        this.player.size[0] = PLAYER_SIZE_X;
        this.player.size[1] = PLAYER_SIZE_Y;
        this.player.size[2] = 0;
        this.player.position[0] = this.width / 2.0 - PLAYER_SIZE_X / 2.0;
        this.player.position[1] = this.height - PLAYER_SIZE_Y, 0;
        this.player.position[2] = 0;
        this.ball.reset([this.player.position[0] + PLAYER_SIZE_X / 2.0 - BALL_RADIUS, this.player.position[1] - (BALL_RADIUS * 2.0)], [INITIAL_BALL_VELOCITY_X, INITIAL_BALL_VELOCITY_Y]);
    }
    clamp(value, a, b) {
        if (a > b) {
            const tmp = a;
            a = b;
            b = tmp;
        }
        if (value > b) {
            return b;
        }
        else if (value < a) {
            return a;
        }
        else {
            return value;
        }
    }
    // calculates which direction a vector is facing (N,E,S or W)
    vectorDirection(target) {
        const compass = [
            [0.0, 1.0],
            [1.0, 0.0],
            [0.0, -1.0],
            [-1.0, 0.0] // left
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
    checkCollision(one, two) {
        const center = [one.position[0] + one.radius, one.position[1] + one.radius];
        const aabbHalfExtends = [two.size[0] / 2.0, two.size[1] / 2.0];
        const aabbCenter = [two.position[0] + aabbHalfExtends[0], two.position[1] + aabbHalfExtends[1]];
        const difference = [center[0] - aabbCenter[0], center[1] - aabbCenter[1]];
        const clamped = [this.clamp(difference[0], -aabbHalfExtends[0], aabbHalfExtends[0]), this.clamp(difference[1], -aabbHalfExtends[1], aabbHalfExtends[1])];
        const closest = [aabbCenter[0] + clamped[0], aabbCenter[1] + clamped[1]];
        difference[0] = closest[0] - center[0];
        difference[1] = closest[1] - center[1];
        if (v3.length([...difference, 0]) < one.radius) {
            return [true, this.vectorDirection(difference), difference];
        }
        else {
            return this.collision;
        }
    }
    doCollisions() {
        for (const box of this.levels[this.level].bricks) {
            if (!box.destroyed) {
                const collision = this.checkCollision(this.ball, box);
                if (collision[0]) // if collision is true
                 {
                    // destroy block if not solid
                    if (!box.isSolid) {
                        box.destroyed = true;
                    }
                    // collision resolution
                    const dir = collision[1];
                    const diffVector = collision[2];
                    if (dir === Direction.LEFT || dir === Direction.RIGHT) // horizontal collision
                     {
                        this.ball.velocity[0] = -this.ball.velocity[0]; // reverse horizontal velocity
                        // relocate
                        const penetration = this.ball.radius - Math.abs(diffVector[0]);
                        if (dir === Direction.LEFT)
                            this.ball.position[0] += penetration; // move ball to right
                        else
                            this.ball.position[0] -= penetration; // move ball to left;
                    }
                    else // vertical collision
                     {
                        this.ball.velocity[1] = -this.ball.velocity[1]; // reverse vertical velocity
                        // relocate
                        const penetration = this.ball.radius - Math.abs(diffVector[1]);
                        if (dir === Direction.UP)
                            this.ball.position[1] -= penetration; // move ball back up
                        else
                            this.ball.position[1] += penetration; // move ball back down
                    }
                }
            }
        }
        // check collisions for player pad (unless stuck)
        const result = this.checkCollision(this.ball, this.player);
        if (!this.ball.stuck && result[0]) {
            // check where it hit the board, and change velocity based on where it hit the board
            const centerBoard = this.player.position[0] + this.player.size[0] / 2.0;
            const distance = (this.ball.position[0] + this.ball.radius) - centerBoard;
            const percentage = distance / (this.player.size[0] / 2.0);
            // then move accordingly
            const strength = 2.0;
            const oldVelocity = this.ball.velocity;
            this.ball.velocity[0] = INITIAL_BALL_VELOCITY_X * percentage * strength;
            //this.ball!.locity.y = -this.ball!.locity.y;
            const velocityVec3 = v3.mulScalar(v3.normalize([...this.ball.velocity, 0]), v3.length([...oldVelocity, 0]));
            this.ball.velocity[0] = velocityVec3[0];
            this.ball.velocity[1] = velocityVec3[1];
            // fix sticky paddle
            this.ball.velocity[1] = -1.0 * Math.abs(this.ball.velocity[1]);
        }
    }
}
//# sourceMappingURL=game.js.map