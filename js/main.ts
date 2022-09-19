declare const wx: any;
/**
 * 游戏主函数
 */
export default class Main {
  gl: WebGLRenderingContext = wx.createCanvas().getContext('webgl')
  constructor() {

    this.gl.enable(this.gl.SCISSOR_TEST);

    wx.onTouchStart(this.touchEventHandler.bind(this));
    this.loop(0)
  }


  // 全局碰撞检测
  collisionDetection() {
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
    for (let i = 0; i < 100; ++i) {
      const x = this.rand(0, wx.getWindowInfo().windowWidth);
      const y = this.rand(0, wx.getWindowInfo().windowHeight);
      const width = this.rand(0, wx.getWindowInfo().windowWidth - x);
      const height = this.rand(0, wx.getWindowInfo().windowHeight - y);
      this.drawRect(x, y, width, height, [this.rand(1), this.rand(1), this.rand(1), 1]);
    }
  }

  rand(min: number, max?: number) {
    if (max === undefined) {
      max = min;
      min = 0;
    }
    return Math.random() * (max - min) + min;
  }
  drawRect(x: number, y: number, width: number, height: number, color: [number, number, number, number]) {
    this.gl.scissor(x, y, width, height);
    this.gl.clearColor(...color);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }
  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render() {
  }

  // 游戏逻辑更新主函数
  update() {

    this.collisionDetection()

  }

  // 实现游戏帧循环
  loop(time: number) {
    this.update()
    this.render()
    requestAnimationFrame((t) => this.loop(t))
  }
}