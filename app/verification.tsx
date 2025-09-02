import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState } from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { Option } from "./(user)/profile";
import PersonalInfo from "@/components/kyc/PersonalInfo";
import IdentityVerifiaction from "@/components/kyc/Identification";
import { KycStyles as styles } from "@/styles/kyc";
import images from "@/constants/Images";
import AddressVerification from "@/components/kyc/AddressVerification";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContexts";

const Verification = () => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const bgColor =
    colorScheme === "dark" ? Colors.dark.accentBg : Colors.light.accentBg;

  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const router = useRouter();
  const [showPersonalInfo, setShowPersonalInfo] = useState(false);
  const [showIdVerification, setShowIdVerification] = useState(false);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const {user} = useUser()

  if (showPersonalInfo) {
    return <PersonalInfo onBack={() => setShowPersonalInfo(false)} />;
  }

  if (showIdVerification) {
    return <IdentityVerifiaction onBack={() => setShowIdVerification(false)} />;
  }

  if (showAddressInfo) {
    return <AddressVerification onBack={() => setShowAddressInfo(false)} />;
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Verification" />
        <View style={styles.container}>
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#9B9B9B"
            style={styles.heroTxt}
          >
            Complete your account setup to be able to have access to unlimited
            features
          </ThemedText>

          <View style={{ marginTop: 20 }}>
            <Option
              label="Personal Information"
              title="Tier 1"
              hasChevron
              onPress={() => setShowPersonalInfo(true)}
              titleStyle={10}
              backgroundColor={bgColor}
              image={images.tier1}
            />
            
            <Option
              label="Identity Verification"
              title="Tier 2"
              hasChevron
              onPress={() => setShowIdVerification(true)}
              backgroundColor={bgColor}
              image={images.tier2}
            />
            <Option
              label="Add an address"
              title="Tier 3"
              hasChevron
              onPress={() => setShowAddressInfo(true)}
              backgroundColor={bgColor}
              image={images.tier3}
            />
          </View>
        </View>
      </ScrollView>

      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default Verification;
