import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import CourseCard from "../courses/CourseCard";
import { toggleFavourite } from "./favouritesSlice";
import { useTheme } from "../../theme/ThemeProvider";

export default function FavouritesScreen({ navigation }) {
  const { favourites } = useSelector((state) => state.favourites);
  const dispatch = useDispatch();
  const { theme } = useTheme();

  const handleCoursePress = (course) => {
    navigation.navigate("Courses", {
      screen: "CourseDetails",
      params: { courseId: course.id },
    });
  };

  const handleFavouritePress = (course) => {
    dispatch(toggleFavourite(course));
  };

  const renderCourseCard = ({ item }) => (
    <CourseCard
      course={item}
      onPress={() => handleCoursePress(item)}
      onFavouritePress={() => handleFavouritePress(item)}
      isFavourite={true}
    />
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={80} color={theme.textSecondary} />
      <Text style={[styles.emptyTitle, { color: theme.text }]}>
        No Favourites Yet
      </Text>
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        Start adding courses to your favourites to see them here
      </Text>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: theme.text }]}>
        My Favourites
      </Text>
      <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
        {favourites.length} {favourites.length === 1 ? "course" : "courses"}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={favourites}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={favourites.length > 0 ? renderHeader : null}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
