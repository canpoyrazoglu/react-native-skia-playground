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
import {
  Gesture,
  GestureDetector,
  GestureTouchEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import ShaderInput from '../components/ShaderInput';
import { RootStackParamList } from '../util/navigation/Navigation';

function copy<T>(obj: T) {
  return JSON.parse(JSON.stringify(obj)) as T;
}

type CanvasTap = [number, number, number, number];
const TOUCH_X = 0;
const TOUCH_Y = 1;
const TOUCH_START_TIME = 2;
const TOUCH_END_TIME = 3;
const NOT_TAPPED: CanvasTap = [0, 0, -1, -1];
const MAX_TOUCHES = 20;

function ShaderScreen(
  props: NativeStackScreenProps<RootStackParamList, 'Shader'>,
) {
  const [shaderSource, setShaderSource] = useState<SkRuntimeEffect>();
  const { height: keyboardHeight } = useAnimatedKeyboard();
  const [size, setSize] = useState([0, 0]);
  const time = useClock();
  const touchIdToTouchMap = useRef<Record<string, CanvasTap>>({});
  const [currentTouches, setCurrentTouches] = useState<CanvasTap[]>([]);
  const orientation = useDeviceOrientation();
  
  const uniforms = useDerivedValue(() => {
    return {
      size,
      time: time.value,
      touches: [
        ...currentTouches,
        ...Array(MAX_TOUCHES - currentTouches.length).fill(NOT_TAPPED),
      ],
      touchCount: currentTouches.length,
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

  const onTouchesDown = (e: GestureTouchEvent) => {
    const now = time.value;
    const touches = e.changedTouches.map(rawTouch => {
      const touch = [
        rawTouch.x,
        rawTouch.y,
        now,
        Number.MAX_VALUE,
      ] as CanvasTap;
      touchIdToTouchMap.current[rawTouch.id.toString()] = touch;
      return touch;
    });
    setCurrentTouches(copy(touches));
  };

  const onTouchesMove = (e: GestureTouchEvent) => {
    e.changedTouches.forEach(rawTouch => {
      touchIdToTouchMap.current[rawTouch.id.toString()][TOUCH_X] = rawTouch.x;
      touchIdToTouchMap.current[rawTouch.id.toString()][TOUCH_Y] = rawTouch.y;
    });
    setCurrentTouches(copy(Object.values(touchIdToTouchMap.current)));
  };

  const onTouchesUp = (e: GestureTouchEvent) => {
    const now = time.value;
    e.changedTouches.forEach(rawTouch => {
      touchIdToTouchMap.current[rawTouch.id][TOUCH_END_TIME] = now;
    });
    setCurrentTouches(copy(Object.values(touchIdToTouchMap.current)));
    console.log('current', copy(Object.values(touchIdToTouchMap.current)));
  };

  const toucheshDownHandler = (e: GestureTouchEvent) => {
    runOnJS(onTouchesDown)(e);
  };

  const touchesUpHandler = (e: GestureTouchEvent) => {
    runOnJS(onTouchesUp)(e);
  };

  const touchesMoveHandler = (e: GestureTouchEvent) => {
    runOnJS(onTouchesMove)(e);
  };

  const gesture = Gesture.Manual()
    .onTouchesDown(toucheshDownHandler)
    .onTouchesMove(touchesMoveHandler)
    .onTouchesUp(touchesUpHandler);

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
