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
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import ShaderInput from '../components/ShaderInput';
import { RootStackParamList } from '../util/navigation/Navigation';

type CanvasTap = [number, number, number, number];
const NOT_TAPPED: CanvasTap = [0, 0, -1, -1];

function ShaderScreen(
  props: NativeStackScreenProps<RootStackParamList, 'Shader'>,
) {
  const [shaderSource, setShaderSource] = useState<SkRuntimeEffect>();
  const { height: keyboardHeight } = useAnimatedKeyboard();
  const [size, setSize] = useState([0, 0]);
  const time = useClock();
  const [taps, setTaps] = useState<CanvasTap[]>(Array(100).fill(NOT_TAPPED));
  const orientation = useDeviceOrientation();
  const uniforms = useDerivedValue(() => {
    return {
      size,
      time: time.value,
      taps,
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

  const gesture = Gesture.Manual().onTouchesDown(e => {
    console.log('e', e);
  });

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <GestureDetector gesture={gesture}>
        <Canvas
          onLayout={onCanvasLayout}
          style={[
            styles.canvas,
            orientation === 'landscape' ? styles.landscapeCanvas : undefined,
          ]}>
          <Fill>
            {shaderSource && (
              <Shader source={shaderSource} uniforms={uniforms} />
            )}
          </Fill>
        </Canvas>
      </GestureDetector>
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
