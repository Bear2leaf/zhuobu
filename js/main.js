import Game, { GLFW_KEY_A, GLFW_KEY_D, GLFW_KEY_SPACE } from './game.js';
import ResourceManager from './resource_manager.js';
/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        this.deltaTime = 0.0;
        this.lastFrame = 0.0;
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
        this.touchHandler(eventObj);
    }
    // 游戏结束后的触摸事件处理逻辑
    touchHandler(eventObj) {
        if (!this.breakout.player) {
            return;
        }
        const { touches, clientX } = eventObj;
        const mx = (touches && touches[0].clientX) || clientX;
        if (mx < this.breakout.player.position[0] + this.breakout.player.size[0] / 2) {
            this.breakout.keys[GLFW_KEY_A] = true;
            this.breakout.keys[GLFW_KEY_D] = false;
        }
        else if (mx >= this.breakout.player.position[0] + this.breakout.player.size[0] / 2) {
            this.breakout.keys[GLFW_KEY_A] = false;
            this.breakout.keys[GLFW_KEY_D] = true;
        }
    }
    // 实现游戏帧循环
    loop(time) {
        const currentFrame = time;
        this.deltaTime = currentFrame - this.lastFrame;
        this.lastFrame = currentFrame;
        this.breakout.processInut(this.deltaTime);
        this.breakout.update(this.deltaTime);
        this.breakout.render();
        requestAnimationFrame((t) => this.loop(t));
    }
}
//# sourceMappingURL=main.js.map