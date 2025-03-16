export const TIME_GRADIENT = `
vec4 main(vec2 pos) {
  /** size and time are injected uniforms red and green are normalized values from 0 to 1 at x and y axes respectively, and blue value is osciallating using sine of the injected uniform time */
  vec2 normalized = pos/size;
  return vec4(normalized.x, normalized.y, 0.5 + sin(time * 10e-4) / 2, 1);
}`;
