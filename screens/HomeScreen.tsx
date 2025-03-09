import React from 'react';
import { Button, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigate } from '../hooks/navigation';

function HomeScreen() {
  const navigate = useNavigate();
  return <View style={styles.container}>
        <ScrollView>
        <View>
            <Button title="Shaders" onPress={() => {
              navigate('Shader');
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
