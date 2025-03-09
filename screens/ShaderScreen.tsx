import { Canvas, Fill, Shader, SkRuntimeEffect } from '@shopify/react-native-skia';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ShaderInput from '../components/ShaderInput';

type ShaderScreenProps = {
  initialShader?: string;
};

function ShaderScreen(props: ShaderScreenProps) {
  const [shaderSource, setShaderSource] = useState<SkRuntimeEffect>();

  const memoizedInput = useMemo(() => <ShaderInput style={styles.input} initialShader={props.initialShader} onShaderUpdated={setShaderSource} />, [props.initialShader])
 
  return <View style={styles.container}>
    <Canvas style={styles.canvas}>
      <Fill>
         { shaderSource && <Shader source={shaderSource} />}
      </Fill>
    </Canvas>
    {memoizedInput}
  </View>;
}


const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
  },
  canvas: {
    backgroundColor:'#000',
    flex: 1,
  },
  input: {
    padding: 20,
    paddingBottom: 40,
    maxHeight: 200,
  }
});

export default ShaderScreen;
