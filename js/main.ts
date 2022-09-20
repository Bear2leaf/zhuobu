import Game from './game'

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
    wx.onTouchStart(this.touchEventHandler.bind(this));

    this.breakout.init().then(() => requestAnimationFrame(this.loop.bind(this)));

  }



  // 游戏结束后的触摸事件处理逻辑
  touchEventHandler(eventObj: any) {
    const { touches } = eventObj;
    console.log(wx.getWindowInfo().windowWidth, wx.getWindowInfo().windowHeight)
    console.log(touches)
    touches.forEach((toucn: { clientX: number; clientY: number; }) => {
      const x = toucn.clientX
      const y = toucn.clientY
      console.log(x, y);
    })
  }


  // 实现游戏帧循环
  loop(time: number) {
    const currentFrame = time;
    this.deltaTime = currentFrame - this.lastFrame;
    this.lastFrame = currentFrame;
    this.breakout.processInut(this.deltaTime);
    this.breakout.update(this.deltaTime);
    this.breakout.render();
    // requestAnimationFrame((t) => this.loop(t))
  }
}