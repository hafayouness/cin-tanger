import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useGetAllMovies } from "../servis/Movies/query";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { instance } from "../servis/instance";

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    CarterOne: require("../assets/CarterOne-Regular.ttf"),
  });

  const { data, isLoading, isError, error } = useGetAllMovies();



  useEffect(() => {
    instance.get("/movies")
      .then(res => console.log("Movies Data 👉", res.data))
      .catch(err => console.log("Error 👉", err.message));
  }, []);
 

  if (!fontsLoaded) return null;

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Error fetching movies</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good evening</Text>
          <Text style={styles.username}>Movie Lover</Text>
        </View>

        <TouchableOpacity style={styles.ticketBtn}>
          <Ionicons name="ticket-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#999" />
        <TextInput
          placeholder="Search movies, cinemas..."
          placeholderTextColor="#777"
          style={styles.searchInput}
        />
      </View>

      {/* Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Now Showing</Text>
        <Text style={styles.seeAll}>See All</Text>
      </View>

      {/* Movies */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.cardImage} />
            )}
            <Text style={styles.cardName}>{item.title}</Text>
            <Text style={styles.cardJob}>{item.director}</Text>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#120909",
    paddingHorizontal: 16,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#120909",
  },

  loadingText: {
    color: "#fff",
    fontFamily: "CarterOne",
    fontSize: 16,
  },

  header: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    color: "#999",
    fontSize: 13,
    fontFamily: "CarterOne",
  },

  username: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "CarterOne",
  },

  ticketBtn: {
    backgroundColor: "#1f1414",
    padding: 10,
    borderRadius: 14,
  },

  searchBox: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1f1414",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  searchInput: {
    flex: 1,
    color: "#fff",
    marginLeft: 10,
    fontSize: 14,
  },

  sectionHeader: {
    marginTop: 28,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "CarterOne",
  },

  seeAll: {
    color: "#e50914",
    fontSize: 14,
    fontFamily: "CarterOne",
  },

  card: {
    backgroundColor: "#fff",
    width: "48%",
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },

  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },

  cardName: {
    fontFamily: "CarterOne",
    fontSize: 16,
    textAlign: "center",
  },

  cardJob: {
    fontFamily: "CarterOne",
    fontSize: 13,
    color: "#555",
    marginTop: 4,
  },
});
