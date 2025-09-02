import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "react-native-safe-area-context";
import Navigator from "@/components/Navigator";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import images from "@/constants/Images";
import { styles } from "@/styles/users";
import { useFetchAuthUser } from "@/hooks/useUser";
import VerificationBtmSheet from "@/components/BottomSheets/Verification";

export const Option = ({
  title,
  label,
  hasSwitch,
  switchValue,
  onSwitchChange,
  hasChevron,
  onPress,
  textColor,
  icon,
  iconColor,
  iconBgColor = "#F2F2F7",
  backgroundColor,
  titleStyle = 18,
  image
}: {
  title: string;
  label?: string;
  hasSwitch?: boolean;
  switchValue?: boolean;
  onSwitchChange?: (value: boolean) => void;
  hasChevron?: boolean;
  onPress?: () => void;
  textColor?: string;
  icon?: any;
  iconColor?: string;
  iconBgColor?: string;
  backgroundColor?: string;
  titleStyle?: any;
  image?: any;
}) => (
  <TouchableOpacity
    style={[styles.optionItem, { backgroundColor: backgroundColor }]}
    onPress={onPress}
    disabled={hasSwitch}
  >
    <View style={styles.optionLeft}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
      )}
      {image && (
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <Image source={image} width={50} height={50} />
        </View>
      )}
      <View>
        <ThemedText
          lightColor={textColor ?? "#252525"}
          darkColor={textColor ?? "#FFFFFF"}
          style={[titleStyle, styles.optionTitle]}
        >
          {title}
        </ThemedText>
        <ThemedText
          lightColor="#9B9B9B"
          darkColor="#9B9B9B"
          style={styles.optionLabel}
        >
          {label}
        </ThemedText>
      </View>
    </View>

    {hasSwitch && (
      <Switch
        value={switchValue}
        onValueChange={onSwitchChange}
        trackColor={{ false: "#E5E5E5", true: "#34C759" }}
        thumbColor={switchValue ? "#FFFFFF" : "#FFFFFF"}
        ios_backgroundColor="#E5E5E5"
      />
    )}

    {hasChevron && (
      <Ionicons name="chevron-forward" size={18} color="#218DC9" />
    )}
  </TouchableOpacity>
);

const Profile = () => {
  const colorScheme = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#000000" : "#EEF3FB";
  const boxBg = colorScheme === "dark" ? "#161622" : "#FFFFFF";
  const router = useRouter();
  const { userData } = useFetchAuthUser();
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: backgroundColor }]}
    >
      <ScrollView>
        <View style={styles.container}>
          <Navigator title="Account" showBackIcon={true} />
          <View style={styles.avatarBox}>
            <View style={styles.avatarCon}>
              <Image source={images.avatar} style={styles.avatar} />
              <MaterialIcons
                name="edit"
                size={20}
                color="#161622"
                style={styles.icon}
              />
            </View>
          </View>

          <ThemedText
            lightColor="#252525"
            darkColor="#EEF3FB"
            style={styles.heading}
          >
            {userData?.firstname + " " + userData?.lastname || "John Doe"}
          </ThemedText>
          <View style={[styles.heroBox, { backgroundColor: boxBg }]}>
            <View>
              <ThemedText
                lightColor="#9B9B9B"
                darkColor="#FFFFFF"
                style={styles.title}
              >
                Username
              </ThemedText>
              <ThemedText
                lightColor="#252525"
                darkColor="#EEF3FB"
                style={styles.label}
              >
                {userData?.username || "johndoe123"}
              </ThemedText>
            </View>
            <MaterialIcons
              name="content-copy"
              size={20}
              color="#161622"
              style={styles.iconButton}
              onPress={() => console.log("Edit profile pressed")}
            />
          </View>

          <View>
            <Option
              title="Accounts"
              hasChevron
              onPress={() => router.push("/(user)/accounts")}
            />
            <Option
              title="Personal"
              hasChevron
              onPress={() => router.push("/(user)/personal")}
            />
            <Option
              title="Verification"
              hasChevron
              onPress={() => setIsBottomSheetVisible(true)}
              //onPress={() => console.log("Change VPay PIN pressed")}

              label="verify your identity"
            />
            <Option
              title={
                userData?.firstname + " " + userData?.lastname || "John Doe"
              }
              label="Account Name"
              hasChevron
              onPress={() => console.log("Change VPay PIN pressed")}
            />
            <Option
              title={"+" + userData?.phone || "0123456789"}
              label="Phone Number"
              hasChevron
              onPress={() => console.log("Change VPay PIN pressed")}
            />
            <Option
              title={userData?.email || "myemail@gmail.com"}
              label="Email Address"
              hasChevron
              onPress={() => console.log("Change VPay PIN pressed")}
            />
            {userData?.residential_address && (
              <Option
                title={userData?.residential_address}
                label="Address"
                hasChevron
                onPress={() => console.log("Change VPay PIN pressed")}
              />
            )}
            {userData?.marital_status && (
              <Option
                title={userData?.marital_status}
                label="Marital Status"
                hasChevron
                onPress={() => console.log("Change VPay PIN pressed")}
              />
            )}
            <Option
              title="Restrict Account"
              label="Stop transactions in emergency situations"
              textColor="#D92D20"
              hasChevron
              onPress={() => console.log("Change VPay PIN pressed")}
            />
            <Option
              title="Delete Account"
              label="Deactivate your Vpay account"
              textColor="#D92D20"
              hasChevron
              onPress={() => console.log("Change VPay PIN pressed")}
            />
          </View>
        </View>
        <VerificationBtmSheet
          isVisible={isBottomSheetVisible}
          onClose={() => setIsBottomSheetVisible(false)}
          title="Pay bills"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
