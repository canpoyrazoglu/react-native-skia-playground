import { CHECKERBOARD } from './checkerboard.shader';
import { GRADIENT } from './gradient.shader';
import { HELLO_WORLD } from './helloWorld.shader';
import { HUE_SWEEP } from './hueSweep.shader';
import { RAINBOW_GRADIENTS } from './rainbowGradients.shader';
import { TAP } from './tap.shader';
import { TIME_GRADIENT } from './timeGradient.shader';

export const EXAMPLE_THUMBS = {
  helloWorld: require('../assets/images/examples/thumbs/helloWorld.jpg'),
  gradient: require('../assets/images/examples/thumbs/gradient.jpg'),
  timeGradient: require('../assets/images/examples/thumbs/timeGradient.jpg'),
  checkerboard: require('../assets/images/examples/thumbs/checkerboard.jpg'),
  tap: require('../assets/images/examples/thumbs/tap.jpg'),
  hueSweep: require('../assets/images/examples/thumbs/hueSweep.jpg'),
  // eslint-disable-next-line max-len
  rainbowGradients: require('../assets/images/examples/thumbs/rainbowGradients.jpg'),
};

export type ShaderExample = {
  name: string;
  description: string;
  shader: string;
  thumb: keyof typeof EXAMPLE_THUMBS;
};

export default [
  {
    name: 'Hello World',
    shader: HELLO_WORLD,
    thumb: 'helloWorld',
    description: 'Most basic example that displays a static color.',
  },
  {
    name: 'Gradient',
    shader: GRADIENT,
    thumb: 'gradient',
    description: 'Display a static gradient based on pixel coordinates.',
  },
  {
    name: 'Time Gradient',
    shader: TIME_GRADIENT,
    thumb: 'timeGradient',
    description: 'Animate colors of gradient over time.',
  },
  {
    name: 'Checkerboard',
    shader: CHECKERBOARD,
    thumb: 'checkerboard',
    description: 'Display a statick checkerboard.',
  },
  {
    name: 'Tap',
    shader: TAP,
    thumb: 'tap',
    description: 'Animate circles based on touches.',
  },
  {
    name: 'Hue Sweep',
    shader: HUE_SWEEP,
    thumb: 'hueSweep',
    description: 'Animate the hue over time.',
  },
  {
    name: 'Rainbow Gradients',
    shader: RAINBOW_GRADIENTS,
    thumb: 'rainbowGradients',
    description: 'Animate complex gradients over time.',
  },
] as ShaderExample[];
