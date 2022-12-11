import { device, gl } from "./global.js";
import * as twgl from "./twgl-full.js";
console.log(twgl);

const programInfo = twgl.createProgramInfoFromProgram(gl, twgl.createProgramFromSources(gl, [`
#version 300 es
uniform View {
  mat4 u_viewInverse;
  mat4 u_viewProjection;
};

uniform Lights {
  mediump vec3 u_lightWorldPos;
  mediump vec4 u_lightColor;
} lights[2];

uniform Model {
  mat4 u_world;
  mat4 u_worldInverseTranspose;
} foo;

in vec4 a_position;
in vec3 a_normal;
in vec2 a_texcoord;

out vec4 v_position;
out vec2 v_texCoord;
out vec3 v_normal;
out vec3 v_surfaceToLight;
out vec3 v_surfaceToView;

void main() {
  v_texCoord = a_texcoord;
//  v_position = (foo.u_world * u_viewProjection * a_position);
  v_position = (u_viewProjection * foo.u_world * a_position);
  v_normal = (foo.u_worldInverseTranspose * vec4(a_normal, 0)).xyz;
  v_surfaceToLight = lights[0].u_lightWorldPos - (foo.u_world * a_position).xyz;
  v_surfaceToView = (u_viewInverse[3] - (foo.u_world * a_position)).xyz;
  gl_Position = v_position;
}
  `, `#version 300 es
  precision mediump float;
  
  in vec4 v_position;
  in vec2 v_texCoord;
  in vec3 v_normal;
  in vec3 v_surfaceToLight;
  in vec3 v_surfaceToView;
  
  uniform Lights {
    vec3 u_lightWorldPos;
    vec4 u_lightColor;
  } lights[2];
  
  uniform sampler2D u_diffuse;
  
  uniform Material {
    vec4 u_ambient;
    vec4 u_specular;
    float u_shininess;
    float u_specularFactor;
  };
  
  out vec4 theColor;
  
  vec4 lit(float l ,float h, float m) {
    return vec4(1.0,
                max(abs(l), 0.0),
                (l > 0.0) ? pow(max(0.0, h), m) : 0.0,
                1.0);
  }
  
  
  
  void main() {
    vec4 diffuseColor = texture(u_diffuse, v_texCoord);
    vec3 a_normal = normalize(v_normal);
    vec3 surfaceToLight = normalize(v_surfaceToLight);
    vec3 surfaceToView = normalize(v_surfaceToView);
    vec3 halfVector = normalize(surfaceToLight + surfaceToView);
    vec4 litR = lit(dot(a_normal, surfaceToLight),
                      dot(a_normal, halfVector), u_shininess);
    vec4 outColor = vec4((
    lights[0].u_lightColor * (diffuseColor * litR.y + diffuseColor * u_ambient +
                  u_specular * litR.z * u_specularFactor)).rgb,
        diffuseColor.a);
    theColor = outColor;
  }`]));
    const m4 = twgl.m4;
    twgl.setDefaults({attribPrefix: "a_"});

    if (!twgl.isWebGL2(gl)) {
        throw Error("Sorry, this example requires WebGL 2.0");  // eslint-disable-line
      }
    
    
      const bufferInfo = twgl.primitives.createCubeBufferInfo(gl, 2);
      const tex = twgl.createTexture(gl, {
        min: gl.NEAREST,
        mag: gl.NEAREST,
        src: [
          255, 255, 255, 255,
          192, 192, 192, 255,
          192, 192, 192, 255,
          255, 255, 255, 255,
        ],
      });
    
      function rand(min: number, max?: number) {
        if (max === undefined) {
          max = min;
          min = 0;
        }
        return min + Math.random() * (max - min);
      }
    
      function randElement(array: any[]) {
        return array[rand(array.length) | 0];
      }
    
      const uniforms = {
        u_diffuse: tex,
      };
    
      // We pull out the Float32Array views for viewProjection and viewInverse (and world below)
      // from the viewUboInfo but, if we're modifying the shaders it's possible they might
      // get optimized away. So, the `|| Float32Array` basically just makes a dummy in that case
      // so the rest of the code doesn't have to check for existence.
    
      const viewUboInfo = twgl.createUniformBlockInfo(gl, programInfo, "View");
      const viewProjection = viewUboInfo.uniforms.u_viewProjection || new Float32Array(16);
      const viewInverse = viewUboInfo.uniforms.u_viewInverse || new Float32Array(16);
    
      const lightUboInfos = [];
      for (let ii = 0; ii < 10; ++ii) {
        const lightUbo = twgl.createUniformBlockInfo(gl, programInfo, "Lights[0]");
        twgl.setBlockUniforms(lightUbo, {
          u_lightColor: [rand(0.5), 0.6, 0.8],
          u_lightWorldPos: [rand(-100, 100), rand(-100, 100), rand(-100, 100)],
        });
        twgl.setUniformBlock(gl, programInfo, lightUbo);
        lightUboInfos.push(lightUbo);
      }
    
      const materialUboInfos = [];
      for (let ii = 0; ii < 4; ++ii) {
        const materialUbo = twgl.createUniformBlockInfo(gl, programInfo, "Material");
        twgl.setBlockUniforms(materialUbo, {
          u_ambient: [0, 0, 0, 1],
          u_specular: [rand(0.5), 1, 0.5],
          u_shininess: rand(25, 250),
          u_specularFactor: rand(0.5, 1),
        });
        twgl.setUniformBlock(gl, programInfo, materialUbo);
    
        materialUboInfos.push(materialUbo);
      }
    
      const objects: {
        lightUboInfo: twgl.UniformBlockInfo,
        materialUboInfo: twgl.UniformBlockInfo,
        modelUboInfo: twgl.UniformBlockInfo
      }[] = [];
      for (let ii = 0; ii < 300; ++ii) {
        const modelUbo = twgl.createUniformBlockInfo(gl, programInfo, "Model");
        const world = m4.rotateY(m4.rotateX(m4.translation([rand(-30, 30), rand(-30, 30), rand(-30, 30)]), rand(Math.PI * 2)), rand(Math.PI));
    
        twgl.setBlockUniforms(modelUbo, {
          u_world: world,
          u_worldInverseTranspose: m4.transpose(m4.inverse(world)),
        });
        twgl.setUniformBlock(gl, programInfo, modelUbo);
    
        const o = {
          modelUboInfo: modelUbo,
          materialUboInfo: randElement(materialUboInfos),
          lightUboInfo: randElement(lightUboInfos),
          world: modelUbo.uniforms.u_world || new Float32Array(16),  // See above
        };
        objects.push(o);
      }
    
