import {
    ScrollView,
    Text,
    StyleSheet,
    View,
    TextInput,
    Pressable,
} from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useState } from "react";
import useUserStore from "../Store/UserStore";
import { router } from "expo-router";

function Login() {
    const { login } = useUserStore();
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: "",
        password: "",
    });

    const handleLogin = async () => {
        setLoading(true);
        const result = await login(userDetails);
        if (result) {
            setLoading(false);
            setUserDetails({ email: "", password: "" });
            router.push("/(tabs)/home");
        } else {
            setLoading(false);
            alert("Login Failed");
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Welcome Back 👋</Text>
                <Text style={styles.subtitle}>
                    Login to continue exploring recipes
                </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                {/* Email */}
                <View style={styles.inputWrapper}>
                    <EvilIcons name="envelope" size={24} color="#777" />
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#999"
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={userDetails.email}
                        onChangeText={(text) =>
                            setUserDetails({ ...userDetails, email: text })
                        }
                    />
                </View>

                {/* Password */}
                <View style={styles.inputWrapper}>
                    <EvilIcons name="lock" size={24} color="#777" />
                    <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor="#999"
                        style={styles.input}
                        secureTextEntry
                        value={userDetails.password}
                        onChangeText={(text) =>
                            setUserDetails({ ...userDetails, password: text })
                        }
                    />
                </View>

                {/* Forgot password */}
                <Text style={styles.forgot}>Forgot password?</Text>

                {/* Login Button */}
                <Pressable style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>{loading ? "Loading..." : "Login"}</Text>
                </Pressable>

                {/* Footer */}
                <Text style={styles.footerText}>
                    Don’t have an account?{" "}
                    <Text
                        style={styles.link}
                        onPress={() => router.push("/signup")}
                    >
                        Sign up
                    </Text>
                </Text>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 6,
    },
    form: {
        gap: 18,
    },
    inputWrapper: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 52,
        backgroundColor: "#fafafa",
    },
    input: {
        flex: 1,
        marginLeft: 8,
        fontSize: 15,
        color: "#111",
    },
    forgot: {
        textAlign: "right",
        fontSize: 13,
        color: "#555",
    },
    button: {
        backgroundColor: "#111",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    footerText: {
        textAlign: "center",
        marginTop: 20,
        color: "#666",
    },
    link: {
        color: "#111",
        fontWeight: "600",
    },
});

export default Login;
