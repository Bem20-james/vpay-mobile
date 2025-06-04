import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { notifications } from "@/assets/data";

const NotificationScreen = ({}) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const bgColor = colorScheme === "dark" ? "#161622" : "#ffffff";
  const [showMsg, setShowMsg] = React.useState(false);

  const handlePress = () => {
    setShowMsg(!showMsg);
  };

  return (
    <SafeAreaView style={{ backgroundColor: backgroundColor, height: "100%" }}>
      <Navigator title={showMsg ? "Message Body" : "Notifications"} />
      <View style={styles.container}>
        {!showMsg ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.label}
            numColumns={1}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[{ backgroundColor: bgColor }, styles.actionBox]}
                onPress={() => handlePress()}
                activeOpacity={0.7}
              >
                <View style={styles.row}>
                  <ThemedText
                    lightColor="#252525"
                    darkColor="#FFFFFF"
                    style={styles.label}
                  >
                    {item.label}
                  </ThemedText>

                  <View
                    style={{ flexDirection: "column", alignItems: "flex-end" }}
                  >
                    <ThemedText
                      lightColor="#000000"
                      darkColor="#FFFFFF"
                      style={styles.timestamp}
                    >
                      {item.timestamp}
                    </ThemedText>
                    <View style={styles.dot}></View>
                  </View>
                </View>

                <ThemedText
                  lightColor="#9B9B9B"
                  darkColor="#9B9B9B"
                  style={styles.message}
                >
                  {item.message}
                </ThemedText>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={{ paddingHorizontal: 10 }}>
            <ThemedText
              lightColor="#252525"
              darkColor="#FFFFFF"
              style={styles.label}
            >
              Debit Alert
            </ThemedText>
            <ThemedText
              lightColor="#9B9B9B"
              darkColor="#9B9B9B"
              style={styles.message}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod, lorem ipsum dolor sit amet consectetur mayonisa adipiscing bitisi
            </ThemedText>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 30
  },
  hero: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    marginBottom: 10,
    fontFamily: "Inter-Medium",
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0
  },
  more: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  column: {
    justifyContent: "space-between"
  },
  actionBox: {
    width: "100%",
    borderRadius: 8,
    justifyContent: "center",
    marginBottom: 7,
    padding: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  label: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    letterSpacing: 0
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 100,
    backgroundColor: "#218DC9",
    paddingVertical: 2
  },
  timestamp: {
    fontFamily: "Questrial",
    fontWeight: 600,
    fontSize: 14,
    letterSpacing: 0
  },
  message: {
    fontFamily: "Inter-Regular",
    fontWeight: 500,
    fontSize: 14,
    marginVertical: 7,
    letterSpacing: 0
  }
});
