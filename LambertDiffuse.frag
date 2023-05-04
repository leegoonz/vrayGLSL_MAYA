//V-Ray Fragment Program 1.0

#version 110
__color uniform vec4 diffuse = vec4(0.6, 0.2, 1.0, 1.0);

void main()
{
    vec3 normal = (gl_FrontFacing) ? vr_Normal : -vr_Normal;
    vec3 direction = vr_Direction;

    vec4 Lambert = vec4(0.0, 0.0, 0.0, 1.0);

    vr_LightIterator light;

    for(int i = 0; i < vr_NumLights; ++i)
    {
        vr_evalLight(i, vr_Position, normal, light);
        float ndotl = dot(light.direction , normal);  
        if(ndotl > 0.0)
        {
            Lambert += clamp(ndotl,0.0,1.0);
        }
    } 
    Lambert *=diffuse;

    // Output final color
    gl_FragColor.rgb = Lambert.rgb;
    gl_FragColor.a = 1.0;

}
