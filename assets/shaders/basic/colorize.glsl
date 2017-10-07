precision mediump float;

uniform sampler2D texture;
uniform vec3 high;
uniform vec3 low;

varying vec2 v_texcoord;

void main() {
	float alpha = texture2D(texture, v_texcoord).x;
    vec3 result = mix(low, high, alpha);
	gl_FragColor = vec4(result ,1.0);
}