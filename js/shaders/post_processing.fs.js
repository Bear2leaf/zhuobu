export default `precision mediump float;
varying vec2 v_texcoords;

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
    gl_FragColor = vec4(0.0);

    vec3 sample[9];
    // sample from texture offsets if using convolution matrix
    if(chaos || shake)
        for(int i = 0; i < 9; i++)
            sample[i] = vec3(texture2D(scene, v_texcoords.st + offsets[i]));

    // process effects
    if(chaos)
    {           
        for(int i = 0; i < 9; i++)
            gl_FragColor += vec4(sample[i] * edge_kernel[i], 0.0);
        gl_FragColor.a = 1.0;
    }
    else if(confuse)
    {
        gl_FragColor = vec4(1.0 - texture2D(scene, v_texcoords).rgb, 1.0);
    }
    else if(shake)
    {
        for(int i = 0; i < 9; i++)
            gl_FragColor += vec4(sample[i] * blur_kernel[i], 0.0);
        gl_FragColor.a = 1.0;
    }
    else
    {
        gl_FragColor =  texture2D(scene, v_texcoords);
    }
}`;
//# sourceMappingURL=post_processing.fs.js.map