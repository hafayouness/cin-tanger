import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGetAllMovies } from "../servis/Movies/query";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    CarterOne: require("../assets/CarterOne-Regular.ttf"),
  });

  const { data, isLoading, isError } = useGetAllMovies();

  const movies = data?.data || [];

  if (!fontsLoaded) return null;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Ionicons name="film" size={60} color="#e50914" />
        <Text style={styles.loadingText}>Loading Movies...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Ionicons name="alert-circle" size={60} color="#e50914" />
        <Text style={styles.loadingText}>Error fetching movies</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Heureux de te revoir 👋</Text>
              <Text style={styles.username}>Siham </Text>
            </View>

            <TouchableOpacity style={styles.ticketBtn}>
              <Ionicons name="ticket" size={24} color="#e50914" />
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#e50914" />
            <TextInput
              placeholder="Search movies, cinemas..."
              placeholderTextColor="#666"
              style={styles.searchInput}
            />
            <TouchableOpacity>
              <Ionicons name="options" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Now Showing</Text>
            <Text style={styles.sectionSubtitle}>{movies.length} movies</Text>
          </View>
          <TouchableOpacity style={styles.seeAllBtn}>
            <Text style={styles.seeAll}>See All</Text>
            <Ionicons name="arrow-forward" size={16} color="#e50914" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
          contentContainerStyle={styles.moviesList}
          columnWrapperStyle={styles.moviesRow}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => router.push(`/movies/${item.id}`)}
            >
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.ratingBadgeText}>{item.rating}</Text>
                </View>

                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.8)"]}
                  style={styles.imageGradient}
                />
              </View>

              <View style={styles.cardContent}>
                <Text style={styles.cardName} numberOfLines={2}>
                  {item.title}
                </Text>

                <View style={styles.cardInfo}>
                  <Ionicons name="person" size={12} color="#999" />
                  <Text style={styles.cardDirector} numberOfLines={1}>
                    {item.director}
                  </Text>
                </View>

                <View style={styles.cardFooter}>
                  <View style={styles.typeContainer}>
                    <Ionicons name="film" size={10} color="#e50914" />
                    <Text style={styles.cardType}>{item.type}</Text>
                  </View>
                  <View style={styles.durationContainer}>
                    <Ionicons name="time" size={10} color="#999" />
                    <Text style={styles.duration}>{item.duration}min</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <View style={styles.bottomSpace} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0a",
  },

  loadingText: {
    color: "#fff",
    fontFamily: "CarterOne",
    fontSize: 16,
    marginTop: 16,
  },

  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 20,
    backgroundColor: "#120909",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  greeting: {
    color: "#999",
    fontSize: 14,
    fontFamily: "CarterOne",
    marginBottom: 4,
  },

  username: {
    color: "#fff",
    fontSize: 28,
    fontFamily: "CarterOne",
    letterSpacing: 0.5,
  },

  ticketBtn: {
    backgroundColor: "#1a1111",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#2a1a1a",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1111",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: "#2a1a1a",
    gap: 12,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontFamily: "CarterOne",
  },

  sectionHeader: {
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "CarterOne",
    letterSpacing: 0.5,
  },

  sectionSubtitle: {
    color: "#666",
    fontSize: 13,
    fontFamily: "CarterOne",
    marginTop: 4,
  },

  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1a1111",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2a1a1a",
  },

  seeAll: {
    color: "#e50914",
    fontSize: 14,
    fontFamily: "CarterOne",
  },

  moviesList: {
    paddingHorizontal: 16,
  },

  moviesRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#1a1111",
    width: "48%",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#2a1a1a",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  imageContainer: {
    position: "relative",
    width: "100%",
    height: 240,
  },

  cardImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#2a1a1a",
  },

  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },

  ratingBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.85)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFD700",
  },

  ratingBadgeText: {
    color: "#fff",
    fontFamily: "CarterOne",
    fontSize: 12,
    fontWeight: "bold",
  },

  cardContent: {
    padding: 12,
  },

  cardName: {
    fontFamily: "CarterOne",
    fontSize: 15,
    color: "#fff",
    marginBottom: 6,
    lineHeight: 20,
  },

  cardInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 10,
  },

  cardDirector: {
    fontFamily: "CarterOne",
    fontSize: 11,
    color: "#999",
    flex: 1,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#2a1a1a",
  },

  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    flex: 1,
  },

  cardType: {
    fontFamily: "CarterOne",
    fontSize: 9,
    color: "#e50914",
    textTransform: "uppercase",
  },

  durationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  duration: {
    fontFamily: "CarterOne",
    fontSize: 10,
    color: "#666",
  },

  bottomSpace: {
    height: 40,
  },
});
