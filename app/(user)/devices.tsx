import React from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import { useFetchSessions } from "@/hooks/useUser";
import Navigator from "@/components/Navigator";
import { Colors } from "@/constants/Colors";

interface Device {
  id: string;
  device: string;
  ip: string;
  location: string;
  created_at: string;
  isCurrentDevice: boolean;
}

const ManageDevices: React.FC = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const { sessions } = useFetchSessions();

  const handleLogoutDevice = (deviceId: string) => {
    console.log("Logging out device:", deviceId);
  };

  const renderItem = ({ item }: { item: Device }) => {
    return (
      <View
        style={[
          styles.deviceCard,
          {
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.accentBg
                : Colors.light.accentBg
          },
          item.isCurrentDevice && styles.currentDeviceHighlight
        ]}
      >
        <View style={styles.deviceInfo}>
          <Ionicons
            name={"phone-portrait"}
            size={24}
            color="#007AFF"
            style={{ marginRight: 12 }}
          />
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.deviceName}>{item.device}</ThemedText>
            <ThemedText style={styles.meta}>
              {item.ip} • Last active: {item.created_at}
            </ThemedText>
            {item.isCurrentDevice && (
              <ThemedText style={styles.currentLabel}>This device</ThemedText>
            )}
          </View>
        </View>
        {!item.isCurrentDevice && (
          <CustomButton
            title="Remove"
            handlePress={() => handleLogoutDevice(item.id)}
            btnStyles={styles.logoutButton}
            variant="danger"
            size="small"
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Navigator title="Manage Devices" showBackIcon={true} />
          <ThemedText style={styles.description}>
            You're currently logged in on the following devices.
          </ThemedText>
          <FlatList
            data={sessions}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 10 }}
            nestedScrollEnabled={true}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageDevices;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    marginHorizontal: 10,
    marginTop: 5
  },
  description: {
    fontSize: 14,
    fontFamily: "Questrial",
    color: "#6e6e73",
    marginBottom: 20
  },
  deviceCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  deviceInfo: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  deviceName: {
    fontSize: 16,
    fontFamily: "Inter-Medium",
    fontWeight: "600"
  },
  meta: {
    fontSize: 13,
    fontFamily: "Questrial",
    marginTop: 4
  },
  currentLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#007AFF",
    fontFamily: "Inter-Bold"
  },
  logoutButton: {
    marginTop: 12,
    alignSelf: "flex-end",
    width: 100
  },
  currentDeviceHighlight: {
    borderWidth: 1,
    borderColor: "#007AFF"
  }
});
