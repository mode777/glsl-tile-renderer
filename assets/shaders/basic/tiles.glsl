precision mediump float;

uniform sampler2D texture;
uniform sampler2D tileset;
uniform float time;

const vec2 map_size = vec2({{=Math.floor(it.map_size[0])}}.0,{{=Math.floor(it.map_size[1])}}.0);
//const vec2 map_size = vec2(1024.,1024.);
const vec2 tile_size = vec2({{=Math.floor(it.tile_size[0])}}.0,{{=Math.floor(it.tile_size[1])}}.0);
//const vec2 tile_size = vec2(32.,32.);
const vec2 set_size = vec2({{=Math.floor(it.set_size[0])}}.0,{{=Math.floor(it.set_size[1])}}.0);
//const vec2 set_size = vec2(32.,32.);
const vec2 tile = 1./map_size;
const vec2 set = 1./set_size;
const vec2 fac = map_size * tile_size * 3.;
const vec2 clamp_low = 1.0 / (tile_size * 2.0);
const vec2 clamp_high = 1.0 - clamp_low;

varying vec2 v_texcoord;

void main() {

    
    // normalize coordinates to a sub-pixel grid;
    vec2 uv =  floor(v_texcoord * fac) / fac;

	vec4 coord = floor(texture2D(texture, uv).rgba * 255. + 0.1);
    vec2 flip = sign(vec2(
            mod(coord.z, 2.), 
            mod(
                floor(coord.z/2.), 2.)));    


    float animSpeed = floor(coord.a / 16.0 + 0.1) + 1.;
    float animRange = mod(coord.a, 16.0)+1.;
    float animOffset = mod(floor(time/(100. * animSpeed)), animRange);
    coord.x += animOffset; 

    //if(coord.x == 255.0 && coord.y == 255.0)
    //    discard;
    
    vec2 frac = fract(uv * map_size);
    // flip tile
    frac = abs(flip - frac);
        
    frac = clamp(frac, clamp_low, clamp_high);
    
    vec2 local_uv = (frac * set);
    vec2 local_offset = set * coord.rg;
    
    vec4 result = texture2D(tileset, local_offset + local_uv).rgba;
    if(result.a < 1.0)
        discard;

	gl_FragColor = result;
}
