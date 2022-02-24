/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TaskDetailScreen from './components/layout/TaskDetailScreen';
import HomeScreen from './components/layout/HomeScreen';
import {NativeBaseProvider} from 'native-base';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const App = () => {
  const isDarkMode = useColorScheme() === 'light';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: '100%',
  };

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NativeBaseProvider config={config}>
        <NavigationContainer>
          <SafeAreaView style={backgroundStyle}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <View style={styles.container}>
              <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                  headerStyle: {backgroundColor: 'black'},
                  headerTintColor: 'white',
                }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={TaskDetailScreen} />
              </Stack.Navigator>
            </View>
          </SafeAreaView>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
