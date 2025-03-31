import { CHECKERBOARD } from './checkerboard.shader';
import { GRADIENT } from './gradient.shader';
import { HELLO_WORLD } from './helloWorld.shader';
import { HUE_SWEEP } from './hueSweep.shader';
import { RAINBOW_GRADIENTS } from './rainbowGradients.shader';
import { TAP } from './tap.shader';
import { TIME_GRADIENT } from './timeGradient.shader';

type ShaderExample = {
  name: string;
  shader: string;
};

export default [
  {
    name: 'Hello World',
    shader: HELLO_WORLD,
  },
  {
    name: 'Gradient',
    shader: GRADIENT,
  },
  {
    name: 'Time Gradient',
    shader: TIME_GRADIENT,
  },
  {
    name: 'Checkerboard',
    shader: CHECKERBOARD,
  },
  {
    name: 'Tap',
    shader: TAP,
  },
  {
    name: 'Hue Sweep',
    shader: HUE_SWEEP,
  },
  {
    name: 'Rainbow Gradients',
    shader: RAINBOW_GRADIENTS,
  },
] as ShaderExample[];
