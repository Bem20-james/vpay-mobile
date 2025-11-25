import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/ThemedText";
import Navigator from "@/components/Navigator";
import { Colors } from "@/constants/Colors";
import images from "@/constants/Images";
import { useTheme } from "@/contexts/ThemeContexts";
import { styles as userStyx } from "@/styles/users";
import { useFetchAuthUser } from "@/hooks/useUser";

type userInfoProps = {
  label: string;
  name: string;
  hasChevron?: boolean;
  canCopy?: boolean;
};

const PersonalInfo: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const boxBackgroundColor = isDark
    ? Colors.dark.background
    : Colors.light.background;
  const boxBg = isDark ? Colors.dark.accentBg : Colors.light.accentBg;
  const { userData } = useFetchAuthUser();

  const UserInfoItem = ({
    label,
    name,
    hasChevron,
    canCopy
  }: userInfoProps) => {
    return (
      <View style={[styles.userItem, { backgroundColor: boxBg }]}>
        <View>
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#FFFFFF"
            style={userStyx.title}
          >
            {label}
          </ThemedText>
          <ThemedText
            lightColor="#252525"
            darkColor="#EEF3FB"
            style={userStyx.label}
          >
            {name}
          </ThemedText>
        </View>
        {hasChevron && (
          <Ionicons name="chevron-forward" size={20} color="#208bc9" />
        )}
        {canCopy && <Ionicons name="copy" size={20} color="#208bc9" />}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: boxBackgroundColor }]}
    >
      <Navigator title="Personal Information" showBackIcon={true} />

      <ScrollView>
        <View style={styles.container}>
          <View style={userStyx.avatarBox}>
            <View style={userStyx.avatarCon}>
              <AntDesign
                name="user"
                size={80}
                color="#161622"
                style={userStyx.icon}
              />
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={15} color="#fff" />
              </View>
            </View>
          </View>

          <UserInfoItem
            label="Username"
            name={userData?.username || "johndoe123"}
            canCopy={true}
          />
          <UserInfoItem
            label="Fullname"
            name={userData?.firstname + " " + userData?.lastname || "John Doe"}
          />
          <UserInfoItem label="Email" name={userData?.email || "John Doe"} />
          <UserInfoItem label="Account Tier" name={"Basic"} hasChevron={true} />
          <UserInfoItem
            label="Vpay Account Number"
            name={"217 0000 0001"}
            canCopy={true}
          />
          <UserInfoItem label="Gender" name="Male" />
          <UserInfoItem label="Mobile Number" name="+2349011567891" />
          <UserInfoItem label="Date of Birth" name="30th July 1989" />
          <UserInfoItem
            label="Address"
            name="Abuja, Nigeria"
            hasChevron={true}
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
    marginBottom: 20
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 5
  },
  userItem: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 7,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginHorizontal: 5,
    paddingVertical: 10
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start"
  }
});
