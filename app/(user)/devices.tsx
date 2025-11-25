import React from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import { useFetchSessions, useRemoveSessions } from "@/hooks/useUser";
import Navigator from "@/components/Navigator";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContexts";

interface Device {
  id: string;
  device: string;
  ip: string;
  location: string;
  created_at: string;
  isCurrentDevice: boolean;
}
const DeviceSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.skeletonCard,
        {
          backgroundColor: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.06)"
        }
      ]}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={[
            styles.skeletonIcon,
            {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.10)"
                : "rgba(0,0,0,0.08)"
            }
          ]}
        />
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.skeletonLineLarge,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.10)"
                  : "rgba(0,0,0,0.08)"
              }
            ]}
          />

          <View
            style={[
              styles.skeletonLineSmall,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.07)"
              }
            ]}
          />

          <View
            style={[
              styles.skeletonLineTiny,
              {
                backgroundColor: isDark
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)"
              }
            ]}
          />
        </View>
      </View>

      <View
        style={[
          styles.skeletonButton,
          {
            backgroundColor: isDark
              ? "rgba(255,255,255,0.10)"
              : "rgba(0,0,0,0.08)"
          }
        ]}
      />
    </View>
  );
};

const ManageDevices: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const { sessions, refetch, loading } = useFetchSessions();
  const { removeSession, loadingIds } = useRemoveSessions();

  const handleLogoutDevice = async (deviceId: string) => {
    try {
      await removeSession(deviceId);
      await refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const renderItem = ({ item }: { item: Device }) => {
    const isLoading = loadingIds.has(item.id);

    return (
      <View
        style={[
          styles.deviceCard,
          {
            backgroundColor: isDark
              ? Colors.dark.accentBg
              : Colors.light.accentBg
          },
          item.isCurrentDevice && styles.currentDeviceHighlight
        ]}
      >
        <View style={styles.deviceInfo}>
          <Ionicons
            name="phone-portrait"
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
            title="Terminate"
            handlePress={() => handleLogoutDevice(item.id)}
            btnStyles={styles.logoutButton}
            variant="danger"
            size="small"
            isLoading={isLoading}
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
          {loading ? (
            <>
              <DeviceSkeleton />
              <DeviceSkeleton />
              <DeviceSkeleton />
            </>
          ) : (
            <FlatList
              data={sessions}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 10 }}
              nestedScrollEnabled={true}
              scrollEnabled={false}
            />
          )}
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
  },
  //skeleton styles
  skeletonCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "rgba(0,0,0,0.06)"
  },

  skeletonIcon: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginRight: 12
  },

  skeletonLineLarge: {
    height: 14,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.08)",
    width: "60%",
    marginBottom: 10
  },

  skeletonLineSmall: {
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.07)",
    width: "40%",
    marginBottom: 8
  },

  skeletonLineTiny: {
    height: 10,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.06)",
    width: "30%"
  },

  skeletonButton: {
    marginTop: 16,
    height: 28,
    width: 90,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.08)",
    alignSelf: "flex-end"
  }
});
