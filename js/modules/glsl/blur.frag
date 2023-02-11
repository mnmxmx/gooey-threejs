uniform sampler2D uDiffuse;
uniform vec2 uStep;
uniform vec2 uStepSize;
uniform float uWeight[BLUR_RADIUS];


varying vec2 vUv;

void main() {
  float count =  float(BLUR_RADIUS) - 1.0;

  vec4 color = vec4(0.0);
  vec4 sum = vec4(0.0);
  float w;
  float sumW = 0.0;
  float actualWeight;

  // loop
  for(int i = 0; i <  BLUR_RADIUS - 1; i++){
    w = uWeight[i];

    color = texture2D( uDiffuse, vUv - count * uStep * uStepSize);
    actualWeight = w * color.a;
    sum.rgb += color.rgb * actualWeight;
    sum.a += color.a * w;
    sumW += actualWeight;

    color = texture2D( uDiffuse, vUv + count * uStep * uStepSize);
    actualWeight = w * color.a;
    sum.rgb += color.rgb * actualWeight;
    sum.a += color.a * w;
    sumW += actualWeight;

    count--;
  }

  w = uWeight[BLUR_RADIUS - 1];

  color = texture2D( uDiffuse, vUv );
  actualWeight = w * color.a;
  sum.rgb += color.rgb * actualWeight;
  sum.a += color.a * w;
  sumW += actualWeight;

  gl_FragColor = vec4(sum.rgb / sumW, sum.a);
}