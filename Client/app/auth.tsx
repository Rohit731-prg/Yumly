import {
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  View,
} from "react-native";
import useUserStore from "../Store/UserStore";
import { useState } from "react";
import { router } from "expo-router";

function Auth() {
  const [loading, setLoading] = useState(false);
  const { email, authentication } = useUserStore();

  const [otp, setOtp] = useState("");

  const handelSubmit = async () => {
    setLoading(true);
    await authentication(otp);
    setLoading(false);
    router.push("/login");
  }
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.card}>
        <Text style={styles.title}>Verification</Text>

        <Text style={styles.subtitle}>
          Enter the code we sent to
        </Text>

        <Text style={styles.email}>{email}</Text>

        <Text style={styles.label}>OTP Code</Text>

        <TextInput
          placeholder="Enter 4-digit OTP"
          placeholderTextColor="#999"
          style={styles.input}
          keyboardType="number-pad"
          maxLength={4}
          value={otp}
          onChangeText={(text) => setOtp(text)}
        />

        <Pressable
          onPress={handelSubmit}
          style={({ pressed }) => [
            styles.button,
            pressed && { opacity: 0.8 },
          ]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Verifying..." : "Verify"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    alignSelf: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },

  email: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    textAlign: "center",
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fafafa",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: 6,
  },

  button: {
    height: 52,
    borderRadius: 12,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Auth;
