export const HUE_SWEEP = `
vec4 main(vec2 pos) {
  /** oscillate red, green, and blue channels with different periods to
   *  create a "pseudorandom" color sweep effect
   * */
  return vec4(sin(time / 100), cos(time / 203), sin(time / 307), 1);
}`;
