import { useState } from "react";
import {
  StyleSheet,
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
import { countries } from "@/assets/data";
import CountryFlag from "react-native-country-flag";
import { Colors } from "@/constants/Colors";
import SendMobileMoney from "@/components/Transfers/SendMobileMoney";

const MobileMoney = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const [query, setQuery] = useState("");
  const [screenVisible, setScreenVisible] = useState(false);

  return (
    <SafeAreaView style={[KycStyles.safeArea, { backgroundColor }]}>
      {!screenVisible ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Navigator title="Mobile Money" />
          <View style={TransferStyles.container}>
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
                    onPress={() => setScreenVisible(true)}
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
        <SendMobileMoney onBack={() => setScreenVisible(false)} />
      )}
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};


export default MobileMoney;
