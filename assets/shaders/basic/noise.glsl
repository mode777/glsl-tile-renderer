
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

precision mediump float;

uniform float seed;

varying vec2 v_texcoord;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
	gl_FragColor = vec4(vec3(random(v_texcoord+seed)), 1.0);
}

/*
void main() {
    float res = random(floor(v_texcoord * 5.0));
	gl_FragColor = vec4(vec3(res), 1.0);
}*/
