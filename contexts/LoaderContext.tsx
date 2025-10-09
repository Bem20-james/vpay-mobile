import React, { createContext, useContext, useState, ReactNode } from "react";
import { View, StyleSheet, Modal, Text, Dimensions } from "react-native";
import LoaderKit, { IndicatorName } from "react-native-loader-kit";

interface LoaderOptions {
  message?: string;
  size?: number;
  color?: string;
  overlayColor?: string;
  animationType?: "fade" | "slide" | "none";
  backdropDismissible?: boolean;
  name?: IndicatorName;
}

interface LoaderContextProps {
  showLoader: (options?: LoaderOptions) => void;
  hideLoader: () => void;
  isLoading: boolean;
  updateMessage: (message: string) => void;
}

const LoaderContext = createContext<LoaderContextProps>({
  showLoader: () => {},
  hideLoader: () => {},
  isLoading: false,
  updateMessage: () => {},
});

export const useLoader = () => useContext(LoaderContext);
const { width, height } = Dimensions.get("window");

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [loaderOptions, setLoaderOptions] = useState<LoaderOptions>({
    message: "",
    size: 50,
    color: "#208BC9",
    overlayColor: "rgba(0, 0, 0, 0.5)",
    animationType: "fade",
    backdropDismissible: false,
    name: "Orbit",
  });

  const showLoader = (options?: LoaderOptions) => {
    setLoaderOptions((prev) => ({
      ...prev,
      ...options,
    }));
    setLoading(true);
  };

  const hideLoader = () => {
    setLoading(false);
    setTimeout(() => {
      setLoaderOptions((prev) => ({ ...prev, message: "" }));
    }, 300);
  };

  const updateMessage = (message: string) => {
    setLoaderOptions((prev) => ({ ...prev, message }));
  };

  const handleBackdropPress = () => {
    if (loaderOptions.backdropDismissible) {
      hideLoader();
    }
  };

  return (
    <LoaderContext.Provider
      value={{ showLoader, hideLoader, isLoading: loading, updateMessage }}
    >
      {children}
      <Modal
        visible={loading}
        transparent
        animationType={loaderOptions.animationType}
        statusBarTranslucent
        onRequestClose={handleBackdropPress}
      >
        <View
          style={[
            styles.overlay,
            { backgroundColor: loaderOptions.overlayColor },
          ]}
          onTouchEnd={handleBackdropPress}
        >
          <View style={styles.loaderContainer}>
            <LoaderKit 
              style={{
                width: loaderOptions.size,
                height: loaderOptions.size,
              }}
              name={loaderOptions.name ?? 'Orbit'}
              color={loaderOptions.color}
            />
            {loaderOptions.message && (
              <Text style={[styles.message, { color: loaderOptions.color }]}>
                {loaderOptions.message}
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </LoaderContext.Provider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
  },
  loaderContainer: {
    backgroundColor: "#0A2D4A",
    borderRadius: 15,
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 100,
    minHeight: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 10,
    opacity: 0.3
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    maxWidth: 200,
    lineHeight: 22,
  },
});
