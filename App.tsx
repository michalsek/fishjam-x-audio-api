import {
  FishjamProvider,
  useInitializeDevices,
} from "@fishjam-cloud/react-native-client";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { CameraPreview } from "./eserce/CameraPreview";

const JamJamID = `8a589a8dca1b40f7a3daf4c3fda68fba`;

const JamFishJamComponent = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { initializeDevices } = useInitializeDevices();

  console.log("Rendering JamFishJamComponent, isInitialized:", isInitialized);

  return isInitialized ? (
    <>
      <Text>Fishjam is initialized!</Text>
      <CameraPreview />
    </>
  ) : (
    <>
      <Text>Fishjam is not initialized.</Text>
      <Button
        title="Initialize Fishjam"
        onPress={async () => {
          const result = await initializeDevices({
            enableAudio: true,
            enableVideo: false,
          });

          console.log("InitializeDevices result:", result);
          setIsInitialized(true);
        }}
      />
    </>
  );
};

export default function App() {
  return (
    <FishjamProvider fishjamId={JamJamID}>
      <View style={styles.container}>
        <JamFishJamComponent />
        <StatusBar style="auto" />
      </View>
    </FishjamProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
