import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/Screens/auth/SplashScreen';
import LoginScreen from './src/Screens/auth/LoginScreen';
import FindIdScreen from './src/Screens/auth/FindIdScreen';
import FindPasswordScreen from './src/Screens/auth/FindPasswordScreen';
import SignUpScreen from './src/Screens/auth/SignUpScreen';
import RouteScreen from './src/navigation/RouteScreen';
import HomeScreen from './src/Screens/tabs/HomeScreen';
import JobListScreen from './src/Screens/tabs/JobListScreen';
import JobDetailScreen from './src/Screens/Pages/JobDetailScreen';
import PersonalInfoForm from './src/Screens/Pages/PersonalInfoForm';
import NotificationScreen from './src/Screens/Pages/NotificationScreen';
import MenuScreen from './src/Screens/Pages/MenuScreen';
import AddJobScreen from './src/Screens/Pages/AddJobScreen';
import JobRequirementsForm from './src/Screens/Pages/JobRequirementsForm';


const Stack = createNativeStackNavigator();

const App = () => {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isShowSplash ? (
        <SplashScreen />
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FindIdScreen"
              component={FindIdScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FindPasswordScreen"
              component={FindPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RouteScreen"
              component={RouteScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JobListScreen"
              component={JobListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="JobDetailScreen"
              component={JobDetailScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="PersonalInfoForm"
              component={PersonalInfoForm}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="NotificationScreen"
              component={NotificationScreen}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name="MenuScreen"
              component={MenuScreen}
              options={{ headerShown: true }}
            />


            <Stack.Screen
              name="AddJobScreen"
              component={AddJobScreen}
              options={{
                headerShown: true,
              }}
            />

            <Stack.Screen
              name="JobRequirementsForm"
              component={JobRequirementsForm}
              options={{
                headerShown: true,
              }}
            />



          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};

export default App;
