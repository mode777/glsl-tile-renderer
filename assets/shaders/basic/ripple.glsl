precision mediump float;

uniform sampler2D texture;
uniform float scaleX;
uniform float scaleY;
uniform float amplitudeX;
uniform float amplitudeY;

varying vec2 v_texcoord;

void main() {
    float offsetY = sin(v_texcoord.x * 3.14 * scaleX) / (1.0 / amplitudeY);
    float offsetX = sin(v_texcoord.y * 3.14 * scaleY) / (1.0 / amplitudeX);
    vec2 coord = vec2(v_texcoord.x + offsetX, v_texcoord.y + offsetY );
	vec3 result = texture2D(texture, coord).xyz;

	gl_FragColor = vec4(result ,1.0);
}