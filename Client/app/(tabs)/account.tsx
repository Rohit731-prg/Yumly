import { ScrollView, Image, StyleSheet, View, Text, Pressable, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../../Store/UserStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";

function Account() {
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModel] = useState<boolean>(false);
  const { user, updatePassword } = useUserStore();
  const [newPassword, setNewPassword] = useState<string>("");

  const logout = async () => {
    alert("Logging out...");
    await AsyncStorage.removeItem("token");
    router.replace("/login");
  };

  const handelPasswordChange = async () => {
    setLoading(true);
    await updatePassword(newPassword);
    setNewPassword("");
    setLoading(false);
    setIsModel(false);
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

      <Pressable style={styles.button} onPress={() => setIsModel(true)}>
        <Ionicons name="key-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Change Password</Text>
      </Pressable>

      <Pressable style={[styles.button, styles.logoutButton]} onPress={logout} >
        <Ionicons name="log-out-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>

      <Modal
        visible={isModal}
        animationType="fade"
        transparent
        onRequestClose={() => setIsModel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Password</Text>

            <TextInput
              placeholder="Enter new password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />

            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelBtn]}
                onPress={() => setIsModel(false)}
              >
                <Text style={styles.modalBtnText}>Cancel</Text>
              </Pressable>

              <Pressable
                style={[styles.modalButton, styles.saveBtn]}
                onPress={handelPasswordChange}
              >
                <Text style={styles.modalBtnText}>{loading ? "Saving..." : "Save"}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#111",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalButton: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelBtn: {
    backgroundColor: "#ccc",
    marginRight: 10,
  },

  saveBtn: {
    backgroundColor: "#2196f3",
  },

  modalBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

});

export default Account;
