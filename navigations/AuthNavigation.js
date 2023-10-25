import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import FirstScreen from "../screens/FirstScreen";
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import routes from "../constants/routes";
import Home from '../screens/Home';

const Stack = createStackNavigator();


function AuthNavigation() {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={routes.FRISTSCREEN}>
      <Stack.Screen
        name={routes.FRISTSCREEN}
        component={FirstScreen}
        options={{ title: "MyHome", headerShown: false }}
      />
        <Stack.Screen
        name={routes.LOGIN}
        component={LogIn}
        options={{ title: "LogIn", headerShown: false }}
      />
        <Stack.Screen
        name={routes.SIGNUP}
        component={SignUp}
        options={{ title: "SignUp", headerShown: false }}
      />
        <Stack.Screen
        name={routes.HOME}
        component={Home}
        options={{ title: "Home", headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default AuthNavigation;
