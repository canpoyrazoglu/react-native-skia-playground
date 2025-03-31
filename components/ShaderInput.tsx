import { Skia, SkRuntimeEffect } from '@shopify/react-native-skia';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useDebounce } from 'use-debounce';
import preamble from '../util/shaders/preamble';

type ShaderInputProps = Omit<
  TextInputProps,
  'placeholderTextColor' | 'multiline' | 'onChangeText' | 'placeholder'
> & {
  initialShader?: string;
  preamble?: string;
  onShaderUpdated: (shader: SkRuntimeEffect) => void;
};
function ShaderInput(props: ShaderInputProps) {
  const [shader, setShader] = useState(props.initialShader ?? '');
  const [debouncedShader] = useDebounce(shader, 80);
  const [isValid, setValid] = useState(true);
  useEffect(() => {
    if (!debouncedShader.trim().length) {
      setValid(true);
      return;
    }
    try {
      console.log('Compiling shader...');
      console.log(debouncedShader);
      const compiledSource = Skia.RuntimeEffect.Make(
        preamble + debouncedShader,
      );
      props.onShaderUpdated(compiledSource!);
      console.log('Successfully compiled shader.');
      setValid(true);
    } catch (e) {
      console.warn('Unable to compile shader', e);
      setValid(false);
    }
  }, [props, debouncedShader]);
  return (
    <TextInput
      {...props}
      autoCorrect={false}
      spellCheck={false}
      placeholderTextColor={'#888'}
      multiline
      autoCapitalize="none"
      style={[styles.container, props.style, !isValid && styles.invalid]}
      onChangeText={setShader}
      placeholder="Paste (or type, if feeling masochistic) a Skia shader">
      {shader}
    </TextInput>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#22222288',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#EEE',
    fontSize: 12,
  },
  invalid: {
    color: '#F55',
  },
});

export default ShaderInput;
