import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "../../theme/ThemeProvider";

export default function CourseCard({
  course,
  onPress,
  onFavouritePress,
  isFavourite,
}) {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#4CAF50";
      case "Upcoming":
        return "#FF9800";
      case "Popular":
        return "#2196F3";
      case "New":
        return "#9C27B0";
      default:
        return theme.textSecondary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: course.image }} style={styles.image} />

      <TouchableOpacity
        style={styles.favouriteButton}
        onPress={onFavouritePress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Feather
          name={isFavourite ? "heart" : "heart"}
          size={22}
          color={isFavourite ? "#FF4444" : "#fff"}
          fill={isFavourite ? "#FF4444" : "transparent"}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {course.title}
          </Text>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(course.status) },
            ]}
          >
            <Text style={styles.statusText}>{course.status}</Text>
          </View>
        </View>

        <Text
          style={[styles.description, { color: theme.textSecondary }]}
          numberOfLines={2}
        >
          {course.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.infoItem}>
            <Feather name="user" size={14} color={theme.textSecondary} />
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              {course.instructor}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Feather name="clock" size={14} color={theme.textSecondary} />
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              {course.duration}
            </Text>
          </View>
        </View>

        <View style={styles.ratingContainer}>
          <Feather name="star" size={16} color="#FFD700" />
          <Text style={[styles.rating, { color: theme.text }]}>
            {course.rating.toFixed(1)}
          </Text>
          <Text style={[styles.category, { color: theme.textSecondary }]}>
            • {course.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  favouriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 8,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoText: {
    fontSize: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
  },
  category: {
    fontSize: 12,
  },
});
