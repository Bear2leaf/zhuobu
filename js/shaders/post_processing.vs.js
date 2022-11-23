export default `attribute vec4 a_position; // <vec2 position, vec2 texCoords>

varying vec2 v_texcoords;

uniform bool chaos;
uniform bool confuse;
uniform bool shake;
uniform float time;

void main()
{
    gl_Position = vec4(a_position.xy, 0.0, 1.0); 
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
}`;
//# sourceMappingURL=post_processing.vs.js.map