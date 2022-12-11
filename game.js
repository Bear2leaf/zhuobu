import { gl } from "./global.js";
import * as twgl from "./twgl-full.js";
console.log(twgl);
const programInfo = twgl.createProgramInfoFromProgram(gl, twgl.createProgramFromSources(gl, [`
attribute vec4 position;

void main() {
  gl_Position = position;
}
  `, `
  precision mediump float;
  
  uniform vec2 resolution;
  uniform float time;
  
  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    float color = 0.0;
    // lifted from glslsandbox.com
    color += sin( uv.x * cos( time / 3.0 ) * 60.0 ) + cos( uv.y * cos( time / 2.80 ) * 10.0 );
    color += sin( uv.y * sin( time / 2.0 ) * 40.0 ) + cos( uv.x * sin( time / 1.70 ) * 40.0 );
    color += sin( uv.x * sin( time / 1.0 ) * 10.0 ) + sin( uv.y * sin( time / 3.50 ) * 80.0 );
    color *= sin( time / 10.0 ) * 0.5;
  
    gl_FragColor = vec4( vec3( color * 0.5, sin( color + time / 2.5 ) * 0.75, color ), 1.0 );
  }
    `]));
const arrays = {
    position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
};
const bufferInfo = twgl.createBufferInfoFromArrays(gl, arrays);
let delta = 0, lastTime = 0, lastTick = 0;
function render(time) {
    delta = time - lastTime;
    lastTick += delta;
    lastTime = time;
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    const uniforms = {
        time: lastTick * 0.001,
        resolution: [gl.canvas.width, gl.canvas.height],
    };
    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    twgl.drawBufferInfo(gl, bufferInfo);
    requestAnimationFrame(render);
}
requestAnimationFrame(function (time) {
    lastTime = time;
    render(time);
});
//# sourceMappingURL=game.js.map