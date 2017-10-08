precision mediump float;

uniform sampler2D texture;
uniform float threshold1;
uniform float threshold2;
uniform float smoothing;

varying vec2 v_texcoord;

void main() {
	vec3 result = texture2D(texture, v_texcoord).xyz;
	//vec3 filtered = smoothstep(threshold-smoothing, threshold+smoothing,  result)
	vec3 filtered = smoothstep(threshold1-smoothing, threshold1, result) - 
          smoothstep(threshold2, threshold2+smoothing, result);
	gl_FragColor = vec4(filtered ,1.0);
}
