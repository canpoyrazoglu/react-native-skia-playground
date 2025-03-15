export const GRADIENT = `
vec4 main(vec2 pos) {
  /** renders a simple gradient with red color based on x value and green value based on y value. the pos (position) vector is passed to the main function for each pixel that will be rendered. since the output value should be between 0 and 1,and the pos is actually an integer, we divide by a large number to get roughly a number between 0 and 1 for color values. */
  return vec4(pos.x / 500, pos.y / 500, 1, 1);
}`;
