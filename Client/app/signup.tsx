import { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useUserStore from "../Store/UserStore";
import { router } from "expo-router";

type ImageFile = {
  uri: string;
  name: string;
  type: string;
};

function Signup() {
  const [loading, setLoading] = useState(false);

  const [userDetails, setUserDetails] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    image: ImageFile | null;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const { signUp } = useUserStore();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    
    if (!result.canceled) {
      const asset = result.assets[0];

      const imageFile: ImageFile = {
        uri: asset.uri,
        name: `profile_${Date.now()}.jpg`,
        type: "image/jpeg",
      };

      setUserDetails((prev) => ({
        ...prev,
        image: imageFile,
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    const result = await signUp({
      name: userDetails.name,
      email: userDetails.email,
      password: userDetails.password,
      confirmPassword: userDetails.confirmPassword,
      image: userDetails.image as any,
    });

    if (result) {
      setUserDetails({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: null,
      });
      router.push("/auth");
    }

    setLoading(false);
  };


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Create Your Account</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          value={userDetails.name}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, name: text })
          }
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={userDetails.email}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, email: text })
          }
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={userDetails.password}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, password: text })
          }
        />

        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          style={styles.input}
          value={userDetails.confirmPassword}
          onChangeText={(text) =>
            setUserDetails({ ...userDetails, confirmPassword: text })
          }
        />

        {/* IMAGE PICKER */}
        <Pressable style={styles.imageBtn} onPress={pickImage}>
          <Text style={styles.imageBtnText}>Pick Profile Image</Text>
        </Pressable>

        {/* IMAGE PREVIEW */}
        {userDetails.image && (
          <Image
            source={{ uri: userDetails.image.uri }}
            style={styles.imagePreview}
          />
        )}

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 140,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },
  form: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  imageBtn: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  imageBtnText: {
    fontWeight: "600",
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginVertical: 10,
  },
  submitBtn: {
    backgroundColor: "#000",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontWeight: "700",
  },
});


export default Signup;
