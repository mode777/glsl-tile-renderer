precision mediump float;

uniform sampler2D texture;
uniform sampler2D tileset;
uniform vec2 map_size;
uniform vec2 tile_size;

//uniform vec2 tileset_size;

varying vec2 v_texcoord;

void main() {
    
    vec2 tile = 1./map_size;
    
	vec2 coord = floor(texture2D(texture, v_texcoord).rg * 255.);
    vec2 local_uv = (fract(v_texcoord * map_size) * tile) * ((tile_size-1.) / tile_size);
    vec2 local_offset = tile * coord - (511./512.);
    
    vec3 result = texture2D(tileset, local_uv + local_offset).rgb;
	gl_FragColor = vec4(result , 1.0);
}
