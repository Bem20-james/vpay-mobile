import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Feather } from "@expo/vector-icons";
import * as Contacts from "expo-contacts";
import { useIsFocused } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";
import CustomButton from "./CustomButton";
import { StoredContact } from "@/utils/encryptedStore";
import { useVpayContacts } from "@/hooks/useContacts";
import SkeletonRow from "./SkeletonRow";

interface ContactSectionProps {
  title?: string;
  contacts: StoredContact[];
  onRefresh?: () => void;
  loading?: boolean;
  emptyMessage?: string;
  onSelect?: (contact: StoredContact) => void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Your Vpay Contacts",
  contacts,
  loading = false,
  onRefresh,
  emptyMessage,
  onSelect,
}) => {
  const isFocused = useIsFocused();
  const [permissionStatus, setPermissionStatus] = useState<
    "undetermined" | "granted" | "denied"
  >("undetermined");
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { loadVpayContacts } = useVpayContacts();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.getPermissionsAsync();
      setPermissionStatus(status as any);
      setTimeout(() => setIsInitialLoading(false), 1000);
    })();
  }, []);

  useEffect(() => {
    if (isFocused && permissionStatus === "granted" && onRefresh) {
      onRefresh();
    }
  }, [isFocused, permissionStatus]);

  // 🩶 Skeleton Loader
  if (isInitialLoading || loading) {
    return (
      <View style={{ marginTop: 10 }}>
        {[...Array(4)].map((_, i) => (
          <SkeletonRow key={i} />
        ))}
      </View>
    );
  }

  // 🚫 Permission not granted
  if (permissionStatus !== "granted") {
    return (
      <>
        <ThemedText
          style={{
            color: "#F5F5F5",
            fontSize: 15,
            fontFamily: "Inter-SemiBold",
            marginTop: 20,
            textTransform: "uppercase",
          }}
        >
          {title}
        </ThemedText>

        <View style={{ marginTop: 15, alignItems: "center" }}>
          <Feather name="user-check" size={36} color="#209BC9" />
          <ThemedText style={{ opacity: 0.7, fontSize: 12, marginTop: 6 }}>
            See which of your contacts are on Vpay
          </ThemedText>
          <CustomButton title="Grant Permission" handlePress={loadVpayContacts} />
        </View>
      </>
    );
  }

  // 📭 Empty state
  if (!contacts.length) {
    return (
      <>
        <ThemedText
          style={{
            color: "#F5F5F5",
            fontSize: 15,
            fontFamily: "Inter-SemiBold",
            marginTop: 20,
            textTransform: "uppercase",
          }}
        >
          {title}
        </ThemedText>
        <View style={{ marginTop: 15, alignItems: "center" }}>
          <Feather name="users" size={36} color="#208BC9" />
          <ThemedText style={{ opacity: 0.7, fontSize: 12 }}>
            {emptyMessage || "No contacts on Vpay yet"}
          </ThemedText>
          <CustomButton
            title="Refer Friends"
            handlePress={() => console.log("Refer friends")}
          />
        </View>
      </>
    );
  }

  // ✅ Contact list
  return (
    <FlatList
      data={contacts}
      keyExtractor={(item) => item.handle}
      nestedScrollEnabled
      scrollEnabled={false}
      ListHeaderComponent={
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <ThemedText
            style={{
              color: "#F5F5F5",
              fontSize: 13,
              fontFamily: "Inter-SemiBold",
              textTransform: "uppercase",
            }}
          >
            {title}
          </ThemedText>
          {onRefresh && (
            <TouchableOpacity onPress={onRefresh}>
              <Feather name="refresh-cw" size={16} color="#208BC9" />
            </TouchableOpacity>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 15,
            paddingVertical: 10,
            borderBottomColor: "#d9d9d9",
            borderBottomWidth: 0.5,
          }}
          onPress={() => onSelect?.(item)}
          activeOpacity={0.7}
        >
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={{ width: 35, height: 35, borderRadius: 20 }}
            />
          ) : (
            <View
              style={{
                backgroundColor: "#fff",
                width: 30,
                height: 30,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CountryFlag isoCode={item.flag ?? ""} size={20} />
            </View>
          )}

          <View>
            <ThemedText style={{ fontSize: 14, fontWeight: "500" }}>
              {item.name}
            </ThemedText>
            <ThemedText style={{ fontSize: 12, color: "#9B9B9B" }}>
              {item.handle || item.phoneNumber}
            </ThemedText>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ContactSection;
