import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Navigator from "@/components/Navigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemedText } from "@/components/ThemedText";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormFields";
import { KycStyles as styles } from "@/styles/kyc";
import { Colors } from "@/constants/Colors";
import { useUser } from "@/contexts/UserContexts";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

type PersonalInfoProps = {
  onBack: () => void;
};

const PersonalInfo = ({ onBack }: PersonalInfoProps) => {
  const colorScheme = useColorScheme();
  const backgroundColor =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const statusBarBg =
    colorScheme === "dark" ? Colors.dark.background : Colors.light.background;
  const router = useRouter();

  const { user } = useUser();

  const [form, setForm] = useState({
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    gender: "",
    marital_status: "",
    occupation: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    postal_code: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = format(selectedDate, "yyyy-MM-dd");
      setForm({ ...form, dob: formatted });
    }
  };

  const isFormValid = Object.values(form).every((value) => value.trim() !== "");

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Navigator title="Personal Information" onBack={onBack} />
        <View style={styles.container}>
          <ThemedText
            lightColor="#9B9B9B"
            darkColor="#9B9B9B"
            style={styles.heroTxt}
          >
            We need these information to ensure a seamless service for you
          </ThemedText>

          <FormField
            placeholder="Email Address"
            value={form.email}
            handleChangeText={(value) => setForm({ ...form, email: value })}
            otherStyles={{ marginTop: 5 }}
            editable={form.email === ""}
          />

          <View style={{ flexDirection: "row", gap: 5 }}>
            <FormField
              placeholder="First Name"
              value={form.firstname}
              handleChangeText={(value) =>
                setForm({ ...form, firstname: value })
              }
              otherStyles={{ width: "50%" }}
              editable={form.firstname === ""}
            />
            <FormField
              placeholder="Last Name"
              value={form.lastname}
              handleChangeText={(value) =>
                setForm({ ...form, lastname: value })
              }
              otherStyles={{ width: "50%" }}
              editable={form.lastname === ""}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 5 }}>
            <FormField
              placeholder="Phone Number"
              value={form.phone}
              handleChangeText={(value) => setForm({ ...form, phone: value })}
              otherStyles={{ width: "50%" }}
              editable={form.phone === ""}
            />
            <FormField
              placeholder="Gender"
              value={form.gender}
              handleChangeText={(value) => setForm({ ...form, gender: value })}
              otherStyles={{ width: "50%" }}
            />
          </View>

          <View style={{ flexDirection: "row", gap: 5 }}>
            <FormField
              placeholder="Marital Status"
              value={form.marital_status}
              handleChangeText={(value) =>
                setForm({ ...form, marital_status: value })
              }
              otherStyles={{ width: "50%" }}
            />
            <FormField
              placeholder="Occupation"
              value={form.occupation}
              handleChangeText={(value) =>
                setForm({ ...form, occupation: value })
              }
              otherStyles={{ width: "50%" }}
            />
          </View>

          {/* DOB Field */}
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <FormField
              placeholder="DOB"
              value={form.dob}
              handleChangeText={() => {}}
              editable={false}
              otherStyles={{ marginTop: 5 }}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              value={form.dob ? new Date(form.dob) : new Date()}
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}

          <FormField
            placeholder="Country"
            value={form.country}
            handleChangeText={(value) => setForm({ ...form, country: value })}
            otherStyles={{ marginTop: 5 }}
          />
          <FormField
            placeholder="State"
            value={form.state}
            handleChangeText={(value) => setForm({ ...form, state: value })}
            otherStyles={{ marginTop: 5 }}
          />
          <FormField
            placeholder="City"
            value={form.city}
            handleChangeText={(value) => setForm({ ...form, city: value })}
            otherStyles={{ marginTop: 5 }}
          />
          <FormField
            placeholder="Postal Code"
            value={form.postal_code}
            handleChangeText={(value) =>
              setForm({ ...form, postal_code: value })
            }
            otherStyles={{ marginTop: 5 }}
            keyboardType="numeric"
          />
        </View>

        {/* Submit Button */}
        <View style={{ padding: 10 }}>
          <CustomButton
            title="Submit"
            handlePress={() => router.push("/(tabs)/home")}
            btnStyles={{ width: "100%" }}
            disabled={!isFormValid}
          />
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor={statusBarBg} />
    </SafeAreaView>
  );
};

export default PersonalInfo;
