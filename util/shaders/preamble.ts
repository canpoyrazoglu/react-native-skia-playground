/* add any injected uniforms here to be used in shader code
 * without explicitly adding
 */
const preamble = `
  uniform float2 size;
  uniform float time;
  uniform float4 taps[20];
`;

export default preamble;
