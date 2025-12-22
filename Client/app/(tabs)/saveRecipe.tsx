import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { router } from "expo-router";
import useRecipeStore from "../../Store/RecipeStore";
import useSaveRecipeStore from "../../Store/SaveRecipeStore";
import Feather from "@expo/vector-icons/Feather";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

function saveRecipe() {
  const { saveRecipes, getSaveRecipe } = useSaveRecipeStore();
  const { setRecipe } = useRecipeStore();
  const setRecipeFun = async (item: any) => {
    await setRecipe(item);
    router.push("/meal");
  };

  useFocusEffect(
    useCallback(() => {
      getSaveRecipe();

      return () => {
        // optional cleanup when screen loses focus
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerText}>Get Foods easily with saved files</Text>

        {/* Search */}
        <View style={styles.searchBox}>
          <EvilIcons name="search" size={22} color="#6B7280" />
          <TextInput
            placeholder="Search recipes"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* List */}
        <View style={styles.list}>
          {saveRecipes &&
            saveRecipes?.map((item) => (
              <Pressable
                key={item.idMeal}
                style={styles.card}
                onPress={() => setRecipeFun(item)}
              >
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={styles.image}
                />

                <View style={styles.cardContent}>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.strMeal}
                  </Text>
                </View>

                <Feather name="chevron-right" size={22} color="#9CA3AF" />
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    padding: 20,
    backgroundColor: "#FFFFFF",
  },
  back: {
    padding: 8,
    borderRadius: 999,
    backgroundColor: "#F3F4F6",
    marginRight: 12,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
    marginTop: 10,
  },

  searchInput: {
    marginLeft: 8,
    fontSize: 15,
    color: "#111827",
    flex: 1,
  },

  list: {
    gap: 12,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  image: {
    width: 90,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});

export default saveRecipe;
