precision highp float;

uniform sampler2D texture;
uniform sampler2D tileset;
uniform vec2 map_size;
uniform vec2 tile_size;

//uniform vec2 tileset_size;

varying vec2 v_texcoord;

void main() {
    
    vec2 tile = 1./map_size;
    
	vec2 coord = floor(texture2D(texture, v_texcoord).rg * 255. + 0.1);
    vec2 frac = mod(fract(v_texcoord * map_size), 1.);
    
    frac = clamp(frac, 1./16., 1.-1./16.);
    
    vec2 local_uv = (frac * tile);
    //local_uv *= ((tile_size-1.) / tile_size); //use for linear
    //local_uv *= ((tile_size-.125) / tile_size); //use for nearest

    vec2 local_offset = tile * coord;
    //local_offset += + 1./512.; //use for linear
    //local_offset += 1./4096.; //use for nearest
    
    vec3 result = texture2D(tileset, local_offset + local_uv).rgb;
	gl_FragColor = vec4(result , 1.0);
}
