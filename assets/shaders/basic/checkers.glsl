precision mediump float;

uniform vec2 resolution;

void main() {
	vec2 st = gl_FragCoord.xy/resolution;

    vec2 pct = step(.5, mod(st, 1.0));
    vec3 color = vec3(abs(-1.0 + pct.x + pct.y));
    
	gl_FragColor = vec4(color,1.0);
}