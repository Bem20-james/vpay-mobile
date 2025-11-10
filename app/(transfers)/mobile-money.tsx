import { useState } from "react";
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";
import React from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { KycStyles } from "@/styles/kyc";
import { TransferStyles } from "@/styles/transfers";
import { Feather } from "@expo/vector-icons";
import CountryFlag from "react-native-country-flag";
import { Colors } from "@/constants/Colors";
import SendMobileMoney from "@/components/Transfers/SendMobileMoney";
import { useFetchMobileMoneyCountries } from "@/hooks/useGeneral";
import { MotiView } from "moti";

const SkeletonLoader = () => {
  // Simple shimmer skeleton with moti animation
  return (
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
};

const MobileMoney = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [query, setQuery] = useState("");
  const [screenVisible, setScreenVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);

  const { MmCountries, loading } = useFetchMobileMoneyCountries();

  // Filter countries based on search query
  const filteredCountries = MmCountries?.filter((country) =>
    country.country_name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={[KycStyles.safeArea, { backgroundColor }]}>
      {!screenVisible ? (
        <>
          <Navigator title="Mobile Money" />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={TransferStyles.container}>
              {/* Search Input */}
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

              {loading ? (
                <SkeletonLoader />
              ) : (
                <FlatList
                  data={filteredCountries}
                  keyExtractor={(item, index) => `${item.id}-${index}`}
                  nestedScrollEnabled
                  scrollEnabled={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={TransferStyles.itemContainer}
                      onPress={() => {
                        setSelectedCountry(item);
                        setScreenVisible(true);
                      }}
                      activeOpacity={0.7}
                    >
                      <View style={TransferStyles.itemContent}>
                        <View style={[TransferStyles.iconCircle]}>
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
                            {item.country_name}
                          </ThemedText>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  showsVerticalScrollIndicator={false}
                />
              )}
            </View>
          </ScrollView>
        </>
      ) : (
        <SendMobileMoney
          selectedCountry={selectedCountry?.country_code}
          onBack={() => setScreenVisible(false)}
        />
      )}

      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default MobileMoney;
