import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';
import ShaderScreen from '../../screens/ShaderScreen';
import theme from './theme';


export type RootStackParamList = {
  Home: undefined;
  Shader: {
    initialShader?: string
  } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="Shader"
        component={ShaderScreen}
      />
    </Stack.Navigator>
  );
}
export default () => <NavigationContainer theme={theme}>
    <RootStack />
</NavigationContainer>;

