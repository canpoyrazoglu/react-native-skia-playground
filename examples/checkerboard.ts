export const CHECKERBOARD = `
/** alternate between 20x20 squares of white and black */
vec4 main(vec2 pos) {
  float x = pos.x / 20;
  float y = pos.y / 20;
  bool xMod = bool(int(mod(x, 2)));
  bool yMod = bool(int(mod(y, 2)));
  /** take xor of mods to create checkerboard, resulting in 1 or 0 values */
  float color = float(xMod ^^ yMod);
  /** create a color of black or white pixels */
  return vec4(vec3(color), 1);
}`;
