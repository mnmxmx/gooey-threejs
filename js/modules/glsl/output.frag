uniform sampler2D uDiffuse;

varying vec2 vUv;
void main(){
  vec4 diffuse = texture2D(uDiffuse, vUv);
  diffuse.a = min(1.0, diffuse.a * 80.0 - 10.0);
  gl_FragColor = vec4(diffuse);
}