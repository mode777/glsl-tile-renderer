precision mediump float;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D map;

varying vec2 v_texcoord;

void main() {
	vec3 result0 = texture2D(texture0, v_texcoord).xyz;
	vec3 result1 = texture2D(texture1, v_texcoord).xyz;
	vec3 intensity3 = texture2D(map, v_texcoord).xyz;

	float intensity = (intensity3.x + intensity3.y + intensity3.z) / 3.0;

	gl_FragColor = vec4(mix(result0, result1, intensity), 1.0);
}
