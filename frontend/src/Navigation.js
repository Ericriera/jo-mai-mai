import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import Home from "./screens/Home";
import Select from "./screens/Select";
import Play from "./screens/Play";
import Add from "./screens/Add";

const Stack = createNativeStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "",
          headerShadowVisible: false,
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Select"
        component={Select}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTransparent: true,
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="Play"
        component={Play}
        options={{
          title: "",
          headerBackTitleVisible: false,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTransparent: true,
          headerTintColor: "#000",
        }}
      />
      <Stack.Screen
        name="Add"
        component={Add}
        options={{
          title: "Sugerencia",
          presentation: "modal",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTransparent: true,
          headerTintColor: "#000",
          headerTitleStyle:
            Platform.OS === "android" ? { fontFamily: "Horizon" } : null,
        }}
      />
    </Stack.Navigator>
  );
}
export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
