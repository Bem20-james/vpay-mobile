import React, { useState, useMemo } from "react";
import {
  Modal,
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import * as Contacts from "expo-contacts";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectContact: (phone: string) => void;
  contacts: Contacts.Contact[];
};

const ContactsModal = ({
  visible,
  onClose,
  onSelectContact,
  contacts
}: Props) => {
  const [search, setSearch] = useState("");
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;

  const filteredContacts = useMemo(
    () =>
      contacts.filter((c) =>
        c.name?.toLowerCase().includes(search.toLowerCase())
      ),
    [contacts, search]
  );

  return (
    <Modal visible={visible} animationType="fade" transparent={false}>
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: backgroundColor }]}
      >
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center", marginHorizontal: 10, }}>
          <View style={styles.container}>
            <View style={styles.searchContainer}>
              <Feather
                name="search"
                size={20}
                color="#208BC9"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search contacts..."
                placeholderTextColor="#041723"
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
              />
            </View>
          </View>

          <Ionicons
            name="close"
            style={styles.close}
            size={30}
            onPress={onClose}
          />
        </View>

        <FlatList
          data={filteredContacts}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                paddingVertical: 12,
                borderBottomWidth: 0.4,
                borderBottomColor: colorScheme === "dark" ? "#10334aff" : "#bacedaff"
              }}
              onPress={() => {
                const phone = item.phoneNumbers?.[0]?.number || "";
                onSelectContact(phone);
                onClose();
              }}
            >
              <ThemedText style={{ fontSize: 16, fontWeight: "500", fontFamily: "Questrial" }}>
                {item.name}
              </ThemedText>
              {item.phoneNumbers && (
                <ThemedText style={{ color: "#666", fontFamily: "Inter-SemiBold" }}>
                  {item.phoneNumbers[0]?.number}
                </ThemedText>
              )}
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 7
  },
  container: {
    marginTop: 10,
    width: "90%"
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#E9F7FF",
    borderWidth: 0.5,
    borderColor: "#bacedaff",
    borderRadius: 100,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  },
  searchIcon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000"
  },
  close: {
    color: "#208BC9"
  }
});

export default ContactsModal;
