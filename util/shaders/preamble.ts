/* add any injected uniforms here to be used in shader code
 * without explicitly adding
 */
const preamble = `
  const int TOUCH_X = 0; // touch X position of touch vector
  const int TOUCH_Y = 1; // touch Y position of touch vector
  const int TOUCH_START_TIME = 2; // touch start time of touch vector
  const int TOUCH_END_TIME = 3; // touch end time of touch vector
  const float INVALID_TIME = -1.0; // invalid time constant
  const int MAX_TOUCHES = 20; // max possible touches
  const int RANDOM_COUNT = 100; // number of random numbers injected

  uniform float2 size; // size of the canvas
  uniform float time; // time since canvas rendering started
  uniform float4 touches[MAX_TOUCHES]; // array of current touches
  uniform float randoms[RANDOM_COUNT]; // array of injected randoms
  uniform int touchCount; // actual touch count

  /** helper function to check if a touch is currently down */
  bool isTouchDown(vec4 touch){
    return touch[TOUCH_START_TIME] != INVALID_TIME && touch[TOUCH_END_TIME] > time;
  }
`;

export default preamble;
