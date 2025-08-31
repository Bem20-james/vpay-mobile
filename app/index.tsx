// app/index.tsx

import { useEffect, useState } from "react";
import { getData } from "@/utils/store";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.clear();

    const redirect = async () => {
      const hasOnboarded = await getData("hasOnboarded");

      if (hasOnboarded) {
        router.replace("/(auth)/login-index");
      } else {
        router.replace("/onboarding");
      }

      setLoading(false);
    };

    redirect();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
