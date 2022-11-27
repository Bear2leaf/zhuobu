import Game, { GameState, GLFW_KEY_A, GLFW_KEY_D, GLFW_KEY_ENTER, GLFW_KEY_S, GLFW_KEY_SPACE, GLFW_KEY_W } from './game.js';
import ResourceManager, { Device } from './resource_manager.js';
/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        /**
         * in order to fix start time not from zero in wechat minigame.
         */
        this.startTime = 0.0;
        this.lastTime = 0.0;
        this.lastY = 0;
        const { top, bottom, windowWidth, windowHeight } = Device.getWindowInfo();
        this.breakout = new Game(top, bottom, windowWidth, windowHeight);
        Device.onTouchStart(this.touchStartHandler.bind(this));
        Device.onTouchMove(this.touchHandler.bind(this));
        Device.onTouchEnd(this.touchEndHandler.bind(this));
        Device.onTouchCancel(this.touchEndHandler.bind(this));
        ResourceManager.gl.enable(ResourceManager.gl.BLEND);
        ResourceManager.gl.blendFunc(ResourceManager.gl.SRC_ALPHA, ResourceManager.gl.ONE_MINUS_SRC_ALPHA);
        this.breakout.init().then(() => requestAnimationFrame(this.loop.bind(this)));
    }
    touchEndHandler(eventObj) {
        this.breakout.keys[GLFW_KEY_A] = false;
        this.breakout.keys[GLFW_KEY_D] = false;
        this.breakout.keys[GLFW_KEY_W] = false;
        this.breakout.keys[GLFW_KEY_S] = false;
        this.breakout.keys[GLFW_KEY_SPACE] = false;
        this.breakout.keys[GLFW_KEY_ENTER] = false;
        this.breakout.keysProcessed[GLFW_KEY_W] = false;
        this.breakout.keysProcessed[GLFW_KEY_S] = false;
        this.breakout.keysProcessed[GLFW_KEY_ENTER] = false;
    }
    touchStartHandler(eventObj) {
        const { touches, clientX, clientY } = eventObj;
        const { windowWidth, windowHeight } = Device.getWindowInfo();
        const mx = (touches && touches[0].clientX) || clientX;
        const my = (touches && touches[0].clientY) || clientY;
        if (this.breakout.state === GameState.GAME_MENU || this.breakout.state === GameState.GAME_WIN) {
            if (mx > windowWidth / 2 - 40 && mx < windowWidth / 2 + 40 && my > windowHeight / 2 - 40 && my < windowHeight / 2 + 40) {
                this.breakout.keys[GLFW_KEY_ENTER] = true;
            }
            return;
        }
        this.breakout.keys[GLFW_KEY_SPACE] = true;
        if (mx < windowWidth / 2) {
            this.breakout.keys[GLFW_KEY_A] = true;
            this.breakout.keys[GLFW_KEY_D] = false;
        }
        else {
            this.breakout.keys[GLFW_KEY_A] = false;
            this.breakout.keys[GLFW_KEY_D] = true;
        }
    }
    // 游戏结束后的触摸事件处理逻辑
    touchHandler(eventObj) {
        const { touches, clientY } = eventObj;
        const my = (touches && touches[0].clientY) || clientY;
        const deltaY = my - this.lastY;
        if (this.lastY === 0) {
            this.lastY = my;
            return;
        }
        this.lastY = my;
        if (deltaY < 0) {
            this.breakout.keys[GLFW_KEY_W] = true;
            this.breakout.keys[GLFW_KEY_S] = false;
        }
        else {
            this.breakout.keys[GLFW_KEY_W] = false;
            this.breakout.keys[GLFW_KEY_S] = true;
        }
    }
    // 实现游戏帧循环
    loop(time) {
        if (this.lastTime === 0 && this.startTime === 0) {
            this.startTime = time;
        }
        const currentFrame = (time - this.startTime) / 1000;
        const deltaTime = currentFrame - this.lastTime;
        this.lastTime = currentFrame;
        this.breakout.processInut(deltaTime);
        this.breakout.update(deltaTime);
        this.breakout.render(currentFrame);
        requestAnimationFrame(this.loop.bind(this));
    }
}
//# sourceMappingURL=main.js.map