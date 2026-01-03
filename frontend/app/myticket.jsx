import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useMyBookingStore from "../store/myBooking-store.js"; 
import { useRouter } from "expo-router";

export default function MyBookingsScreen() {
  const router = useRouter();

  const {
    bookings,
    isLoading,
    isError,
    fetchBookings,
    deleteBooking,
  } = useMyBookingStore();

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = (id) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this booking?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: () => deleteBooking(id),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e50914" />
        <Text style={styles.loadingText}>Loading bookings...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error loading bookings</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.push("/home")} 
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.username}>My Bookings</Text>
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardName}>
              {item.session?.movie?.title || "Movie"}
            </Text>
            <Text style={styles.cardInfo}>
              {item.session?.date} • {item.session?.time} • {item.session?.salle?.name}
            </Text>
            <Text style={styles.cardSeats}>{item.number_of_seats} seats</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash-outline" size={22} color="#e50914" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: "#666" }}>No bookings yet</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { color: "#fff", marginTop: 12 },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#120909",
  },
  backBtn: {
    padding: 8,
    marginRight: 16,
  },
  username: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#1a1111",
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardName: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  cardInfo: { color: "#999", fontSize: 12, marginBottom: 6 },
  cardSeats: { color: "#e50914", fontSize: 12, marginBottom: 6 },
});
