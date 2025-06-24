import React from "react";
import { View, FlatList, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import Navigator from "@/components/Navigator";

interface Device {
  id: string;
  deviceName: string;
  location: string;
}

const mockDevices: Device[] = [
  {
    id: "1",
    deviceName: "First Name",
    location: "+2349870126543"
  },
  {
    id: "2",
    deviceName: "Last Name",
    location: "Advanztek@gmail.com"
  },
  {
    id: "3",
    deviceName: "Phone ",
    location: "+23.com"
  }
];

const PersonalInfo: React.FC = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";

  const renderItem = ({ item }: { item: Device }) => {
    return (
      <View
        style={[
          styles.deviceCard,
          {
            backgroundColor: colorScheme === "dark" ? "#161622" : "#FFFFFF"
          }
        ]}
      >
        <View style={styles.deviceInfo}>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.deviceName}>{item.deviceName}</ThemedText>
            <ThemedText darkColor="#FEFEFE" style={styles.meta}>
              {item.location}
            </ThemedText>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <ScrollView>
        <View style={styles.container}>
          <Navigator title="Personal Information" showBackIcon={true} />

          <FlatList
            data={mockDevices}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <CustomButton
            title="Update Information"
            handlePress={() => console.log("Update pressed")}
            btnStyles={styles.logoutButton}
            variant="outline"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  container: {
    marginHorizontal: 10,
    marginTop: 5
  },
  deviceCard: {
    padding: 10,
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
    fontSize: 18,
    fontFamily: "Questrial",
    marginTop: 4
  },
  logoutButton: {
    marginTop: 12,
    alignSelf: "flex-end",
    width: "100%"
  }
});
