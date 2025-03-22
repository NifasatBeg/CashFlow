import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper"; // Import PaperProvider
import Login from "./src/app/pages/Login";
import SignUp from "./src/app/pages/SignUp";
import Home from "./src/app/pages/Home";
import Details from "./src/app/pages/Details";
import { checkAndRequestNotificationPermission } from "./src/app/utils/notificationPermission";

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    checkAndRequestNotificationPermission();
  }, []);

  return (
    <PaperProvider> {/* Wrap everything inside PaperProvider */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
