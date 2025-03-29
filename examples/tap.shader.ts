export const TAP = `
vec4 main(vec2 pos) {
  for(int i = 0; i < 20; i++){
    if(i >= touchCount){
      break;
    }
    vec4 touch = touches[i];
    vec2 tapPoint = vec2(touch[TOUCH_X], touch[TOUCH_Y]);
    float dist = distance(pos, tapPoint);
    float distLower = 36;
    if(!isTouchDown(touch)){
      float timePassed = time - touch[TOUCH_END_TIME];
      distLower += timePassed * 0.2;
    }
    
    if(dist < distLower + 4 && dist > distLower){
      return vec4(1, 0.2, 0.3, 1);
    }
  }

  return vec4(vec3(0.1), 1);
}`;
