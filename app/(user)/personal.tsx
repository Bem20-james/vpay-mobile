import React from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import Navigator from "@/components/Navigator";
import { Colors } from "@/constants/Colors";
import images from "@/constants/Images";

type userInfoProps = {
  label: string;
  name: string;
};

const PersonalInfo: React.FC = () => {
  const colorScheme = useColorScheme();
  const boxBackgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";

  const UserInfoItem = ({ label, name }: userInfoProps) => {
    return (
      <View
        style={[
          styles.userItem,
          {
            backgroundColor:
              colorScheme === "dark"
                ? Colors.dark.accentBg
                : Colors.light.accentBg
          }
        ]}
      >
        <View style={styles.content}>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.label}>{label}</ThemedText>
            <ThemedText darkColor="#FEFEFE" style={styles.name}>
              {name}
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
          <View style={styles.imgcontainer}>
            <TouchableOpacity
              style={styles.avatarWrapper}
              activeOpacity={0.7}
              onPress={() => {}}
            >
              <Image
                source={images.avatar}
                style={styles.avatar}
              />
              <View style={styles.cameraIconContainer}>
                <Ionicons name="camera" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <UserInfoItem label="Full Name" name="James Bem Aondoakura" />
          <UserInfoItem label="Email" name="be*gmail.com" />
          <UserInfoItem label="Gender" name="Male" />

          <UserInfoItem label="Mobile Number" name="+0123456789" />
          <UserInfoItem label="Username" name="Jimie" />
          <UserInfoItem label="Date of birth" name="James Bem Aondoakura" />
          <UserInfoItem label="Address" name="James Bem Aondoakura" />
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
  imgcontainer: {
    alignItems: "center",
    paddingVertical: 10,
    marginBottom: 10
  },
  avatarWrapper: {
    position: "relative"
  },
  avatar: {
    width: 80,
    height: 80,
    objectFit: "cover",
    borderRadius: 50,
    borderColor: "#444",
    borderWidth: 2
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 5
  },
  userItem: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  name: {
    fontSize: 15,
    fontFamily: "Inter-Medium"
  },
  label: {
    fontSize: 13,
    fontFamily: "Questrial",
    marginTop: 4
  }
});
