import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { fetchCourseDetails, clearCurrentCourse } from "./courseSlice";
import { toggleFavourite } from "../favourites/favouritesSlice";
import { useTheme } from "../../theme/ThemeProvider";

const { width } = Dimensions.get("window");

export default function CourseDetailsScreen({ route, navigation }) {
  const { courseId } = route.params;
  const dispatch = useDispatch();
  const { currentCourse, loading } = useSelector((state) => state.courses);
  const { favourites } = useSelector((state) => state.favourites);
  const { theme } = useTheme();

  const isFavourite = currentCourse
    ? favourites.some((fav) => fav.id === currentCourse.id)
    : false;

  useEffect(() => {
    dispatch(fetchCourseDetails(courseId));

    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [courseId]);

  const handleFavouritePress = () => {
    if (currentCourse) {
      dispatch(toggleFavourite(currentCourse));
    }
  };

  if (loading || !currentCourse) {
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
      <ScrollView>
        <Image
          source={{ uri: currentCourse.image }}
          style={styles.headerImage}
        />

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.favouriteButton}
          onPress={handleFavouritePress}
        >
          <Feather
            name="heart"
            size={24}
            color={isFavourite ? "#FF4444" : "#fff"}
            fill={isFavourite ? "#FF4444" : "transparent"}
          />
        </TouchableOpacity>

        <View style={[styles.content, { backgroundColor: theme.background }]}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: theme.text }]}>
              {currentCourse.title}
            </Text>
            <View style={styles.ratingContainer}>
              <Feather name="star" size={20} color="#FFD700" />
              <Text style={[styles.rating, { color: theme.text }]}>
                {currentCourse.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Feather name="user" size={18} color={theme.primary} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {currentCourse.instructor}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="clock" size={18} color={theme.primary} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {currentCourse.duration}
              </Text>
            </View>
            <View style={styles.metaItem}>
              <Feather name="tag" size={18} color={theme.primary} />
              <Text style={[styles.metaText, { color: theme.textSecondary }]}>
                {currentCourse.category}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              About This Course
            </Text>
            <Text style={[styles.description, { color: theme.textSecondary }]}>
              {currentCourse.description}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Course Details
            </Text>
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.textSecondary }]}
              >
                Status:
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {currentCourse.status}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.textSecondary }]}
              >
                Duration:
              </Text>
              <Text style={[styles.detailValue, { color: theme.text }]}>
                {currentCourse.duration}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.textSecondary }]}
              >
                Price:
              </Text>
              <Text style={[styles.detailValue, { color: theme.primary }]}>
                ${currentCourse.price}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.enrollButton, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.enrollButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  headerImage: {
    width: width,
    height: 300,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  favouriteButton: {
    position: "absolute",
    top: 50,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rating: {
    fontSize: 18,
    fontWeight: "600",
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 15,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: "600",
  },
  enrollButton: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  enrollButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
