import { useDeviceOrientation } from '@react-native-community/hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Canvas,
  Fill,
  Shader,
  SkRuntimeEffect,
  useClock,
} from '@shopify/react-native-skia';
import React, { useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import ShaderInput from '../components/ShaderInput';
import { RootStackParamList } from '../util/navigation/Navigation';

function ShaderScreen(
  props: NativeStackScreenProps<RootStackParamList, 'Shader'>,
) {
  const [shaderSource, setShaderSource] = useState<SkRuntimeEffect>();
  const { height: keyboardHeight } = useAnimatedKeyboard();
  const [size, setSize] = useState([0, 0]);
  const time = useClock();
  const [tapTime, setTapTime] = useState(-1);
  const [tap, setTap] = useState([0, 0]);
  const orientation = useDeviceOrientation();
  const uniforms = useDerivedValue(() => {
    return {
      size,
      time: time.value,
      tapTime,
      tap,
    };
  });

  const memoizedInput = useMemo(
    () => (
      <ShaderInput
        style={styles.input}
        initialShader={props.route.params?.initialShader?.trim()}
        onShaderUpdated={setShaderSource}
      />
    ),
    [props.route.params?.initialShader],
  );

  const onCanvasLayout = (e: LayoutChangeEvent) => {
    setSize([e.nativeEvent.layout.width, e.nativeEvent.layout.height]);
  };
  const containerStyle = useAnimatedStyle(() => {
    return {
      paddingBottom: keyboardHeight.value,
    };
  });
  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Canvas
        onLayout={onCanvasLayout}
        style={[
          styles.canvas,
          orientation === 'landscape' ? styles.landscapeCanvas : undefined,
        ]}>
        <Fill>
          {shaderSource && <Shader source={shaderSource} uniforms={uniforms} />}
        </Fill>
      </Canvas>
      {memoizedInput}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  canvas: {
    backgroundColor: '#000',
    flex: 1,
  },
  input: {
    padding: 20,
    paddingBottom: 30,
    maxHeight: 200,
  },
  landscapeCanvas: {},
});

export default ShaderScreen;
