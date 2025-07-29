import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  FlatList
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/Images";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import CustomButton from "@/components/CustomButton";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

const Onboarding = () => {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      key: "1",
      title: "Start exploring now\nand enjoy all the benefits",
      description:
        "Your finance journey begins here. We're here to assist you in tracking and expediting your transactions.",
      image: images.onboard1
    },
    {
      key: "2",
      title: "Track transactions easily\nwith clear insights",
      description:
        "Monitor your spending and stay on top of your finances with ease and clarity.",
      image: images.onboard2
    }
  ];

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
      }
    } else {
      router.push("/(auth)/register");
    }
  };

  const bgColor = colorScheme === "dark" ? "#000000" : "#ffffff";
  const statusBarBg = colorScheme === "light" ? "#FFFFFF" : "#FFFFFF";

  return (
    <SafeAreaView style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Text></Text>
        <Image style={styles.logo} source={images.logodark} />

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <ThemedText
            style={styles.skipTxt}
          >
            Skip
          </ThemedText>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        scrollEnabled={true}
        snapToInterval={width}
        decelerationRate="fast"
        bounces={false}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <View style={{ width }}>
            <View style={styles.container}>
              <ImageBackground
                style={styles.bgImg}
                source={item.image}
                resizeMode="contain"
              />
            </View>
            <ThemedView style={[styles.box, { backgroundColor: bgColor }]}>
              <ThemedText
                darkColor="#F1F1F1"
                lightColor="#000000"
                style={{
                  textAlign: "center",
                  fontSize: 24,
                  fontFamily: "Inter-ExtraBold",
                  lineHeight: 32
                }}
              >
                {item.title}
              </ThemedText>

              <ThemedText
                darkColor="#CDCDE0"
                lightColor="#2A2A2A"
                style={{
                  textAlign: "center",
                  marginTop: 20,
                  marginBottom: 30,
                  fontSize: 14,
                  fontFamily: "Inter-Regular",
                  lineHeight: 20
                }}
              >
                {item.description}
              </ThemedText>
              <View style={styles.dotsContainer}>
                {slides.map((_, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      currentIndex === index && styles.activeDot
                    ]}
                  />
                ))}
              </View>

              <CustomButton
                title={
                  currentIndex === slides.length - 1 ? "Get Started" : "Next"
                }
                handlePress={handleNext}
                btnStyles={{ width: "100%", marginTop: 7 }}
              />
            </ThemedView>
          </View>
        )}
      />
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5
  },
  logo: {
    width: 88,
    height: 41,
    resizeMode: "contain"
  },
  bgImg: {
    width: 320,
    height: 750
  },
  skipTxt: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0,
    textAlign: "center",
    color: "#000000"
  },
  box: {
    width: "100%",
    height: width * 0.95,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    position: "absolute",
    bottom: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -9
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 20
  },

  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5
  },
  activeDot: {
    backgroundColor: "#208BC9"
  }
});
