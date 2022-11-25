export default `#version 300 es
precision highp float;

// Passed in from the vertex shader.
in vec2 v_texcoord;

out vec4 color;
uniform sampler2D u_texture;

uniform vec3 textColor;

void main() {
  color = vec4(textColor, 1.0) * texture(u_texture, v_texcoord);
}
`;