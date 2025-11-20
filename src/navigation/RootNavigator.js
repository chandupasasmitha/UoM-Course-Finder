import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../features/auth/authSlice";
import { loadFavourites } from "../features/favourites/favouritesSlice";

import AuthStack from "../features/auth/AuthStack";
import CourseListScreen from "../features/courses/CourseListScreen";
import CourseDetailsScreen from "../features/courses/CourseDetailsScreen";
import FavouritesScreen from "../features/favourites/FavouritesScreen";
import Header from "../components/Header";
import { useTheme } from "../theme/ThemeProvider";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function CoursesStack() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <Header {...props} />,
      }}
    >
      <Stack.Screen
        name="CourseList"
        component={CourseListScreen}
        options={{ title: "Courses" }}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetailsScreen}
        options={{ title: "Course Details", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Courses") {
            iconName = "book-open";
          } else if (route.name === "Favourites") {
            iconName = "heart";
          }

          return <Feather name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Courses" component={CoursesStack} />
      <Tab.Screen
        name="Favourites"
        component={FavouritesScreen}
        options={{
          headerShown: true,
          header: (props) => <Header {...props} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, isCheckingAuth } = useSelector(
    (state) => state.auth
  );
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(checkAuth());
    dispatch(loadFavourites());
  }, []);

  if (isCheckingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
