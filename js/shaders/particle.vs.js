export default `attribute vec4 a_position;

varying vec2 v_texcoords;
varying vec4 v_particleColor;

uniform mat4 projection;
uniform vec2 offset;
uniform vec4 color;

void main()
{
    float scale = 10.0;
    v_texcoords = a_position.zw;
    v_particleColor = color;
    gl_Position = projection * vec4((a_position.xy * scale) + offset, 0.0, 1.0);
}`;
//# sourceMappingURL=particle.vs.js.map