let delta: number = 0, lastTime: number = 0, lastTick: number = 0;
function render(time: number) {
    delta = time - lastTime;
    lastTick += delta;
    lastTime = time;
    time = time / 1000;
    twgl.resizeCanvasToDisplaySize(gl.canvas)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const projection = m4.perspective(30 * Math.PI / 180, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.5, 250);
    const radius = 70;
    const eye = [Math.sin(time) * radius, Math.sin(time * 0.3) * radius * 0.6, Math.cos(time) * radius];
    const target = [0, 0, 0];
    const up = [0, 1, 0];

    const camera = m4.lookAt(eye, target, up, viewInverse);
    const view = m4.inverse(camera);
    m4.multiply(projection, view, viewProjection);

    gl.useProgram(programInfo.program);
    twgl.setBuffersAndAttributes(gl, programInfo, bufferInfo);
    twgl.setUniforms(programInfo, uniforms);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    twgl.setUniformBlock(gl, programInfo, viewUboInfo);
    objects.forEach(function(o) {
      twgl.bindUniformBlock(gl, programInfo, o.lightUboInfo);
      twgl.bindUniformBlock(gl, programInfo, o.materialUboInfo);
      twgl.bindUniformBlock(gl, programInfo, o.modelUboInfo);

      twgl.drawBufferInfo(gl, bufferInfo);
    });
    requestAnimationFrame(render);
}
requestAnimationFrame(function (time: number) {
    lastTime = time;
    render(time);
});
device.readTxt('test.txt').then(console.log)