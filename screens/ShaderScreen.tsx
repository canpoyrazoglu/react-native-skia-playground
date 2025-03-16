import { useDeviceOrientation } from '@react-native-community/hooks';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Canvas,
  Fill,
  Shader,
  SkRuntimeEffect,
  useClock,
} from '@shopify/react-native-skia';
import React, { useMemo, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import ShaderInput from '../components/ShaderInput';
import { RootStackParamList } from '../util/navigation/Navigation';

type CanvasTap = [number, number, number, number];
const NOT_TAPPED: CanvasTap = [0, 0, -1, -1];
const MAX_TOUCHES = 20;

function ShaderScreen(
  props: NativeStackScreenProps<RootStackParamList, 'Shader'>,
) {
  const [shaderSource, setShaderSource] = useState<SkRuntimeEffect>();
  const { height: keyboardHeight } = useAnimatedKeyboard();
  const [size, setSize] = useState([0, 0]);
  const time = useClock();
  const touchIdToStartTime = useRef<Record<number, number>>({});
  const [taps, setTaps] = useState<CanvasTap[]>(
    Array(MAX_TOUCHES).fill(NOT_TAPPED),
  );
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
    const touches = e.allTouches.map(touch => {
      return [touch.x, touch.y, Date.now(), Number.MAX_VALUE] as CanvasTap;
    });
    runOnJS(setTaps)([
      ...touches,
      ...Array(MAX_TOUCHES - touches.length).fill(NOT_TAPPED),
    ]);
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
