import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  AUTH_DATA: "@auth_data",
  FAVOURITES: "@favourites",
  THEME_PREFERENCE: "@theme_preference",
};

// Auth Data
export const saveAuthData = async (authData) => {
  try {
    const jsonValue = JSON.stringify({
      user: {
        id: authData.id,
        username: authData.username,
        email: authData.email,
        firstName: authData.firstName,
        lastName: authData.lastName,
        image: authData.image,
      },
      token: authData.token,
    });
    await AsyncStorage.setItem(KEYS.AUTH_DATA, jsonValue);
  } catch (error) {
    console.error("Error saving auth data:", error);
  }
};

export const getAuthData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.AUTH_DATA);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error getting auth data:", error);
    return null;
  }
};

export const removeAuthData = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.AUTH_DATA);
  } catch (error) {
    console.error("Error removing auth data:", error);
  }
};

// Favourites
export const saveFavourites = async (favourites) => {
  try {
    const jsonValue = JSON.stringify(favourites);
    await AsyncStorage.setItem(KEYS.FAVOURITES, jsonValue);
  } catch (error) {
    console.error("Error saving favourites:", error);
  }
};

export const getFavourites = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(KEYS.FAVOURITES);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error getting favourites:", error);
    return [];
  }
};

// Theme Preference
export const saveThemePreference = async (isDark) => {
  try {
    await AsyncStorage.setItem(KEYS.THEME_PREFERENCE, JSON.stringify(isDark));
  } catch (error) {
    console.error("Error saving theme preference:", error);
  }
};

export const getThemePreference = async () => {
  try {
    const value = await AsyncStorage.getItem(KEYS.THEME_PREFERENCE);
    return value != null ? JSON.parse(value) : false;
  } catch (error) {
    console.error("Error getting theme preference:", error);
    return false;
  }
};
