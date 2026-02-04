import { RTCView, useCamera } from "@fishjam-cloud/react-native-client";
import React, { useEffect } from "react";
import { Text, View } from "react-native";

export function CameraPreview() {
  const { startCamera, cameraStream } = useCamera();
  const cameraStreamRef = React.useRef(cameraStream);

  useEffect(() => {
    cameraStreamRef.current = cameraStream;
  }, [cameraStream]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cameraStreamRef.current) {
        console.log(
          "Camera stream is available",
          JSON.stringify(cameraStreamRef.current, null, 2),
        );
        clearInterval(interval);
      } else {
        console.log("No camera stream available yet");
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  return (
    <View>
      {cameraStream ? (
        <RTCView
          mediaStream={cameraStream}
          style={{ height: 300, width: 300 }}
          objectFit="cover"
          mirror={true}
        />
      ) : (
        <Text>No camera stream</Text>
      )}
    </View>
  );
}
