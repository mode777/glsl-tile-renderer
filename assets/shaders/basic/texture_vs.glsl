attribute vec4 position;
attribute vec2 texcoord;

uniform mat4 matrix;

varying vec2 v_texcoord;

void main() {
	
	v_texcoord = ( matrix * vec4(texcoord.x, texcoord.y, 1.0, 1.0)).xy;
	//v_texcoord = texcoord;

	gl_Position = position;
}