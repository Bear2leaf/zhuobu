export default `precision mediump float;

varying vec2 v_texcoords;
varying vec4 v_particleColor;

uniform sampler2D sprite;
void main() {
  gl_FragColor = (texture2D(sprite, v_texcoords) * v_particleColor);
}
`