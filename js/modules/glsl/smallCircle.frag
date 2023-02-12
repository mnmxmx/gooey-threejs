uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

varying vec2 vColorValue;
varying vec2 vUv;

void main(){
  vec3 color = mix(uColor1, uColor2, vColorValue.x);
  color = mix(color, uColor3, vColorValue.y);

  color += (vUv.x + vUv.y) * 0.2;

  gl_FragColor = vec4(color, 1.0);

}