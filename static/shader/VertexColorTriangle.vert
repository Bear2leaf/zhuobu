#version 300 es 
layout(location = 0) in vec4 a_position;
layout(location = 1) in vec4 a_color;
layout(location = 2) in vec2 a_texcoord;
uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;
out vec4 v_color;
out vec2 v_texcoord;

void main() {
    v_color = a_color;
    v_texcoord = a_texcoord;
    gl_Position = u_projection * u_view * u_world * a_position;
}