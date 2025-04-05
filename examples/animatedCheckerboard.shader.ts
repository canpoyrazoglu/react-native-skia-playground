export const ANIMATED_CHECKERBOARD = `
/** create a "black and white" grid that animates hues over time */
vec4 main(vec2 pos) {
  // Calculate the side length of each grid cell (dividing the width into 10 cells)
  float side = size.x / 10;
  // Convert the position into grid coordinates
  float x = pos.x / side;
  float y = pos.y / side;
  
  // Determine if the grid cell indices are even or odd to create a checkerboard pattern
  bool xMod2 = bool(int(mod(x, 2)));
  bool yMod2 = bool(int(mod(y, 2)));
  
  // XOR the booleans to alternate luminance between cells
  float lum = float(xMod2 ^^ yMod2);
  // Set specific luminance levels: lower for "false" cells and higher for "true" cells
  if (lum < 0.5){
    lum = 0.25;
  } else {
    lum = 0.75;
  }

  // Time-based shifts to animate hue changes over time, using different moduli to vary speeds
  int modShift0Increment = int(mod(time / 120, 8));
  int xMod_shift_1_Increment = int(mod(time / 120, 7));
  int xMod_shift_2_Increment = int(mod(time / 120, 5));

  // Calculate modulated grid positions for red hue, adding a time-based offset and wrapping with mod 4
  int xMod4 = int(mod(float(modShift0Increment) + x, 4));
  int yMod4 = int(mod(float(modShift0Increment) + y, 4));

  // Compute shifted x positions for green and blue hues using different time-based increments
  int xMod4_shifted1 = int(mod(float(xMod_shift_1_Increment) + x, 4));
  int xMod4_shifted2 = int(mod(float(xMod_shift_2_Increment) + x, 4));
  
  // Derive the color intensities by averaging the modulated grid coordinates for each channel
  float red = float((xMod4 + yMod4) / 2); 
  float green = float((xMod4_shifted1 + yMod4) / 2); 
  float blue = float((xMod4_shifted2 + yMod4) / 2); 
  
  /** Return the final color, combining the animated hues with the grid luminance */
  return vec4(red * lum, green * lum, blue * lum, 1);
}`;
