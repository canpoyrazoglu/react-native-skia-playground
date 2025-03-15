import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { GRADIENT } from '../examples/gradient.shader';
import { HELLO_WORLD } from '../examples/helloWorld.shader';
import { TIME_GRADIENT } from '../examples/timeGradient.shader';
import { useNavigate } from '../hooks/navigation';

function HomeScreen() {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Button
            title="Hello World"
            onPress={() => {
              navigate('Shader', {
                initialShader: HELLO_WORLD,
              });
            }}
          />
          <Button
            title="Gradient"
            onPress={() => {
              navigate('Shader', {
                initialShader: GRADIENT,
              });
            }}
          />
          <Button
            title="Time Gradient"
            onPress={() => {
              navigate('Shader', {
                initialShader: TIME_GRADIENT,
              });
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
