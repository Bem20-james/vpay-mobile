import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const serializedValue = typeof value === 'string' ? value : JSON.stringify(value);
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
export const getData = async <T = any>(key: string): Promise<StorageResult<T | null>> => {
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
    console.error('Error clearing all storage data:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : String(err) 
    };
  }
};

// Get multiple items at once
export const getMultipleData = async (keys: string[]): Promise<StorageResult<Record<string, any>>> => {
  try {
    const keyValuePairs = await AsyncStorage.multiGet(keys);
    const result: Record<string, any> = {};
    
    keyValuePairs.forEach(([key, value]) => {
      if (value !== null) {
        try {
          result[key] = JSON.parse(value);
        } catch {
          result[key] = value;
        }
      } else {
        result[key] = null;
      }
    });
    
    return { success: true, data: result };
  } catch (err) {
    console.error('Error retrieving multiple data items:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : String(err) 
    };
  }
};

// Store multiple items at once
export const storeMultipleData = async (
  items: Array<[string, any]>
): Promise<StorageResult<null>> => {
  try {
    const serializedItems = items.map(([key, value]) => [
      key,
      typeof value === 'string' ? value : JSON.stringify(value)
    ]);
    
    await AsyncStorage.multiSet(serializedItems);
    return { success: true, data: null };
  } catch (err) {
    console.error('Error storing multiple data items:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : String(err) 
    };
  }
};

// Get all keys in storage
export const getAllKeys = async (): Promise<StorageResult<string[]>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return { success: true, data: keys };
  } catch (err) {
    console.error('Error getting all storage keys:', err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : String(err) 
    };
  }
};

// Check if a key exists in storage
export const hasKey = async (key: string): Promise<StorageResult<boolean>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return { success: true, data: keys.includes(key) };
  } catch (err) {
    console.error(`Error checking if key "${key}" exists:`, err);
    return { 
      success: false, 
      error: err instanceof Error ? err.message : String(err) 
    };
  }
};

// Legacy functions for backward compatibility (these throw errors instead of returning results)
export const storeDataLegacy = async (key: string, value: string | object) => {
  const result = await storeData(key, value);
  if (!result.success) {
    throw new Error(result.error);
  }
};

export const getDataLegacy = async (key: string) => {
  const result = await getData(key);
  if (!result.success) {
    throw new Error(result.error);
  }
  return result.data;
};

export const removeDataLegacy = async (key: string) => {
  const result = await removeData(key);
  if (!result.success) {
    throw new Error(result.error);
  }
};