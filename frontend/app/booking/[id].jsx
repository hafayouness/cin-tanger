import { Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react"
import { useFonts } from "expo-font";
import { useCreateBooking } from "../../servis/Bookings/query";
import { ActivityIndicator } from "react-native";

export default function BookingScreen() {
    const router = useRouter();
    const { sessionId, movieTitle, price } = useLocalSearchParams();

    const [fontsLoaded] = useFonts({
        CarterOne: require("../../assets/CarterOne-Regular.ttf"),
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [seats, setSeats] = useState("1");

    const { mutate, isLoading } = useCreateBooking();

    if (!fontsLoaded) return null;

    const totalPrice = Number(seats || 0) * Number(price || 0);

    const handleBooking = () => {
        mutate(
            {
                session_id: Number(sessionId),
                customer_name: name,
                customer_email: email,
                customer_phone: phone,
                number_of_seats: Number(seats),
                total_price: totalPrice,
            },
            {
                onSuccess: (data) => {
                    console.log("Booking success:", data);
                    router.back();
                },
                onError: (error) => {
                    console.log(
                        "Booking error:",
                        error.response?.data || error.message
                    );
                },
            }
        );
    };

    return (
        <>
            <StatusBar barStyle="light-content" />
            <ScrollView style={styles.container}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.title}>{movieTitle}</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full name"
                    placeholderTextColor="#777"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#777"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    placeholderTextColor="#777"
                    value={phone}
                    onChangeText={setPhone}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Seats"
                    placeholderTextColor="#777"
                    keyboardType="number-pad"
                    value={seats}
                    onChangeText={setSeats}
                />

                <Text style={styles.total}>Total: {totalPrice} MAD</Text>

                <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={handleBooking}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="ticket" size={20} color="#fff" />
                            <Text style={styles.bookText}>Confirm Booking</Text>
                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0a0a0a",
        padding: 20,
    },

    title: {
        fontSize: 26,
        color: "#fff",
        fontFamily: "CarterOne",
        marginVertical: 20,
    },

    subtitle: {
        color: "#999",
        fontFamily: "CarterOne",
        marginBottom: 30,
        fontSize: 14,
    },

    input: {
        backgroundColor: "#111",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 18,
        color: "#fff",
        fontFamily: "CarterOne",
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#222",
    },

    total: {
        color: "#fff",
        fontFamily: "CarterOne",
        fontSize: 18,
        marginVertical: 20,
        textAlign: "right",
    },

    bookBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: "#e50914",
        paddingVertical: 18,
        borderRadius: 18,
        marginTop: 10,
    },

    bookText: {
        color: "#fff",
        fontFamily: "CarterOne",
        fontSize: 16,
    },

    backBtn: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
    },

    divider: {
        height: 1,
        backgroundColor: "#222",
        marginVertical: 24,
    },

    priceBadge: {
        alignSelf: "flex-start",
        backgroundColor: "rgba(229,9,20,0.15)",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#e50914",
    },

    priceText: {
        color: "#e50914",
        fontFamily: "CarterOne",
        fontSize: 12,
    },

    errorText: {
        color: "#e50914",
        fontFamily: "CarterOne",
        marginTop: 10,
    },
});










