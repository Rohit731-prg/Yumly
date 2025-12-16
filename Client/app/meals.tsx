import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";
import useCategoryStore from "../Store/CategoryStore";
import { router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import useRecipeStore from "../Store/RecipeStore";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

function Meals() {
  const { category } = useCategoryStore();
  const { getAllRecipeByCategory, recipes, setRecipe } = useRecipeStore();

  const fetchData = async () => {
    await getAllRecipeByCategory();
  };

  const setRecipeFun = async (item: any) => {
    await setRecipe(item);
    router.push("/meal");
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={() => router.push("/home")} style={styles.back}>
            <Feather name="arrow-left" size={22} color="#111827" />
          </Pressable>

          <Text style={styles.headerText}>{category?.strCategory}</Text>
        </View>

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
          {recipes?.map((item) => (
            <Pressable
              key={item.idMeal}
              style={styles.card}
              onPress={() => setRecipeFun(item)}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />

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

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
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

export default Meals;
