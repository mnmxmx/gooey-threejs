uniform float uTime;
uniform vec3 uColor;

varying vec2 vUv;
void main(){
  gl_FragColor = vec4(uColor + (vUv.x + vUv.y) * 0.2, 1.0);
}