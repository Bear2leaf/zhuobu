#version 300 es 
layout(location = 0) in vec4 a_position;
layout(location = 1) in vec4 a_color;
uniform mat4 u_projection;
uniform mat4 u_view;
uniform mat4 u_world;
out vec4 v_color;

void main() {
    v_color = a_color;
    gl_Position = u_projection * u_view * u_world * a_position;
}