import { useCallback } from "react";
import { View } from "react-native";
import Navigation from "./src/Navigation";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Horizon: require("./assets/fonts/horizon.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}
