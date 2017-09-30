precision mediump float;

const float margin = 0.05;
const float plot_offset_y = 0.5;
const float plot_scale_y = 10.0;
const float plot_scale_x = 10.0;


uniform vec2 resolution;
uniform float time;
// Plot a line on Y using a value between 0.0-1.0
float plot(float y, float pct){
  return  smoothstep(pct-0.006, pct, y) - 
          smoothstep( pct, pct+0.006, y);
}

void main() {
	vec2 st = gl_FragCoord.xy/resolution;

    float fx = sin(st.x*plot_scale_x+time*2.0) / plot_scale_y + plot_offset_y;

    vec3 color = vec3(1.0,1.0,1.0);
    vec3 color2 = vec3(0.0,0.0,0.0);
    
    // Plot a line
    float pct = plot(st.y,fx);
    color = mix(color, color2, pct);
    
	gl_FragColor = vec4(color,1.0);
}