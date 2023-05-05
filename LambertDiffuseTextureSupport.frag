//V-Ray Fragment Program 1.0

#version 110
__color uniform vec4 diffuseColor = vec4(0.6, 0.2, 1.0, 1.0);
uniform sampler2D baseTexture;

void main()
{
    vec3 normal = (gl_FrontFacing) ? vr_Normal : -vr_Normal;
    vec3 viewDir = vr_Direction;
    float specAngle = 1.0;
    float shininess = 250.0;
    float specularStrength = 1.0;

    vec4 Lambert = vec4(0.0, 0.0, 0.0, 1.0);
    vec4 Specular = vec4(0.0, 0.0, 0.0, 1.0);

    
    vec3 baseTextureVar = vec3(texture2D(baseTexture, vec2(gl_TexCoord[0])));
    vec3 raw_diffsue = baseTextureVar * diffuseColor.rgb;

    vec3 gi_contribution = vr_irradiance(normal, 1.0);

    vr_LightIterator light;

    for(int i = 0; i < vr_NumLights; ++i)
    {
        vr_evalLight(i, vr_Position, normal, light);
        float ndotl = clamp(dot(light.direction , normal),0.0,1.0);  
        vec3 halfDir = normalize(viewDir + light.direction );
        float ndoth = dot(normal, halfDir);

        if(ndotl > 0.0)
        {
            Lambert += vec4(vec3(ndotl) * light.contribution,0.0);
        }
    }

    Lambert.rgb *= raw_diffsue;
    Lambert.rgb += vec3(raw_diffsue * gi_contribution);
  
  
  // Output final color
  gl_FragColor.rgb = Lambert.rgb;
  gl_FragColor.a = 1.0;

}
