import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { FAB } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useCachedResources from './hooks/useCachedResources';
import TabOneScreen from './screens/TabOneScreen';
import TabTwoScreen from './screens/TabTwoScreen';
import LoginScreen from './screens/LoginScreen';
import * as SecureStore from 'expo-secure-store';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ tabBarScrollEnabled: false }} style={styles.container}>
          <Tab.Screen name="All" component={TabOneScreen} />
          <Tab.Screen name="Active" component={TabTwoScreen} />
          <Tab.Screen name="Logging" component={LoginScreen} />
        </Tab.Navigator>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={async () => {await SecureStore.getItemAsync('password').then((data) => console.log(data)) }}
        />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: StatusBar.currentHeight
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})