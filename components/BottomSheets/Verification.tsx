import React, { useRef } from "react";
import {
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
  Image
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import images from "@/constants/Images";
import { btmSheetStyles } from "@/styles/bottomsheets";
import { useTheme } from "@/contexts/ThemeContexts";
import CustomButton from "../CustomButton";

interface VerificationBtmSheetProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  snapPoints?: string[];
}

const VerificationBtmSheet = ({
  isVisible,
  onClose,
  title = "Verify your account",
  snapPoints = ["50%"]
}: VerificationBtmSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!isVisible) return null;

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        onClose={onClose}
        backgroundStyle={{
          backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF"
        }}
        handleIndicatorStyle={btmSheetStyles.indicatorHandle}
      >
        <BottomSheetView>
          <ThemedText
            style={btmSheetStyles.title}
            lightColor="#252525"
            darkColor="#9B9B9B"
          >
            {title}
          </ThemedText>
          <View style={btmSheetStyles.container}>
            <View style={styles.imgCon}>
              <Image source={images.verification} style={styles.image} />
            </View>

            <View>
              <ThemedText style={styles.subtitle}>
                complete your account setup to be able to enjoy more features on
                the go
              </ThemedText>
            </View>

            <CustomButton
              title="Let's Go"
              handlePress={() => router.push("/verification")}
            />
            <CustomButton
              title="Not Now"
              handlePress={onClose}
              variant="secondary"
              btnStyles={{ marginTop: 7 }}
            />
          </View>
        </BottomSheetView>
      </BottomSheet>
    </Portal>
  );
};

const styles = StyleSheet.create({
  imgCon: {
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: 150,
    height: 150
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: "contain"
  },
  textCon: {
    justifyContent: "center",
    textAlign: "center"
  },
  subtitle: {
    fontFamily: "Questrial",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 10,
    color: "#9B9B9B"
  }
});

export default VerificationBtmSheet;
