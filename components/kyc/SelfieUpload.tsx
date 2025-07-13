import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "../ThemedText";
import CustomButton from "../CustomButton";
import { KycStyles as styles } from "@/styles/kyc";
import { CameraView, useCameraPermissions } from "expo-camera";


interface SelfieUploadProps {
  onBack: () => void;
  onSubmit: (selfieUri: string) => void;
  isLoading?: boolean;
}

const SelfieUpload: React.FC<SelfieUploadProps> = ({
  onBack,
  onSubmit,
  isLoading = false
}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraActive, setCameraActive] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const startCamera = useCallback(() => {
    setCameraActive(true);
    setPhoto(null);
  }, []);

  const takePicture = useCallback(async () => {
    if (!cameraRef.current) return;

    try {
      const photoData = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        base64: false,
        skipProcessing: true
      });

      if (photoData?.uri) {
        setPhoto(photoData.uri);
        setCameraActive(false);
      }
    } catch (error) {
      console.error("Failed to take picture:", error);
    }
  }, []);

  const retakeSelfie = useCallback(() => {
    setPhoto(null);
    setCameraActive(true);
  }, []);

  const handleSubmit = useCallback(() => {
    if (photo) {
      onSubmit(photo);
    }
  }, [photo, onSubmit]);

  const renderCameraContent = () => {
    if (photo) {
      return <Image source={{ uri: photo }} style={styles.camera} />;
    }
    if (cameraActive) {
      return (
        <CameraView
          ref={cameraRef}
          style={styles.camera}
          facing="front"
          enableTorch={false}
          animateShutter={false}
        />
      );
    }
    return <View style={[styles.camera, styles.placeholder]} />;
  };

  if (!permission) {
    return <View style={styles.loadingContainer} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <ThemedText style={styles.message}>
          Camera permission is required
        </ThemedText>
        <CustomButton
          title="Grant Permission"
          handlePress={requestPermission}
          btnStyles={styles.permissionButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
        <TouchableOpacity onPress={onBack}>
          <MaterialIcons name="arrow-back" size={20} color={"#ffffff"} />
        </TouchableOpacity>
        <ThemedText type="defaultSemiBold">Identity Verification</ThemedText>
      </View>
      <ThemedText style={styles.title}>
        Take a Selfie
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Please take a selfie with a neutral expression
      </ThemedText>

      <View style={styles.cameraContainer}>{renderCameraContent()}</View>

      {!photo && !cameraActive && (
        <TouchableOpacity style={styles.option} onPress={startCamera}>
          <MaterialIcons name="camera" size={25} color="#7b7b9b" />
          <ThemedText type="default">Take Selfie</ThemedText>
        </TouchableOpacity>
      )}

      {cameraActive && !photo && (
        <TouchableOpacity style={styles.option} onPress={takePicture}>
          <MaterialIcons name="camera" size={25} color="#7b7b9b" />
          <ThemedText type="default">Capture</ThemedText>
        </TouchableOpacity>
      )}

      {photo && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.option} onPress={retakeSelfie}>
            <MaterialIcons name="refresh" size={25} color="#7b7b9b" />
            <ThemedText type="default">Retake Selfie</ThemedText>
          </TouchableOpacity>
          <CustomButton
            title="Submit"
            handlePress={handleSubmit}
            btnStyles={styles.submitButton}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </View>
      )}
    </View>
  );
};

export default SelfieUpload;
