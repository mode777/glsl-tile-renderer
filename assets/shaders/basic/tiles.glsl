precision mediump float;

uniform sampler2D texture;
uniform sampler2D tileset;

const vec2 map_size = vec2(4.,4.);
const vec2 tile = vec2(1./16.);

varying vec2 v_texcoord;

void main() {
	vec2 coord = texture2D(texture, v_texcoord).rg * 255.;
    vec2 local_uv = fract(v_texcoord * map_size) * tile;
    vec2 local_offset = tile * coord;
    
    vec3 result = texture2D(tileset, local_uv + local_offset).rgb;
	gl_FragColor = vec4(fract(v_texcoord * map_size), 0., 1.0);
}
