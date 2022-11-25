export default `#version 300 es
in vec4 a_position;

uniform mat4 projection;

out vec2 v_texcoord;

void main() {
  // Multiply the position by the matrix.
  gl_Position = projection * vec4(a_position.xy, 0, 1);

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_position.zw;
}
`