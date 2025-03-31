export const RAINBOW_GRADIENTS = `

float glitchRed(vec2 pos){
  vec2 p = pos / size;
  vec2 pt1 = vec2(randoms[0], randoms[1]);
  vec2 pt2 = vec2(randoms[2], randoms[3]);
  vec2 pt3 = vec2(randoms[4], randoms[5]);
  float d1 = distance(p, pt1);
  float d2 = distance(p, pt2);
  float d3 = distance(p, pt3);

  float temporalOscillation1 = 0.5 + 0.5 * sin(time * randoms[6] / 100);
  float temporalOscillation2 = 0.5 + 0.5 * cos(time * randoms[7] / 100);
  return sin(d1 * d2 * d3 * 3 + temporalOscillation1 * temporalOscillation2);
}

float glitchGreen(vec2 pos){
  vec2 p = pos / size;
  vec2 pt1 = vec2(randoms[20], randoms[21]);
  vec2 pt2 = vec2(randoms[22], randoms[23]);
  vec2 pt3 = vec2(randoms[24], randoms[25]);
  float d1 = distance(p, pt1);
  float d2 = distance(p, pt2);
  float d3 = distance(p, pt3);

  float temporalOscillation1 = 0.5 + 0.5 * sin(time * randoms[26] / 100);
  float temporalOscillation2 = 0.5 + 0.5 * cos(time * randoms[27] / 100);
  return sin(d1 * d2 * d3 * 3 + temporalOscillation1 * temporalOscillation2);
}

float glitchBlue(vec2 pos){
  vec2 p = pos / size;
  vec2 pt1 = vec2(randoms[40], randoms[41]);
  vec2 pt2 = vec2(randoms[42], randoms[43]);
  vec2 pt3 = vec2(randoms[44], randoms[45]);
  float d1 = distance(p, pt1);
  float d2 = distance(p, pt2);
  float d3 = distance(p, pt3);

  float temporalOscillation1 = 0.5 + 0.5 * sin(time * randoms[46] / 100);
  float temporalOscillation2 = 0.5 + 0.5 * cos(time * randoms[47] / 100);
  return sin(d1 * d2 * d3 * 3 + temporalOscillation1 * temporalOscillation2);
}

vec4 main(vec2 pos) {
  // float temporalOscillation = sin(time / 100);
  // float spatialXOscillation = sin(pos.x / 100);
  float red = glitchRed(pos);
  float green = glitchGreen(pos);
  float blue = glitchBlue(pos);
  // float red = temporalOscillation * spatialXOscillation;
  return vec4(red, green, blue, 1);
}`;
