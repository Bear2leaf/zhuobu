"use strict";
exports.__esModule = true;
/**
 * 游戏主函数
 */
var Main = /** @class */ (function () {
    function Main() {
        this.gl = wx.createCanvas().getContext('webgl');
        this.gl.enable(this.gl.SCISSOR_TEST);
        wx.onTouchStart(this.touchEventHandler.bind(this));
        this.loop(0);
    }
    // 全局碰撞检测
    Main.prototype.collisionDetection = function () {
    };
    // 游戏结束后的触摸事件处理逻辑
    Main.prototype.touchEventHandler = function (eventObj) {
        var touches = eventObj.touches;
        console.log(wx.getWindowInfo().windowWidth, wx.getWindowInfo().windowHeight);
        console.log(touches);
        touches.forEach(function (toucn) {
            var x = toucn.clientX;
            var y = toucn.clientY;
            console.log(x, y);
        });
        for (var i = 0; i < 100; ++i) {
            var x = this.rand(0, wx.getWindowInfo().windowWidth);
            var y = this.rand(0, wx.getWindowInfo().windowHeight);
            var width = this.rand(0, wx.getWindowInfo().windowWidth - x);
            var height = this.rand(0, wx.getWindowInfo().windowHeight - y);
            this.drawRect(x, y, width, height, [this.rand(1), this.rand(1), this.rand(1), 1]);
        }
    };
    Main.prototype.rand = function (min, max) {
        if (max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min;
    };
    Main.prototype.drawRect = function (x, y, width, height, color) {
        var _a;
        this.gl.scissor(x, y, width, height);
        (_a = this.gl).clearColor.apply(_a, color);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    };
    /**
     * canvas重绘函数
     * 每一帧重新绘制所有的需要展示的元素
     */
    Main.prototype.render = function () {
    };
    // 游戏逻辑更新主函数
    Main.prototype.update = function () {
        this.collisionDetection();
    };
    // 实现游戏帧循环
    Main.prototype.loop = function (time) {
        var _this = this;
        this.update();
        this.render();
        requestAnimationFrame(function (t) { return _this.loop(t); });
    };
    return Main;
}());
exports["default"] = Main;
//# sourceMappingURL=main.js.map