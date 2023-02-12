attribute vec3 aVelocity;
attribute vec2 aColorValue;
attribute vec3 aRandom;
uniform float uTime;
uniform float uAreaSize;

varying vec2 vColorValue;
varying vec2 vUv;

void main(){

  float time = uTime * mix(0.5, 1.5, aRandom.x) * 0.1;

  vec3 velocity = vec3(aVelocity.xy, 0.0);
  float life = fract(aVelocity.z + time);
  float scale = mix(1.0, 0.5, life) * mix(0.25, 1.0, aRandom.y * aRandom.y);
  vec3 pos = position * scale + velocity * life * uAreaSize;
  vUv = uv;
 

  vColorValue = aColorValue;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}