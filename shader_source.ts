export const text_2d = {
    fs: `#version 300 es 
    precision highp float; 
     
    // Passed in from the vertex shader. 
    in vec2 v_texcoord; 
    out vec4 color; 
    uniform sampler2D u_texture; 
     
    uniform vec4 textColor; 
    void main() { 
      color = textColor * texture(u_texture, v_texcoord); 
    }`,
    vs: `#version 300 es 
    layout (location = 0) in vec4 a_position; 
    uniform mat4 projection; 
    out vec2 v_texcoord; 
     
    void main() { 
      // Multiply the position by the matrix. 
      gl_Position = projection * vec4(a_position.xy, 0, 1); 
     
      // Pass the texcoord to the fragment shader. 
      v_texcoord = a_position.zw; 
    } `
}
export const graphic_2d = {
    fs: `#version 300 es 
    precision highp float; 
    out vec4 color; 
          
    uniform vec4 graphicColor; 
    void main() { 
        color = graphicColor; 
    }`,
    vs: `#version 300 es 
    layout (location = 0) in vec3 a_position; 
    uniform mat4 projection; 
     
    void main() { 
      // Multiply the position by the matrix. 
      gl_Position = projection * vec4(a_position.xy, 0, 1); 
      gl_PointSize = a_position.z;
    } `
}
export const post_posscessing = {
    fs: `#version 300 es 
    precision highp float; 
    in vec2 v_texcoords;
    
    out vec4 color; 

    uniform sampler2D scene;
    uniform vec2  offsets[9];
    uniform float edge_kernel[9];
    uniform float blur_kernel[9];
    
    uniform bool chaos;
    uniform bool confuse;
    uniform bool shake;
    
    void main()
    {
        // zero out memory since an out variable is initialized with undefined values by default 
        color = vec4(0.0f);
    
        vec3 sam[9];
        // sample from texture offsets if using convolution matrix
        if(chaos || shake)
            for(int i = 0; i < 9; i++)
                sam[i] = vec3(texture(scene, v_texcoords.st + offsets[i]));
    
        // process effects
        if(chaos)
        {           
            for(int i = 0; i < 9; i++)
                color += vec4(sam[i] * edge_kernel[i], 0.0f);
            color.a = 1.0f;
        }
        else if(confuse)
        {
            color = vec4(1.0 - texture(scene, v_texcoords).rgb, 1.0);
        }
        else if(shake)
        {
            for(int i = 0; i < 9; i++)
                color += vec4(sam[i] * blur_kernel[i], 0.0);
            color.a = 1.0f;
        }
        else
        {
            color =  texture(scene, v_texcoords);
        }
    }`,
    vs: `#version 300 es 
    layout (location = 0) in vec4 a_position; // <vec2 position, vec2 texCoords>

    out vec2 v_texcoords;
    
    uniform bool chaos;
    uniform bool confuse;
    uniform bool shake;
    uniform float time;
    
    void main()
    {
        gl_Position = vec4(a_position.xy, 0.0f, 1.0f); 
        vec2 texture = a_position.zw;
        if(chaos)
        {
            float strength = 0.3;
            vec2 pos = vec2(texture.x + sin(time) * strength, texture.y + cos(time) * strength);        
            v_texcoords = pos;
        }
        else if(confuse)
        {
            v_texcoords = vec2(1.0 - texture.x, 1.0 - texture.y);
        }
        else
        {
            v_texcoords = texture;
        }
        if (shake)
        {
            float strength = 0.01;
            gl_Position.x += cos(time * 10.0) * strength;        
            gl_Position.y += cos(time * 15.0) * strength;        
        }
    }`
}