export default `precision mediump float;

uniform sampler2D sprite;
uniform vec3 spriteColor;
varying vec2 v_texcoords;
void main() {
  gl_FragColor = vec4(spriteColor, 1.0) * texture2D(sprite, v_texcoords);
}`;
//# sourceMappingURL=sprite.fs%20copy.js.map