export const RAINBOW_GLITCH = `

float glitch(vec2 pos){


  vec2 p = pos / size;
  vec2 pt1 = vec2(randoms[0], randoms[1]);
  vec2 pt2 = vec2(randoms[2], randoms[3]);
  vec2 pt3 = vec2(randoms[4], randoms[5]);
  float d1 = distance(p, pt1);
  float d2 = distance(p, pt2);
  float d3 = distance(p, pt3);

  float temporalOscillation1 = 0.5 +  0.5 * sin(time / randoms[6]);
  float temporalOscillation2 = 0.5 +  0.5 * cos(time / randoms[7]);
  // return sin(mod(pos.x, 3.7) * mod(pos.y, 24.2)) * cos(mod(pos.x, sin(pos.x)));
  return sin(d1 * d2 * d3 * 3 + sin(temporalOscillation1 / 10));
}

vec4 main(vec2 pos) {
  // float temporalOscillation = sin(time / 100);
  // float spatialXOscillation = sin(pos.x / 100);
  float g = glitch(pos);
  // float red = temporalOscillation * spatialXOscillation;
  return vec4(g, g, g, 1);
}`;