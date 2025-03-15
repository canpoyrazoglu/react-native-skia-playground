export const TIME_GRADIENT = `
vec4 main(vec2 pos) {
  // size and time are injected uniforms
  vec2 normalized = pos/size;
  return vec4(normalized.x, normalized.y, sin(time * 10e-4), 1);
}`;
