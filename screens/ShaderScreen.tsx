import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Canvas, Fill, Shader, SkRuntimeEffect, useClock } from '@shopify/react-native-skia';
import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { useDerivedValue } from 'react-native-reanimated';
import ShaderInput from '../components/ShaderInput';
import { RootStackParamList } from '../util/navigation/Navigation';


function ShaderScreen(props: NativeStackScreenProps<RootStackParamList, 'Shader'>) {
  const [shaderSource, setShaderSource] = useState<SkRuntimeEffect>();
  const [size, setSize] = useState([0,0]);
  const time = useClock();
  const [tapTime, setTapTime] = useState(-1);
  const [tap, setTap] = useState([0,0]);
  const uniforms = useDerivedValue(() => {
    return {
      size,
      time: time.value,
      tapTime,
      tap,
    };
  });
  const memoizedInput = useMemo(() => <ShaderInput style={styles.input} initialShader={props.route.params?.initialShader?.trim()} onShaderUpdated={setShaderSource} />, [props.initialShader]);

  const onCanvasLayout = (e:LayoutChangeEvent) => {
    setSize([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  return <View style={styles.container}>
    <Canvas onLayout={onCanvasLayout} style={styles.canvas}>
      <Fill>
         { shaderSource && <Shader source={shaderSource} uniforms={uniforms} />}
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
  },
});

export default ShaderScreen;
