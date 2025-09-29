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
import { KycStyles as styles } from "@/styles/kyc";
import { TransferStyles } from "@/styles/transfers";
import CountryFlag from "react-native-country-flag";
import { Feather } from "@expo/vector-icons";
import { countries } from "@/assets/data";
import SendInternational from "@/components/Transfers/sendInternational";
import { Colors } from "@/constants/Colors";

const International = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const [screenVisible, setScreenVisible] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState("");

  const handleCountrySelect = (country: string) => {
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
              <FlatList
                data={countries}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                nestedScrollEnabled={true}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={TransferStyles.itemContainer}
                    onPress={() => handleCountrySelect(item.name)}
                    activeOpacity={0.7}
                  >
                    <View style={TransferStyles.itemContent}>
                      <View style={[TransferStyles.iconCircle]}>
                        <CountryFlag
                          isoCode={item.countryCode}
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
                          {item.name}
                        </ThemedText>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator={false}
              />
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
