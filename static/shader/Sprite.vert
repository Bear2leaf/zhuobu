#version 300 es 
layout(location = 0) in vec4 a_position;
uniform mat4 u_projection;
uniform mat4 u_view;
out vec2 v_texcoord;

void main() { 
              // Multiply the position by the matrix. 
    gl_Position = u_projection * u_view * vec4(a_position.xy, 0, 1); 

              // Pass the texcoord to the fragment shader. 
    v_texcoord = a_position.zw;
}