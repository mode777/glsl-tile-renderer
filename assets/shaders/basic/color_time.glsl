precision mediump float;
uniform vec3 color;
uniform float time;

void main() {
	gl_FragColor = vec4(abs(sin(color.r * time)),color.g,color.b,1.0);
}
