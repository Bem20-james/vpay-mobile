import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContexts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions
} from "react-native";

const { height } = Dimensions.get("window");

interface CryptoAsset {
  token_symbol: string;
  token_name: string;
  balance: number;
  token_image?: string;
  price: number;
  wallet_address: string;
  status: string;
}

interface FiatAsset {
  currency_code: string;
  fiat_currency_name: string;
  balance: number | null;
  rate: string;
  bank: string;
  account_number: string;
  country_code: string;
}

type Asset = CryptoAsset | FiatAsset;

interface CurrencySelectionModalProps {
  visible: boolean;
  onClose: () => void;
  cryptoAssets: CryptoAsset[];
  fiatAssets: FiatAsset[];
  onSelectAsset: (asset: Asset, type: "crypto" | "fiat") => void;
  title?: string;
}

const CurrencySelectionModal: React.FC<CurrencySelectionModalProps> = ({
  visible,
  onClose,
  cryptoAssets,
  fiatAssets,
  onSelectAsset,
  title = "Select Currency"
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const backgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const cardBg = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const cardTxt = isDark ? Colors.dark.text : Colors.light.text;
  const borderColor = isDark ? "#2A2A2A" : "#E5E5E5";

  // Filter crypto assets
  const filteredCrypto = cryptoAssets.filter(
    (asset) =>
      asset.token_symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.token_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter fiat assets
  const filteredFiat = fiatAssets.filter(
    (asset) =>
      asset.currency_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.fiat_currency_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAsset = (asset: Asset, type: "crypto" | "fiat") => {
    onSelectAsset(asset, type);
    setSearchQuery("");
    onClose();
  };

  const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return null;
    // Adjust this base URL to match your API's image serving URL
    const baseUrl = "https://your-api-domain.com/"; // Update this!
    return `${baseUrl}${imagePath}`;
  };

  const renderCryptoAsset = (asset: CryptoAsset, index: number) => {
    const imageUrl = getImageUrl(asset.token_image);

    return (
      <TouchableOpacity
        key={`crypto-${asset.token_symbol}-${index}`}
        style={[styles.assetItem, { borderBottomColor: borderColor }]}
        onPress={() => handleSelectAsset(asset, "crypto")}
        activeOpacity={0.7}
      >
        <View style={styles.assetLeft}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.assetImage} />
          ) : (
            <View
              style={[
                styles.assetImagePlaceholder,
                { backgroundColor: cardBg }
              ]}
            >
              <ThemedText style={styles.assetImageText}>
                {asset.token_symbol.substring(0, 2).toUpperCase()}
              </ThemedText>
            </View>
          )}
          <View style={styles.assetInfo}>
            <ThemedText style={styles.assetSymbol}>
              {asset.token_symbol.toUpperCase()}
            </ThemedText>
            <ThemedText style={styles.assetName}>{asset.token_name}</ThemedText>
          </View>
        </View>
        <View style={styles.assetRight}>
          <ThemedText style={styles.assetBalance}>
            {asset.balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6
            })}
          </ThemedText>
          <ThemedText style={[styles.assetType, { color: "#208BC9" }]}>
            Crypto
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFiatAsset = (asset: FiatAsset, index: number) => {
    const balance = asset.balance ?? 0;

    return (
      <TouchableOpacity
        key={`fiat-${asset.currency_code}-${index}`}
        style={[styles.assetItem, { borderBottomColor: borderColor }]}
        onPress={() => handleSelectAsset(asset, "fiat")}
        activeOpacity={0.7}
      >
        <View style={styles.assetLeft}>
          <View
            style={[styles.assetImagePlaceholder, { backgroundColor: cardBg }]}
          >
            <ThemedText style={styles.assetImageText}>
              {asset.currency_code.substring(0, 2).toUpperCase()}
            </ThemedText>
          </View>
          <View style={styles.assetInfo}>
            <ThemedText style={styles.assetSymbol}>
              {asset.currency_code.toUpperCase()}
            </ThemedText>
            <ThemedText style={styles.assetName}>
              {asset.fiat_currency_name}
            </ThemedText>
          </View>
        </View>
        <View style={styles.assetRight}>
          <ThemedText style={styles.assetBalance}>
            {balance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </ThemedText>
          <ThemedText style={[styles.assetType, { color: "#10B981" }]}>
            Fiat • {asset.bank}
          </ThemedText>
        </View>
      </TouchableOpacity>
    );
  };

  const hasResults = filteredCrypto.length > 0 || filteredFiat.length > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdropTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: backgroundColor,
              shadowColor: isDark ? "#000" : "#000"
            }
          ]}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.modalTitle}>{title}</ThemedText>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={24} color={cardTxt} />
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View
            style={[
              styles.searchContainer,
              { backgroundColor: cardBg, borderColor }
            ]}
          >
            <MaterialCommunityIcons
              name="magnify"
              size={20}
              color={isDark ? "#888" : "#666"}
              style={styles.searchIcon}
            />
            <TextInput
              style={[styles.searchInput, { color: cardTxt }]}
              placeholder="Search currency..."
              placeholderTextColor={isDark ? "#888" : "#999"}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialCommunityIcons
                  name="close-circle"
                  size={18}
                  color={isDark ? "#888" : "#666"}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Currency List */}
          <ScrollView
            style={styles.listContainer}
            showsVerticalScrollIndicator={false}
          >
            {hasResults ? (
              <>
                {/* Crypto Assets Section */}
                {filteredCrypto.length > 0 && (
                  <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>
                      Cryptocurrency
                    </ThemedText>
                    {filteredCrypto.map((asset, index) =>
                      renderCryptoAsset(asset, index)
                    )}
                  </View>
                )}

                {/* Fiat Assets Section */}
                {filteredFiat.length > 0 && (
                  <View style={styles.section}>
                    <ThemedText style={styles.sectionTitle}>
                      Fiat Currency
                    </ThemedText>
                    {filteredFiat.map((asset, index) =>
                      renderFiatAsset(asset, index)
                    )}
                  </View>
                )}
              </>
            ) : (
              <View style={styles.emptyState}>
                <MaterialCommunityIcons
                  name="currency-usd-off"
                  size={48}
                  color={isDark ? "#555" : "#CCC"}
                />
                <ThemedText style={styles.emptyText}>
                  No currencies found
                </ThemedText>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end"
  },
  backdropTouchable: {
    flex: 1
  },
  modalContainer: {
    height: height * 0.75,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700"
  },
  closeButton: {
    padding: 4
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    opacity: 0.6,
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  assetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1
  },
  assetLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1
  },
  assetImage: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  assetImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  assetImageText: {
    fontSize: 14,
    fontWeight: "600"
  },
  assetInfo: {
    marginLeft: 12,
    flex: 1
  },
  assetSymbol: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2
  },
  assetName: {
    fontSize: 13,
    opacity: 0.7
  },
  assetRight: {
    alignItems: "flex-end"
  },
  assetBalance: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2
  },
  assetType: {
    fontSize: 12,
    opacity: 0.8
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    opacity: 0.6
  }
});

export default CurrencySelectionModal;
