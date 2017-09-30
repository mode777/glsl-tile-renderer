precision mediump float;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform float threshold;

varying vec2 v_texcoord;

void main() {
	vec3 result0 = texture2D(texture0, v_texcoord).xyz;
	vec3 result1 = texture2D(texture1, v_texcoord).xyz;

	gl_FragColor = vec4(mix(result0, result1, threshold), 1.0);
}
