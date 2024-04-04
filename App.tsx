import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";

import { FontsProvider } from "./src/fonts";
import { NetworkProvider, RequestErrorInterceptor } from "./src/providers";
import { store } from "./src/redux";
import { RoutesDirectory } from "./src/routes";
import "core-js/stable/atob"

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <FontsProvider>
          <NetworkProvider>
            <RequestErrorInterceptor>
              <RoutesDirectory />
            </RequestErrorInterceptor>
          </NetworkProvider>
        </FontsProvider>
      </NavigationContainer>
    </Provider>
  );
}
