import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import exampleShaders from '../examples/shaders';
import { useNavigate } from '../hooks/navigation';

function HomeScreen() {
  const navigate = useNavigate();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          {exampleShaders.map((exampleShader, index) => (
            <Button
              title={exampleShader.name}
              key={index}
              onPress={() => {
                navigate('Shader', {
                  initialShader: exampleShader.shader,
                });
              }}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
