precision mediump float;

uniform sampler2D texture;
uniform sampler2D tileset;
uniform vec2 map_size;
uniform vec2 tile_size;

//uniform vec2 tileset_size;

varying vec2 v_texcoord;

void main() {
    
    vec2 tile = 1./map_size;
    vec2 uv = v_texcoord;

    vec2 fac = map_size * tile_size * 8.;

    uv = floor(v_texcoord * fac) / fac;
    
	vec2 coord = floor(texture2D(texture, uv).rg * 255. + 0.1);
    vec2 frac = mod(fract(uv * map_size), 1.);
        
    frac = clamp(frac, 1./32., 1.-1./32.);
    
    vec2 local_uv = (frac * tile);

    vec2 local_offset = tile * coord;
    
    vec3 result = texture2D(tileset, local_offset + local_uv).rgb;
	gl_FragColor = vec4(result , 1.0);
}
