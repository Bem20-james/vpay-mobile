import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, value: string) {
  await SecureStore.setItemAsync(key, value, {
    keychainService: "authTokens",
  });
}

export async function getToken(key: string): Promise<string | null> {
  return await SecureStore.getItemAsync(key, {
    keychainService: "authTokens",
  });
}

export async function deleteToken(key: string) {
  await SecureStore.deleteItemAsync(key, {
    keychainService: "authTokens",
  });
}
