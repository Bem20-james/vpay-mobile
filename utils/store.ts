import AsyncStorage from "@react-native-async-storage/async-storage";

export interface StorageError {
  success: false;
  error: string;
}

export interface StorageSuccess<T = any> {
  success: true;
  data: T;
}

export type StorageResult<T = any> = StorageSuccess<T> | StorageError;

// Store data
export const storeData = async <T = any>(
  key: string,
  value: T
): Promise<StorageResult<null>> => {
  try {
    const serializedValue =
      typeof value === "string" ? value : JSON.stringify(value);
    await AsyncStorage.setItem(key, serializedValue);
    return { success: true, data: null };
  } catch (err) {
    console.error(`Error storing data for key "${key}":`, err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
};

// Get data
export const getData = async <T = any>(
  key: string
): Promise<StorageResult<T | null>> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return { success: true, data: null };
    }

    // Try to parse as JSON, fallback to string if parsing fails
    try {
      const parsedValue = JSON.parse(value);
      return { success: true, data: parsedValue };
    } catch (parseError) {
      // If JSON parsing fails, return the raw string value
      return { success: true, data: value as T };
    }
  } catch (err) {
    console.error(`Error retrieving data for key "${key}":`, err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
};

export const removeData = async (key: string): Promise<StorageResult<null>> => {
  try {
    await AsyncStorage.removeItem(key);
    return { success: true, data: null };
  } catch (err) {
    console.error(`Error removing data for key "${key}":`, err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
};

// Clear all storage data
export const clearAllData = async (): Promise<StorageResult<null>> => {
  try {
    await AsyncStorage.clear();
    return { success: true, data: null };
  } catch (err) {
    console.error("Error clearing all storage data:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err)
    };
  }
};
