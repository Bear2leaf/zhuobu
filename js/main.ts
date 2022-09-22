import Game, { GLFW_KEY_A, GLFW_KEY_D, GLFW_KEY_SPACE } from './game'
import ResourceManager from './resource_manager';

declare const wx: any;


/**
 * 游戏主函数
 */
export default class Main {
  private readonly breakout: Game
  private deltaTime = 0.0;
  private lastFrame = 0.0;
  constructor() {
    const { windowWidth, windowHeight } = wx.getWindowInfo()
    this.breakout = new Game(windowWidth, windowHeight);
    wx.onTouchStart(this.touchHandler.bind(this));
    wx.onTouchMove(this.touchHandler.bind(this));
    wx.onTouchEnd(this.touchEndHandler.bind(this));
    wx.onTouchCancel(this.touchEndHandler.bind(this));

    ResourceManager.gl.enable(ResourceManager.gl.BLEND);
    ResourceManager.gl.blendFunc(ResourceManager.gl.SRC_ALPHA, ResourceManager.gl.ONE_MINUS_SRC_ALPHA);

    this.breakout.init().then(() => requestAnimationFrame(this.loop.bind(this)));
  }


  touchEndHandler(eventObj: { touches: Touch[] }) {

    this.breakout.keys[GLFW_KEY_A] = false;
    this.breakout.keys[GLFW_KEY_D] = false;
    this.breakout.keys[GLFW_KEY_SPACE] = false;
  }

  // 游戏结束后的触摸事件处理逻辑
  touchHandler(eventObj: { touches: Touch[] }) {
    const { touches } = eventObj;
    if (touches[0].clientX < this.breakout.width / 2) {
      this.breakout.keys[GLFW_KEY_A] = true;
      this.breakout.keys[GLFW_KEY_D] = false;
    } else if (touches[0].clientX >= this.breakout.width / 2) {
      this.breakout.keys[GLFW_KEY_A] = false;
      this.breakout.keys[GLFW_KEY_D] = true;
    }
    this.breakout.keys[GLFW_KEY_SPACE] = true;
  }


  // 实现游戏帧循环
  loop(time: number) {
    const currentFrame = time;
    this.deltaTime = currentFrame - this.lastFrame;
    this.lastFrame = currentFrame;
    this.breakout.processInut(this.deltaTime);
    this.breakout.update(this.deltaTime);
    this.breakout.render();
    requestAnimationFrame((t) => this.loop(t))
  }
}