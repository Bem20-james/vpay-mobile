import CustomButton from "@/components/CustomButton";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { swapStyles } from "@/styles/swap";
import { useTheme } from "@/contexts/ThemeContexts";

const SwapScreen: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const cardBg = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const cardTxt = isDark ? Colors.dark.text : Colors.light.text;

  return (
    <SafeAreaView
      style={[swapStyles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <ScrollView>
        <View style={swapStyles.container}>
          <ThemedText
            lightColor="#000000"
            darkColor="#FFFFFF"
            style={swapStyles.sectionTitle}
          >
            Swap
          </ThemedText>
          <ThemedText style={swapStyles.subtitle}>
            Convert cash from one currency to another.
          </ThemedText>

          <View style={{ position: "relative", marginBottom: 24 }}>
            {/* FROM */}
            <View style={[swapStyles.card, { backgroundColor: cardBg }]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <ThemedText darkColor="#EEF3FB" style={swapStyles.label}>
                  From
                </ThemedText>

                <TouchableOpacity>
                  <ThemedText style={swapStyles.useMax}>Use Max</ThemedText>
                </TouchableOpacity>
              </View>
              <View style={swapStyles.cardFlx}>
                <View>
                  <TextInput
                    style={[swapStyles.input, { color: cardTxt }]}
                    keyboardType="numeric"
                    placeholder="0.00"
                    placeholderTextColor={cardTxt}
                  />
                  <ThemedText style={swapStyles.usdEqv}>$0.00</ThemedText>
                </View>

                <View style={swapStyles.tokenSelector}>
                  <Image
                    source={{
                      uri: "https://cryptologos.cc/logos/bnb-bnb-logo.png"
                    }}
                    style={swapStyles.tokenImage}
                  />
                  <View style={{ marginLeft: 8 }}>
                    <ThemedText style={swapStyles.tokenSymbol}>BNB</ThemedText>
                    <ThemedText style={swapStyles.tokenName}>
                      BNB Chain
                    </ThemedText>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={30}
                    color="#888"
                    style={{ marginLeft: "auto" }}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={swapStyles.switchContainer}
            >
              <MaterialCommunityIcons
                name="swap-vertical"
                size={28}
                color="#208BC9"
              />
            </TouchableOpacity>

            <View
              style={[
                swapStyles.card,
                { backgroundColor: cardBg, marginTop: 20 }
              ]}
            >
              <ThemedText darkColor="#EEF3FB" style={swapStyles.label}>
                To
              </ThemedText>
              <View style={swapStyles.cardFlx}>
                <View>
                  <TextInput
                    style={[swapStyles.input, { color: cardTxt }]}
                    keyboardType="numeric"
                    defaultValue="0.00"
                    editable={false}
                  />
                  <ThemedText style={swapStyles.usdEqv}>$0.00</ThemedText>
                </View>

                <View style={swapStyles.tokenSelector}>
                  <Image
                    source={{
                      uri: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
                    }}
                    style={swapStyles.tokenImage}
                  />
                  <View style={{ marginLeft: 8 }}>
                    <ThemedText style={swapStyles.tokenSymbol}>ETH</ThemedText>
                    <ThemedText style={swapStyles.tokenName}>
                      Ethereum
                    </ThemedText>
                  </View>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={30}
                    color="#888"
                    style={{ marginLeft: "auto" }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{ position: "relative" }}>
            <View
              style={{
                position: "absolute",
                bottom: -300,
                left: 0,
                right: 0
              }}
            >
              <CustomButton
                title={"Continue"}
                handlePress={() => {}}
                btnStyles={{
                  width: "100%",
                  marginTop: 20
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar
        style={isDark ? "light" : "dark"}
        backgroundColor={backgroundColor}
      />
    </SafeAreaView>
  );
};

export default SwapScreen;
