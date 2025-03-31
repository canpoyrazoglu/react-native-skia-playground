/* add any injected uniforms here to be used in shader code
 * without explicitly adding
 */
const preamble = `
  const int TOUCH_X = 0;
  const int TOUCH_Y = 1;
  const int TOUCH_START_TIME = 2;
  const int TOUCH_END_TIME = 3;
  const float INVALID_TIME = -1.0;

  uniform float2 size;
  uniform float time;
  uniform float4 touches[20];
  uniform float randoms[100];
  uniform int touchCount;

  bool isTouchDown(vec4 touch){
    return touch[TOUCH_START_TIME] != INVALID_TIME && touch[TOUCH_END_TIME] > time;
  }
`;

export default preamble;
