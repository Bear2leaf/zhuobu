globalThis.Module = {
  preRun: [],
  postRun: [],
  print: (function() {
    return function(text) {
      if (arguments.length > 1) text = Array.prototype.slice.call(arguments).join(' ');
      console.log(text);
    };
  })(),
  canvas: (() => {
    const canvas = typeof wx !== 'undefined' ? wx.createCanvas() : document.getElementById("canvas");

    canvas.addEventListener = console.warn
    canvas.style.removeProperty = console.warn
    return canvas;
  })(),
  setStatus: function(text) {
    if (!Module.setStatus.last) Module.setStatus.last = { time: Date.now(), text: '' };
    if (text === Module.setStatus.last.text) return;
    var m = text.match(/([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
    var now = Date.now();
    if (m && now - Module.setStatus.last.time < 30) return; // if this is a progress update, skip it if too soon
    Module.setStatus.last.time = now;
    Module.setStatus.last.text = text;
    console.log(text)
  },
  totalDependencies: 0,
  monitorRunDependencies: function(left) {
    this.totalDependencies = Math.max(this.totalDependencies, left);
    Module.setStatus(left ? 'Preparing... (' + (this.totalDependencies-left) + '/' + this.totalDependencies + ')' : 'All downloads complete.');
  }
};
Module.setStatus('Downloading...');
globalThis.onerror = function(event) {
  // TODO: do not warn on ok events like simulating an infinite loop or exitStatus
  Module.setStatus('Exception thrown, see JavaScript console');
  Module.setStatus = function(text) {
    if (text) console.error('[post-exception status] ' + text);
  };
};
const wxinst = WXWebAssembly.instantiate;
globalThis.WebAssembly = WXWebAssembly
globalThis.WebAssembly.instantiate = (path, info) => {console.log(path); return wxinst(String.fromCharCode(...path), info)};
globalThis.WebAssembly.RuntimeError = Error
globalThis.document = {
    addEventListener: console.warn
}
globalThis.window = {
    addEventListener: console.warn
}
globalThis.XMLHttpRequest = class XMLHttpRequest {
    open(method, url, async) {
    }
    send() {
        this.response =new Uint8Array([..."hello.wasm"].map(c => c.charCodeAt(0))).buffer;
        this.status = 0;
        this.onload();
    }
}
require("hello.js")