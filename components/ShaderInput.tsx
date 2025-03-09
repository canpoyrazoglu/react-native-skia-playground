import { Skia, SkRuntimeEffect } from '@shopify/react-native-skia';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, TextInput, TextInputProps } from 'react-native';

type ShaderInputProps = Omit<TextInputProps, 'placeholderTextColor' | 'multiline' | 'onChangeText' | 'placeholder'> & {
  initialShader?: string;
  onShaderUpdated: (shader: SkRuntimeEffect) => void;
}
function ShaderInput(props: ShaderInputProps) {
  const [shader, setShader] = useState(props.initialShader ?? '');
  useEffect(() => {
    try{
      console.log('Compiling shader...');
      console.log(shader);
      const compiledSource = Skia.RuntimeEffect.Make(shader);
      props.onShaderUpdated(compiledSource!);
      console.log('Successfully compiled shader.');
    }catch(e){
      console.warn('Unable to compile shader', e);
    }
  }, [props, shader]);
  return <TextInput {...props} placeholderTextColor={'#888'} multiline style={[styles.container, props.style]}
  onChangeText={setShader} placeholder="Paste (or type, if feeling masochistic) a Skia shader">{shader}</TextInput>;

}


const styles = StyleSheet.create({
  container:{
    backgroundColor: '#22222288',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: '#EEE'
  },
});

export default ShaderInput;
