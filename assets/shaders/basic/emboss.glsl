// Emboss (Anastadunbar) https://www.shadertoy.com/view/ll2Xzm
precision mediump float;

uniform sampler2D texture;
uniform float dir;
uniform float dist; 
uniform float strength;

varying vec2 v_texcoord;

void main() {
    vec4 draw = vec4(0.);
    float _dist = dist * 0.001; //Make distance smaller
    float _dir = dir * 30;

    vec2 uvOffset = vec2(cos(_dir),sin(_dir)) * _dist;
    vec3 sample0 = texture(texture, uv).rgb;
    vec3 sample1 =  texture(texture, uv + uvOffset).rgb

    draw = vec4(0.5+((sample0-sample1)*strength),1.0);
    draw = vec4((draw.r+draw.g+draw.b)/vec3(3.),1.0);

	gl_FragColor = draw;
}
