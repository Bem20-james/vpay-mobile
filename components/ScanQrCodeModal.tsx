import React, { useState, useEffect } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface Props {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

const ScanQrCodeModal = ({ visible, onClose, onScan }: Props) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!permission) requestPermission();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (!scanned) {
      setScanned(true);
      onScan(data);
      onClose();
    }
  };

  if (!permission?.granted) {
    return (
      <Modal visible={visible} animationType="slide">
        <ThemedView style={styles.permissionView}>
          <ThemedText>No camera permission</ThemedText>
          <TouchableOpacity style={styles.button} onPress={requestPermission}>
            <ThemedText style={{ color: "#fff" }}>Grant Permission</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>
    );
  }

  return (
    <Modal visible={visible} animationType="slide">
      <ThemedView style={styles.container}>
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <Ionicons name="close" size={26} color="#fff" />
        </TouchableOpacity>

        <View style={styles.cameraContainer}>
          <ThemedText style={styles.title}>Scan QR Code</ThemedText>

          <View style={styles.cameraFrame}>
            <CameraView
              style={styles.camera}
              onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr"]
              }}
            />
            {/* Corner borders */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>

          <ThemedText style={styles.scanText}>
            Align QR code within frame
          </ThemedText>
        </View>
      </ThemedView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)"
  },
  closeBtn: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#fff",
    marginBottom: 40
  },
  cameraFrame: {
    width: 300,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative"
  },
  camera: {
    flex: 1
  },
  corner: {
    position: "absolute",
    width: 50,
    height: 50,
    borderColor: Colors.dark.primary || "#007AFF",
    borderWidth: 4,
    objectFit: "cover"
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 20
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 20
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 20
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 20
  },
  scanText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 30,
    textAlign: "center",
    fontFamily: "Questrial"
  },
  permissionView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background
  },
  button: {
    backgroundColor: Colors.dark.primary,
    padding: 10,
    borderRadius: 8,
    marginTop: 10
  }
});

export default ScanQrCodeModal;
