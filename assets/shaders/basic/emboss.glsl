// Emboss (Anastadunbar) https://www.shadertoy.com/view/ll2Xzm
precision mediump float;

uniform sampler2D texture;
uniform float dir;
uniform float dist; 
uniform float strength;

varying vec2 v_texcoord;

const float DIST_SCALE = 0.001;

void main() {
    vec4 result = vec4(0.);
    float _dist = dist * DIST_SCALE;
    float _dir = dir;

    vec2 uvOffset = vec2(cos(_dir),sin(_dir)) * _dist;
    vec3 sample0 = texture2D(texture, v_texcoord).rgb;
    vec3 sample1 =  texture2D(texture, v_texcoord + uvOffset).rgb;

    result = vec4(((sample0-sample1) * strength) + 0.5,1.0);
    result = vec4((result.r+result.g+result.b)/vec3(3.),1.0);

	gl_FragColor = result;
}