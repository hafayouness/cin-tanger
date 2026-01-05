import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { useGetMovieById } from "../../servis/Movies/query";

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const movieId = Number(id);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    CarterOne: require("../../assets/CarterOne-Regular.ttf"),
  });

  const { data: movie, isLoading, isError } = useGetMovieById(movieId);

  // 🔄 LOADING
  if (!fontsLoaded || isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  // ❌ ERROR
  if (isError || !movie) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Movie not found</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: movie.image }} style={styles.image} />

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.95)"]}
            style={styles.gradient}
          />

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{movie.rating}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>

          <View style={styles.metaRow}>
            <Ionicons name="person" size={14} color="#999" />
            <Text style={styles.metaText}>{movie.director}</Text>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={14} color="#999" />
              <Text style={styles.infoText}>{movie.duration} min</Text>
            </View>
          </View>

          <Text style={styles.description}>{movie.description}</Text>

          <TouchableOpacity
            style={styles.bookBtn}
            onPress={() =>
              router.push({
                pathname: `/booking/${movie.id}`,
                params: {
                  sessionId: movie.session_id ?? movie.id,
                  movieTitle: movie.title,
                  price: movie.price ?? 50,
                },
              })
            }
          >
            <Ionicons name="ticket" size={20} color="#fff" />
            <Text style={styles.bookText}>Book Ticket</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },
  errorText: { color: "#fff", fontFamily: "CarterOne", fontSize: 16 },
  imageContainer: { height: 420, position: "relative" },
  image: { width: "100%", height: "100%" },
  gradient: { position: "absolute", bottom: 0, left: 0, right: 0, height: 200 },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 14,
  },
  ratingBadge: {
    position: "absolute",
    top: 50,
    right: 16,
    flexDirection: "row",
    gap: 6,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  ratingText: { color: "#fff", fontFamily: "CarterOne" },
  content: { padding: 20, marginTop: -40 },
  title: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "CarterOne",
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 12,
  },
  metaText: { color: "#999", fontFamily: "CarterOne", fontSize: 13 },
  infoRow: { flexDirection: "row", marginBottom: 20 },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  infoText: { color: "#999", fontFamily: "CarterOne" },
  description: {
    color: "#ccc",
    fontFamily: "CarterOne",
    lineHeight: 22,
    marginBottom: 30,
  },
  bookBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#e50914",
    paddingVertical: 16,
    borderRadius: 18,
  },
  bookText: { color: "#fff", fontFamily: "CarterOne", fontSize: 16 },
});
