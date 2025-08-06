import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemedText } from "./ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onBack: () => void;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onBack
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = StyleSheet.create({
    container: {
      marginBottom: 20,
      paddingHorizontal: 5
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20
    },
    backButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 5
    },
    stepInfo: {
      alignItems: "center",
      flex: 1
    },
    stepTitle: {
      fontSize: 18,
      fontFamily: "Inter-SemiBold"
    },
    stepDescription: {
      fontSize: 14,
      marginTop: 2,
      opacity: 0.7,
      fontFamily: "Questrial"
    },
    progressContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10
    },
    stepDot: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: 4
    },
    activeDot: {
      backgroundColor: isDark ? Colors.dark.primary : Colors.light.tint
    },
    inactiveDot: {
      backgroundColor: isDark
        ? Colors.dark.lightGray
        : Colors.light.tabIconDefault
    },
    progressLine: {
      height: 2,
      flex: 1,
      marginHorizontal: 4
    },
    activeProgressLine: {
      backgroundColor: isDark ? "#80D1FF" : Colors.light.tabIconSelected
    },
    inactiveProgressLine: {
      backgroundColor: isDark ? Colors.light.lightGray : Colors.light.textGray
    }
  });

  const currentStepData = steps.find((step) => step.id === currentStep);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={Colors.light.primary}
          />
        </TouchableOpacity>

        <View style={styles.stepInfo}>
          <ThemedText style={styles.stepTitle}>
            {currentStepData?.title}
          </ThemedText>
          <ThemedText style={styles.stepDescription}>
            {currentStepData?.description}
          </ThemedText>
        </View>

        <View style={{ width: 24 }} />
      </View>

      <View style={styles.progressContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <View
              style={[
                styles.stepDot,
                step.id <= currentStep ? styles.activeDot : styles.inactiveDot
              ]}
            />
            {index < steps.length - 1 && (
              <View
                style={[
                  styles.progressLine,
                  step.id < currentStep
                    ? styles.activeProgressLine
                    : styles.inactiveProgressLine
                ]}
              />
            )}
          </React.Fragment>
        ))}
      </View>

      <ThemedText
        style={{
          textAlign: "center",
          marginTop: 7,
          fontSize: 12,
          opacity: 0.6,
          fontFamily: "Questrial"
        }}
      >
        Step {currentStep} of {steps.length}
      </ThemedText>
    </View>
  );
};

export default StepIndicator;
