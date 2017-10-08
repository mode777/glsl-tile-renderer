// The MIT License (MIT) Copyright (c) 2015 Jamie Owen
//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
precision mediump float;

const int Normal = 0; 
const int Lighten= 1;
const int Darken= 2;
const int Multiply= 3;
const int Average= 4;
const int Add= 5;
const int Subtract= 6;
const int Difference= 7;
const int Negation= 8;
const int Exclusion= 9; 
const int Screen= 10;
const int Overlay= 11;
const int SoftLight= 12;
const int HardLight= 13;
const int ColorDodge= 14;
const int ColorBurn= 15;
const int LinearDodge= 16;
const int LinearBurn= 17;
const int LinearLight= 18;
const int VividLight= 19;
const int PinLight= 20;
const int HardMix= 21;
const int Reflect= 22;
const int Glow= 23;
const int Phoenix= 24;
const int Hue= 25;
const int Saturation= 26;
const int Color= 27;
const int Luminosity= 28;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D map;

uniform float opacity;
uniform int mode;

varying vec2 v_texcoord;

// multiply
vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}

// screen
float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}

void main() {
	vec3 result0 = texture2D(texture0, v_texcoord).xyz;
	vec3 result1 = texture2D(texture1, v_texcoord).xyz;
	vec3 intensity3 = texture2D(map, v_texcoord).xyz;

	//float intensity = (intensity3.x + intensity3.y + intensity3.z) / 3.0;
	vec3 result;

	if(mode == Normal){
		result = mix(result0, result1, opacity);
	}
	else if(mode == Lighten){
	}
	else if(mode == Darken){
	}
	else if(mode == Multiply){
		result = blendMultiply(result0, result1, opacity);
	}
	else if(mode == Average){
	}
	else if(mode == Lighten){
	}
	else if(mode == Add){
	}
	else if(mode == Subtract){
	}
	else if(mode == Difference){
	}
	else if(mode == Negation){
	}
	else if(mode == Exclusion){
	}
	else if(mode == Screen){
		result = blendScreen(result0, result1, opacity);	
	}
	else if(mode == Overlay){
	}
	else if(mode == SoftLight){
	}
	else if(mode == HardLight){
	}
	else if(mode == ColorDodge){
	}
	else if(mode == ColorBurn){
	}
	else if(mode == LinearDodge){
	}
	else if(mode == LinearBurn){
	}
	else if(mode == LinearLight){
	}
	else if(mode == VividLight){
	}
	else if(mode == PinLight){
	}
	else if(mode == HardMix){
	}
	else if(mode == Reflect){
	}
	else if(mode == Glow){
	}
	else if(mode == Phoenix){
	}
	else if(mode == Hue){
	}
	else if(mode == Saturation){
	}
	else if(mode == Color){
	}
	else if(mode == Luminosity){
	}




	gl_FragColor = vec4(result, 1.0);
}
