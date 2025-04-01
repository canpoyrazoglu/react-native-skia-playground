export const TAP = `
vec4 main(vec2 pos) {
  /** iterate all possible touches (not the number of touches, but the
   * size of the touches array)
   */
  for(int i = 0; i < MAX_TOUCHES; i++){
    // check the current index vs actual touch count (from uniform)
    if(i >= touchCount){
      break;
    }

    // get distance of current pixel's location to tap location
    vec4 touch = touches[i];
    vec2 tapPoint = vec2(touch[TOUCH_X], touch[TOUCH_Y]);
    float dist = distance(pos, tapPoint);
    float distLower = 36;
    if(!isTouchDown(touch)){
      // expand away the touch after release
      float timePassed = time - touch[TOUCH_END_TIME];
      distLower += timePassed * 0.2;
    }
    
    if(dist < distLower + 4 && dist > distLower){
      return vec4(1, 0.2, 0.3, 1);
    }
  }

  return vec4(vec3(0.1), 1);
}`;
