export default `attribute vec4 a_position;

varying vec2 v_texcoords;

uniform mat4 model;
uniform mat4 projection;

void main() {
  v_texcoords = vec2(a_position.zw);
  gl_Position = projection * model * vec4(a_position.xy, 0.0, 1.0);
}`