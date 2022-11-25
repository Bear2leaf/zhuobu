import Game, { GLFW_KEY_A, GLFW_KEY_D, GLFW_KEY_SPACE } from './game.js';
import ResourceManager from './resource_manager.js';
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
        const { windowWidth, windowHeight } = wx.getWindowInfo();
        this.breakout = new Game(windowWidth, windowHeight);
        wx.onTouchStart(this.touchStartHandler.bind(this));
        wx.onTouchMove(this.touchHandler.bind(this));
        wx.onTouchEnd(this.touchEndHandler.bind(this));
        wx.onTouchCancel(this.touchEndHandler.bind(this));
        ResourceManager.gl.enable(ResourceManager.gl.BLEND);
        ResourceManager.gl.blendFunc(ResourceManager.gl.SRC_ALPHA, ResourceManager.gl.ONE_MINUS_SRC_ALPHA);
        this.breakout.init().then(() => requestAnimationFrame(this.loop.bind(this)));
    }
    touchEndHandler(eventObj) {
        this.breakout.keys[GLFW_KEY_A] = false;
        this.breakout.keys[GLFW_KEY_D] = false;
        this.breakout.keys[GLFW_KEY_SPACE] = false;
    }
    touchStartHandler(eventObj) {
        this.breakout.keys[GLFW_KEY_SPACE] = true;
        const { touches, clientX } = eventObj;
        const { windowWidth } = wx.getWindowInfo();
        const mx = (touches && touches[0].clientX) || clientX;
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