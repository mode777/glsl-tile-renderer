attribute vec4 position;
attribute vec2 texcoord;

uniform mat4 matrix;
uniform vec2 scale;

varying vec2 v_texcoord;

void main() {
	
	vec4 tex = vec4(texcoord * scale, 1., 1.);
	v_texcoord = ( matrix * tex).xy;
	//v_texcoord = texcoord;

	gl_Position = position;
}