import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  PanResponder
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Navigator from "@/components/Navigator";
import { useRouter } from "expo-router";
import { cards, CARD_WIDTH, CARD_SPACING } from "@/assets/data";
import { cardStyles as styles } from "@/styles/cards";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { FontAwesome6 } from "@expo/vector-icons";
import { useCreateCard } from "@/hooks/useCards";
import { useLoader } from "@/contexts/LoaderContext";

const ChipperCardScreen = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCard = cards[currentIndex];
  const router = useRouter();
  const createCard = useCreateCard();
  const { showLoader, hideLoader } = useLoader();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx > 50 && currentIndex > 0) {
          // Swipe right
          handleCardChange(currentIndex - 1);
        } else if (gestureState.dx < -50 && currentIndex < cards.length - 1) {
          // Swipe left
          handleCardChange(currentIndex + 1);
        }
      }
    })
  ).current;

  const handleCardChange = (index: number) => {
    setCurrentIndex(index);
    scrollViewRef.current?.scrollTo({
      x: index * (CARD_WIDTH + CARD_SPACING),
      animated: true
    });
  };

  const handleCardCreation = async () => {
    setIsSubmitting(true);
    showLoader();

    try {
      const success = await createCard({
        currency: currentCard.id
      });
      if (success) {
        setIsSubmitting(false);
        router.push("/(cards)/index");
      }
    } catch (error) {
      setIsSubmitting(false);
      hideLoader();
      console.error("Card creation error:", error);
    } finally {
      setIsSubmitting(false);
      hideLoader();
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <StatusBar style="dark" />
      <Navigator title={currentCard.name} onBack={() => router.back()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card Carousel */}
        <View style={styles.carouselContainer} {...panResponder.panHandlers}>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
                listener: (event: any) => {
                  const offsetX = event.nativeEvent.contentOffset.x;
                  const index = Math.round(
                    offsetX / (CARD_WIDTH + CARD_SPACING)
                  );
                  if (index !== currentIndex) {
                    setCurrentIndex(index);
                  }
                }
              }
            )}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={CARD_WIDTH + CARD_SPACING}
            contentContainerStyle={styles.carouselContent}
          >
            {cards.map((card, index) => (
              <View key={card.id} style={styles.cardWrapper}>
                <View
                  style={[styles.card, { backgroundColor: card.cardColor }]}
                >
                  <View style={styles.cardHeader}>
                    <ThemedText style={styles.logo}>◉ Versee Pay</ThemedText>
                  </View>
                  <View style={styles.cardFooter}>
                    <ThemedText style={styles.cardName}>
                      AONDOAKURA BEM JAMES
                    </ThemedText>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {cards.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    index === currentIndex
                      ? currentCard.accentColor
                      : "#E5E7EB",
                  width: index === currentIndex ? 32 : 8
                }
              ]}
            />
          ))}
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          <ThemedText
            style={[styles.subtitle, { color: currentCard.accentColor }]}
          >
            {currentCard.subtitle}
          </ThemedText>

          {/* Features */}
          {currentCard.features.map((feature, index) => (
            <View key={index} style={styles.featureContainer}>
              <View style={styles.featureHeader}>
                <ThemedText style={styles.featureIcon}>
                  {feature.icon}
                </ThemedText>
                <ThemedText style={styles.featureTitle}>
                  {feature.title}
                </ThemedText>
              </View>
              <ThemedText style={styles.featureDescription}>
                {feature.description}
              </ThemedText>
            </View>
          ))}

          {/* Fees Section */}
          <View style={styles.feesContainer}>
            <View style={styles.featureHeader}>
              <FontAwesome6
                name="sack-dollar"
                size={18}
                color={currentCard.accentColor}
                style={styles.featureIcon}
              />

              <ThemedText style={styles.featureTitle}>
                {currentCard.name} fees
              </ThemedText>
            </View>
            {currentCard.fees.map((fee, index) => (
              <View key={index} style={styles.feeItem}>
                <ThemedText style={styles.bullet}>•</ThemedText>
                <ThemedText style={styles.feeText}>{fee}</ThemedText>
              </View>
            ))}
          </View>

          {/* Terms Link */}
          <TouchableOpacity style={styles.termsButton}>
            <ThemedText
              style={[styles.termsText, { color: currentCard.accentColor }]}
            >
              Terms and Conditions
            </ThemedText>
          </TouchableOpacity>

          <CustomButton
            title={`Create ${currentCard.name}`}
            handlePress={handleCardCreation}
            disabled={isSubmitting}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChipperCardScreen;
