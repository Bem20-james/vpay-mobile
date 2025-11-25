import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import React, { useState } from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { KycStyles as styles } from "@/styles/kyc";
import { TransferStyles } from "@/styles/transfers";
import CountryFlag from "react-native-country-flag";
import { Feather } from "@expo/vector-icons";
import SendInternational from "@/components/Transfers/sendInternational";
import { Colors } from "@/constants/Colors";
import { useFetchCountries } from "@/hooks/useGeneral";
import { MotiView } from "moti";
import { useTheme } from "@/contexts/ThemeContexts";

const SkeletonLoader = () => (
  <View style={{ marginTop: 20 }}>
    {Array.from({ length: 6 }).map((_, index) => (
      <MotiView
        key={index}
        from={{ opacity: 0.3 }}
        animate={{ opacity: 1 }}
        transition={{ loop: true, type: "timing", duration: 1000 }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#1E1E1E",
          borderRadius: 12,
          padding: 15,
          marginBottom: 10
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            backgroundColor: "#2E2E2E",
            marginRight: 12
          }}
        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: "70%",
              height: 10,
              backgroundColor: "#2E2E2E",
              borderRadius: 6,
              marginBottom: 6
            }}
          />
          <View
            style={{
              width: "40%",
              height: 10,
              backgroundColor: "#2E2E2E",
              borderRadius: 6
            }}
          />
        </View>
      </MotiView>
    ))}
  </View>
);

const International = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const statusBarBg = backgroundColor;

  const [screenVisible, setScreenVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const { countries, loading } = useFetchCountries();

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setScreenVisible(true);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {!screenVisible ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Navigator title="Send International" />
          <View style={styles.container}>
            <View style={TransferStyles.searchContainer}>
              <Feather
                name="search"
                size={20}
                color="#9B9B9B"
                style={TransferStyles.searchIcon}
              />
              <TextInput
                style={TransferStyles.searchInput}
                placeholder="Type a country"
                placeholderTextColor="#9B9B9B"
                value={query}
                onChangeText={setQuery}
              />
            </View>

            <View>
              {loading ? (
                <SkeletonLoader />
              ) : (
                <FlatList
                  data={countries}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  nestedScrollEnabled
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={TransferStyles.itemContainer}
                      onPress={() => handleCountrySelect(item)}
                      activeOpacity={0.7}
                    >
                      <View style={TransferStyles.itemContent}>
                        <View style={TransferStyles.iconCircle}>
                          <CountryFlag
                            isoCode={item.country_code}
                            size={15}
                            style={TransferStyles.flagItem}
                          />
                        </View>
                        <View style={TransferStyles.txtBorder}>
                          <ThemedText
                            lightColor="#252525"
                            darkColor="#FFFFFF"
                            style={TransferStyles.primaryText}
                          >
                            {item.country_name.toUpperCase()}
                          </ThemedText>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </View>
        </ScrollView>
      ) : (
        <SendInternational
          onBack={() => setScreenVisible(false)}
          selectedCountry={selectedCountry}
        />
      )}

      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default International;
