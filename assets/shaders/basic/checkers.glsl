precision mediump float;

uniform float tileX;
uniform float tileY;

varying vec2 v_texcoord;

void main() {
    vec2 st = v_texcoord * vec2(tileX, tileY);
    vec2 pct = step(.5, mod(st, 1.0));
    vec3 color = vec3(abs(-1.0 + pct.x + pct.y));
    
	gl_FragColor = vec4(color,1.0);
}