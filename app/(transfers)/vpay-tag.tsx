import { ScrollView, View, TextInput, ActivityIndicator } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import { TransferStyles as styles } from "@/styles/transfers";
import { Colors } from "@/constants/Colors";
import { SendScreenProps } from "@/types/transfers";
import { useResolveVpayTag } from "@/hooks/useTransfers";
import { useContacts, useVpayContacts } from "@/hooks/useContacts";
import ContactSection from "../../components/ContactSection";

const VpayTag = ({ onBack }: SendScreenProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const [query, setQuery] = useState("");
  const [vpayContactsLoaded, setVpayContactsLoaded] = useState(false);

  const { resolveTag } = useResolveVpayTag();
  const {
    recentContacts,
    savedBeneficiaries,
    loading: storedLoading,
    searchStoredContacts
  } = useContacts();

  const {
    vpayContacts,
    loading: vpayLoading,
    loadVpayContacts,
    searchVpayContacts
  } = useVpayContacts();

  // Load Vpay contacts on component mount
  useEffect(() => {
    if (!vpayContactsLoaded) {
      loadVpayContacts();
      setVpayContactsLoaded(true);
    }
  }, []);

  // Filter contacts based on search query
  const filteredContacts = useMemo(() => {
    if (!query.trim()) {
      return {
        recent: recentContacts,
        saved: savedBeneficiaries,
        vpay: vpayContacts
      };
    }

    const storedResults = searchStoredContacts(query);
    const vpayResults = searchVpayContacts(query);

    return {
      recent: storedResults.recent,
      saved: storedResults.saved,
      vpay: vpayResults
    };
  }, [
    query,
    recentContacts,
    savedBeneficiaries,
    vpayContacts,
    searchStoredContacts,
    searchVpayContacts
  ]);

  // Handle backend tag resolution when user finishes typing
  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (query.trim() && query.startsWith("@")) {
        try {
          await resolveTag({ vpayTag: query });
        } catch (error) {
          console.log("Tag not found or network error");
        }
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [query, resolveTag]);

  if (storedLoading) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        <Navigator title="Vpay Tag" />
        <View
          style={[
            styles.container,
            { justifyContent: "center", alignItems: "center" }
          ]}
        >
          <ActivityIndicator size="large" color="#208BC9" />
          <ThemedText style={{ marginTop: 10 }}>Loading contacts...</ThemedText>
        </View>
      </SafeAreaView>
    );
  }

  const hasAnyContacts =
    filteredContacts.recent.length > 0 ||
    filteredContacts.saved.length > 0 ||
    filteredContacts.vpay.length > 0;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView>
        <Navigator title="Vpay Tag" />
        <View style={styles.container}>
          {/* Search */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="@VpayTag"
              placeholderTextColor="#041723"
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
            />
          </View>

          {/* Recent Beneficiaries */}
          <ContactSection
            title="Recent Beneficiaries"
            contacts={filteredContacts.recent}
            keyPrefix="recent"
            sectionHeaderStyle={[styles.sectionHeader, { marginTop: 5 }]}
          />

          {/* Saved Beneficiaries */}
          <ContactSection
            title="Saved Beneficiaries"
            contacts={filteredContacts.saved}
            keyPrefix="saved"
            sectionHeaderStyle={styles.sectionHeader}
          />

          {/* Vpay Contacts */}
          <ContactSection
            title="Vpay Contacts"
            contacts={filteredContacts.vpay}
            keyPrefix="vpay"
            loading={vpayLoading}
            onRefresh={loadVpayContacts}
            emptyMessage="No contacts using Vpay found"
            sectionHeaderStyle={styles.sectionHeader}
          />

          {/* No results */}
          {!hasAnyContacts && !vpayLoading && (
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <ThemedText style={{ opacity: 0.6 }}>
                {query.trim() ? "No contacts found" : "No contacts available"}
              </ThemedText>
            </View>
          )}
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default VpayTag;
