import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { register } from "./authSlice";
import { useTheme } from "../../theme/ThemeProvider";
import { validateRegister } from "../../utils/validators";

export default function RegisterScreen({ navigation }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleRegister = async () => {
    try {
      // Validate inputs
      await validateRegister(formData);
      setErrors({});

      // Mock registration - in production, this would call an API
      dispatch(
        register({
          id: Math.random().toString(),
          username: formData.username,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
        })
      );

      Alert.alert("Success", "Registration successful!", [
        { text: "OK", onPress: () => navigation.replace("Login") },
      ]);
    } catch (validationError) {
      if (validationError.inner) {
        const validationErrors = {};
        validationError.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Feather name="user-plus" size={64} color={theme.primary} />
          <Text style={[styles.title, { color: theme.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Join UoM Course Finder
          </Text>
        </View>

        <View style={styles.form}>
          {/* First Name */}
          <View style={styles.inputContainer}>
            <Feather
              name="user"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.firstName ? theme.error : theme.border,
                },
              ]}
              placeholder="First Name"
              placeholderTextColor={theme.textSecondary}
              value={formData.firstName}
              onChangeText={(value) => updateFormData("firstName", value)}
            />
          </View>
          {errors.firstName && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors.firstName}
            </Text>
          )}

          {/* Last Name */}
          <View style={styles.inputContainer}>
            <Feather
              name="user"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.lastName ? theme.error : theme.border,
                },
              ]}
              placeholder="Last Name"
              placeholderTextColor={theme.textSecondary}
              value={formData.lastName}
              onChangeText={(value) => updateFormData("lastName", value)}
            />
          </View>
          {errors.lastName && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors.lastName}
            </Text>
          )}

          {/* Email */}
          <View style={styles.inputContainer}>
            <Feather
              name="mail"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.email ? theme.error : theme.border,
                },
              ]}
              placeholder="Email"
              placeholderTextColor={theme.textSecondary}
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors.email}
            </Text>
          )}

          {/* Username */}
          <View style={styles.inputContainer}>
            <Feather
              name="at-sign"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.username ? theme.error : theme.border,
                },
              ]}
              placeholder="Username"
              placeholderTextColor={theme.textSecondary}
              value={formData.username}
              onChangeText={(value) => updateFormData("username", value)}
              autoCapitalize="none"
            />
          </View>
          {errors.username && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors.username}
            </Text>
          )}

          {/* Password */}
          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.password ? theme.error : theme.border,
                },
              ]}
              placeholder="Password"
              placeholderTextColor={theme.textSecondary}
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors.password}
            </Text>
          )}

          {/* Confirm Password */}
          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={20}
              color={theme.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.confirmPassword
                    ? theme.error
                    : theme.border,
                },
              ]}
              placeholder="Confirm Password"
              placeholderTextColor={theme.textSecondary}
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
              secureTextEntry={!showPassword}
            />
          </View>
          {errors.confirmPassword && (
            <Text style={[styles.errorText, { color: theme.error }]}>
              {errors.confirmPassword}
            </Text>
          )}

          <TouchableOpacity
            style={[styles.registerButton, { backgroundColor: theme.primary }]}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={[styles.loginText, { color: theme.primary }]}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    position: "relative",
    marginBottom: 8,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    top: 16,
    zIndex: 1,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 48,
    paddingRight: 48,
    fontSize: 16,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  errorText: {
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  registerButton: {
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  loginText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
  },
});
