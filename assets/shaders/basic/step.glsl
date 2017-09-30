precision mediump float;

uniform sampler2D texture;
uniform float threshold;
uniform float smoothing;

varying vec2 v_texcoord;

void main() {
	vec3 result = texture2D(texture, v_texcoord).xyz;

	gl_FragColor = vec4(smoothstep(threshold-smoothing, threshold+smoothing,  result) ,1.0);
}
