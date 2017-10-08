precision mediump float;

uniform sampler2D texture;

varying vec2 v_texcoord;

void main() {
	float alpha = texture2D(texture, v_texcoord).a;
    
	gl_FragColor = vec4(vec3(alpha) ,1.0);
}