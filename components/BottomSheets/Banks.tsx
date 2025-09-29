import React, { useRef, useMemo, useState, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  TextInput
} from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "../ThemedText";
import { btmSheetStyles as styles } from "../../styles/bottomsheets";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { MotiView } from "moti";

export type BankItem = {
  id?: number;
  name: string;
  code: string;
};

interface BanksSheetProps {
  isVisible: boolean;
  onClose: () => void;
  data: BankItem[];
  onSelect: (item: BankItem) => void;
  isLoading?: boolean;
  title?: string;
  snapPoints?: string[];
}

const BanksBottomSheet = ({
  isVisible,
  onClose,
  data,
  onSelect,
  isLoading = false,
  title = "Select Bank",
  snapPoints = ["60%", "70%"]
}: BanksSheetProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const colorScheme = useColorScheme();
  const [search, setSearch] = useState("");

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState("");
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100);
    return () => clearTimeout(timer);
  }, [search]);

  // Filtered data
  const filteredData = useMemo(() => {
    if (!debouncedSearch.trim()) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [data, debouncedSearch]);

  const handleItemSelect = useCallback(
    (item: BankItem) => {
      onSelect(item);
      bottomSheetRef.current?.close();
    },
    [onSelect]
  );

  // Moti Loading View
  const LoadingView = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
      }}
    >
      <MotiView
        from={{ opacity: 0.3, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "timing",
          duration: 800,
          loop: true,
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#208BC9",
          marginBottom: 16,
        }}
      />
      <ThemedText
        style={{
          fontSize: 16,
          opacity: 0.7,
          textAlign: "center",
        }}
      >
        Loading banks...
      </ThemedText>
    </View>
  );

  const NoResultsView = () => (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 50,
      }}
    >
      <Feather name="search" size={48} color="#999" style={{ marginBottom: 16 }} />
      <ThemedText
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Bank Not Found
      </ThemedText>
      <ThemedText
        style={{
          fontSize: 14,
          opacity: 0.7,
          textAlign: "center",
          paddingHorizontal: 20,
        }}
      >
        We couldn't find any banks matching "{debouncedSearch}". Please try a
        different search term.
      </ThemedText>
    </View>
  );

  const renderItem = ({ item }: { item: BankItem }) => (
    <TouchableOpacity
      style={[
        styles.item,
        { borderBottomColor: "#252d31ff", borderBottomWidth: 0.3 },
      ]}
      onPress={() => handleItemSelect(item)}
    >
      <View style={styles.sheetCon}>
        <ThemedText style={styles.sheetLabel}>{item.name}</ThemedText>
        <ThemedText
          style={
            styles.sheetCode || {
              fontSize: 12,
              opacity: 0.6,
              marginTop: 2,
            }
          }
        >
          {item.code}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );

  if (!isVisible) return null;

  return (
    <Portal>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose
        handleIndicatorStyle={styles.indicatorHandle}
        onClose={onClose}
        maxDynamicContentSize={75}
        backgroundStyle={{
          backgroundColor:
            colorScheme === "dark"
              ? Colors.dark.primaryBgDark
              : Colors.light.accentBg,
        }}
      >
        <ThemedText style={styles.title}>{title}</ThemedText>

        {/* Search Input */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color="#208BC9"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bank"
            placeholderTextColor="#13181bff"
            value={search}
            onChangeText={setSearch}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearch("")}
              style={styles.clearButton || { padding: 4 }}
            >
              <Feather name="x" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        {isLoading ? (
          <LoadingView />
        ) : filteredData.length === 0 && debouncedSearch.length > 0 ? (
          <NoResultsView />
        ) : (
          <BottomSheetFlatList
            data={filteredData}
            keyExtractor={(item, index) =>
              item.id !== undefined ? item.id.toString() : `bank-${index}`
            }
            renderItem={renderItem}
            contentContainerStyle={[
              styles.bottomSheetContent,
              filteredData.length === 0 && { flex: 1 },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </BottomSheet>
    </Portal>
  );
};

export default BanksBottomSheet;
