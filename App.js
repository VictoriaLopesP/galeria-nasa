import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GalleryScreen from "./screens/GalleryScreen";  // Tela principal de galeria
import ImageDetailScreen from "./screens/ImageDetailScreen"; // Nova tela de detalhes

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Gallery">
        <Stack.Screen name="Gallery" component={GalleryScreen} />
        <Stack.Screen name="ImageDetail" component={ImageDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
