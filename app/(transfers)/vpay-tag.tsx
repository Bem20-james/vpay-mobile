import React, { useState, useMemo, useEffect } from "react";
import {
  ScrollView,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "@/components/Navigator";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { StatusBar } from "expo-status-bar";
import { TransferStyles as styles } from "@/styles/transfers";
import { Colors } from "@/constants/Colors";
import { useResolveVpayTag } from "@/hooks/useTransfers";
import { useContacts, useVpayContacts } from "@/hooks/useContacts";
import ContactSection from "@/components/ContactSection";
import RecentBeneficiaries from "@/components/Recents/RecentsBeneficiaries";
import SendScreen from "@/components/Transfers/SendScreen";
import { StoredContact } from "@/utils/encryptedStore";
import { ThemedText } from "@/components/ThemedText";
import CountryFlag from "react-native-country-flag";

const VpayTag = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;

  const [selectedVpayUser, setSelectedVpayUser] = useState<any | null>(null);
  const [showSendScreen, setShowSendScreen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  // ✅ API hook
  const { resolveTag, acctInfo, loading: apiLoading } = useResolveVpayTag();
  // console.log("selected vpaytag:", selectedVpayUser);

  // ✅ Local contacts
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

  // ✅ Filter local results before calling backend
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
      recent: storedResults.recent ?? [],
      saved: storedResults.saved ?? [],
      vpay: vpayResults ?? []
    };
  }, [
    query,
    recentContacts,
    savedBeneficiaries,
    vpayContacts,
    searchStoredContacts,
    searchVpayContacts
  ]);

  // ✅ Search effect: only hit backend when all local searches are empty
  useEffect(() => {
    const timeout = setTimeout(async () => {
      const hasLocalResults =
        filteredContacts.recent.length > 0 ||
        filteredContacts.saved.length > 0 ||
        filteredContacts.vpay.length > 0;

      if (query.trim() && !hasLocalResults) {
        setIsSearching(true);
        setSearchError(null);

        try {
          await resolveTag({ vpay_tag: query.trim() });
        } catch (err) {
          console.log("Resolve tag failed:", err);
          setSearchError("User not found");
        } finally {
          setIsSearching(false);
        }
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [query, filteredContacts, resolveTag]);

  const handleSelect = (contact: any) => {
    setSelectedVpayUser(contact);
    setShowSendScreen(true);
  };

  const showAcctInfo = acctInfo;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      {!showSendScreen ? (
        <ScrollView>
          <Navigator title="Vpay Tag" />

          <View style={styles.container}>
            {/* 🔍 Search input */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="@vpaytag"
                placeholderTextColor="#041723"
                value={query}
                onChangeText={setQuery}
                autoCapitalize="none"
              />
            </View>

            {/* 🔍 Searching indicator */}
            {(isSearching || apiLoading) && (
              <View style={{ marginTop: 15, alignItems: "center" }}>
                <ActivityIndicator size="small" color="#999" />
                <ThemedText style={{ opacity: 0.6, marginTop: 8 }}>
                  Searching for {query}...
                </ThemedText>
              </View>
            )}

            {/* ❌ Search Error */}
            {searchError && (
              <ThemedText
                style={{ color: "red", textAlign: "center", marginTop: 10 }}
              >
                {searchError}
              </ThemedText>
            )}

            {/* ✅ Backend result */}
            {showAcctInfo && (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  backgroundColor: "#1A1A1A",
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10
                }}
                onPress={() => handleSelect(acctInfo)}
              >
                {acctInfo?.avatar ? (
                  <Image
                    source={{
                      uri: acctInfo?.avatar ?? "https://placehold.co/100"
                    }}
                    style={{ width: 40, height: 40, borderRadius: 20 }}
                  />
                ) : (
                  <CountryFlag
                    isoCode={acctInfo.country_code ?? ""}
                    size={20}
                  />
                )}

                <View>
                  <ThemedText style={{ fontSize: 14, fontWeight: "600" }}>
                    {acctInfo?.accountname}
                  </ThemedText>
                  <ThemedText style={{ fontSize: 12, color: "#999" }}>
                    {"@" + acctInfo?.username}
                  </ThemedText>
                </View>
              </TouchableOpacity>
            )}

            {/* 🕓 Local Contacts Sections */}
            {!query && (
              <>
                <RecentBeneficiaries
                  title="Recent"
                  recents={filteredContacts.recent}
                  loading={storedLoading}
                  beneficiaries={filteredContacts.saved}
                  onSelect={handleSelect}
                />
                <ContactSection
                  title="Vpay Contacts"
                  contacts={filteredContacts.vpay}
                  loading={vpayLoading}
                  onRefresh={loadVpayContacts}
                  emptyMessage="No contacts using Vpay found"
                  onSelect={handleSelect}
                />
              </>
            )}
          </View>
        </ScrollView>
      ) : (
        <SendScreen
          onBack={() => setShowSendScreen(false)}
          title="Send to Vpay Tag"
          type="vpaytag"
          accountDetails={{
            accountNumber:
              selectedVpayUser?.accountNumer ??
              selectedVpayUser?.accountnumber ??
              "",
            bank: selectedVpayUser?.handle ?? selectedVpayUser?.username ?? "",
            accountName: selectedVpayUser?.name ?? selectedVpayUser?.accountname ?? "",
            username: selectedVpayUser?.username ?? selectedVpayUser?.handle ?? ""
          }}
        />
      )}

      <StatusBar style="dark" backgroundColor={backgroundColor} />
    </SafeAreaView>
  );
};

export default VpayTag;
