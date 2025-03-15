import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { TIME_GRADIENT } from '../examples/timeGradient';
import { useNavigate } from '../hooks/navigation';

function HomeScreen() {
  const navigate = useNavigate();
  return <View style={styles.container}>
        <ScrollView>
        <View>
            <Button title="Time Gradient" onPress={() => {
              navigate('Shader', {
                initialShader: TIME_GRADIENT,
              });
            }} />
        </View>
      </ScrollView>
  </View>;
}


const styles = StyleSheet.create({
  container:{
  },
});

export default HomeScreen;
