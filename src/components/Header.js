import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useTheme } from "../theme/ThemeProvider";
import IconButton from "./IconButton";

export default function Header({ navigation, route }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { theme, isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const getTitle = () => {
    if (route?.name) {
      return route.name;
    }
    return "UoM Courses";
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderBottomColor: theme.border },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <Feather name="book-open" size={24} color={theme.primary} />
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]}>
              {getTitle()}
            </Text>
            {user && (
              <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
                Welcome, {user.firstName || user.username}!
              </Text>
            )}
          </View>
        </View>

        <View style={styles.rightSection}>
          <IconButton
            icon={isDark ? "sun" : "moon"}
            onPress={toggleTheme}
            color={theme.text}
          />
          <IconButton
            icon="log-out"
            onPress={handleLogout}
            color={theme.error}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  titleContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: "row",
    gap: 8,
  },
});
