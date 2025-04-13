export const ROTATION = `
// experimental. work in progress.
vec4 main(vec2 pos) {
  float xPercentage = pos.x / size.x;
  if(xPercentage < 0.333){
    float val = (rotation[YAW] + PI) / (PI  * 2);
    return vec4(vec3(val), 1);
  }else if(xPercentage < 0.667){
    float val = (rotation[PITCH] + PI) / (PI  * 2);
    return vec4(vec3(val), 1);
  }
  float val = (rotation[ROLL] + PI) / (PI  * 2);
  return vec4(vec3(val), 1);
}`;
