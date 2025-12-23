import { ScrollView, Image, StyleSheet, View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../../Store/UserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

function Account() {
  const { user } = useUserStore();

  const logout = async () => {
    alert("Logging out...");
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Image */}
      <Image
        source={{
          uri: user?.imageURL || "https://via.placeholder.com/350x350.png?text=User+Image",
        }}
        style={styles.image}
      />

      {/* User Info Card */}
      <View style={styles.card}>
        <Text style={styles.name}>{user?.name || "No Name"}</Text>
        <Text style={styles.email}>{user?.email || "No Email"}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Details */}
        <View style={styles.row}>
          <Ionicons name="checkmark-circle-outline" size={20} color="#4caf50" />
          <Text style={styles.detail}>
            Authenticated: {user?.auth ? "Yes" : "No"}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={20} color="#2196f3" />
          <Text style={styles.detail}>
            Joined: {user?.createdAt?.slice(0, 10) || "N/A"}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons name="time-outline" size={20} color="#ff9800" />
          <Text style={styles.detail}>
            Last Updated: {user?.updatedAt?.slice(0, 10) || "N/A"}
          </Text>
        </View>
      </View>

      {/* Buttons */}

      {/* <Pressable style={styles.button}>
        <Ionicons name="image-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Change Profile Image</Text>
      </Pressable> */}

      <Pressable style={styles.button}>
        <Ionicons name="key-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Change Password</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.logoutButton]} onPress={logout} >
        <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f7",
  },
  image: {
    width: "100%",
    height: 300,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    resizeMode: "cover",
  },
  card: {
    padding: 20,
    marginTop: -40, // overlap image slightly
    backgroundColor: "white",
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#111",
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  detail: {
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  button: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 16,
    width: "90%",
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196f3",
    alignSelf: "center",
  },
  logoutButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Account;
