import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { fetchCourses, searchCourses, setSearchQuery } from "./courseSlice";
import { toggleFavourite } from "../favourites/favouritesSlice";
import CourseCard from "./CourseCard";
import { useTheme } from "../../theme/ThemeProvider";

export default function CourseListScreen({ navigation }) {
  const dispatch = useDispatch();
  const { courses, loading, searchQuery } = useSelector(
    (state) => state.courses
  );
  const { favourites } = useSelector((state) => state.favourites);
  const { theme } = useTheme();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  const handleSearch = (text) => {
    dispatch(setSearchQuery(text));
    if (text.length > 2) {
      dispatch(searchCourses(text));
    } else if (text.length === 0) {
      dispatch(fetchCourses());
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchCourses());
    setRefreshing(false);
  };

  const handleCoursePress = (course) => {
    navigation.navigate("CourseDetails", { courseId: course.id });
  };

  const handleFavouritePress = (course) => {
    dispatch(toggleFavourite(course));
  };

  const isFavourite = (courseId) => {
    return favourites.some((fav) => fav.id === courseId);
  };

  const renderCourseCard = ({ item }) => (
    <CourseCard
      course={item}
      onPress={() => handleCoursePress(item)}
      onFavouritePress={() => handleFavouritePress(item)}
      isFavourite={isFavourite(item.id)}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: theme.text }]}>
        Discover Courses
      </Text>
      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <Feather name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search courses..."
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <Feather
            name="x"
            size={20}
            color={theme.textSecondary}
            onPress={() => handleSearch("")}
          />
        )}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="book" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        No courses found
      </Text>
    </View>
  );

  if (loading && !refreshing && courses.length === 0) {
    return (
      <View
        style={[styles.centerContainer, { backgroundColor: theme.background }]}
      >
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={courses}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.primary]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
});
