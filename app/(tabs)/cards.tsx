import { ScrollView, StyleSheet, Image, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "@/components/Navigator";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import images from "@/constants/Images";
import CustomButton from "@/components/CustomButton";

const Cards = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const statusBarBg = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const router = useRouter();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView>
        <View style={styles.container}>
          <Navigator title="Cards" showBackIcon={false} />
          <View style={styles.cardsContainer}>
            <Image
              source={images.mastercard}
              style={[styles.cards, styles.mastercard]}
            />
            <Image
              source={images.visacard}
              style={[styles.cards, styles.visacard]}
            />
          </View>

          <ThemedText
            lightColor="#000000"
            darkColor="#FFFFFF"
            style={styles.title}
          >
            Introducing virtual cards
          </ThemedText>
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#EEF3FB"
            style={styles.desc}
          >
            Make payments more easier and faster with our virtual cards.
          </ThemedText>

          <CustomButton
            title="Create card"
            handlePress={() => router.push("/(cards)/create")}
            btnStyles={{ width: "100%" }}
            variant={colorScheme === "dark" ? "primary" : "secondary"}
            size="medium"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cards;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  cardsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  cards: {
    width: 170,
    height: 400,
    resizeMode: "contain"
  },
  mastercard: {
    zIndex: 900
  },
  visacard: {
    marginLeft: -50
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10
  },
  desc: {
    lineHeight: 20,
    textAlign: "center",
    fontFamily: "Questrial",
    fontSize: 14,
    marginBottom: 40,
    paddingHorizontal: 20
  }
});
