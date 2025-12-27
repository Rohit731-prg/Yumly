import { useEffect, useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";

import useCategoryStore from "../../Store/CategoryStore";
import useUserStore from "../../Store/UserStore";
import useRecipeStore from "../../Store/RecipeStore";
import useSaveRecipeStore from "../../Store/SaveRecipeStore";

type CategorySet = {
  idCategory: string;
  strCategoryThumb: string;
  strCategory: string;
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState<string>("Indian");
  const [name, setName] = useState<string>("");
  const { user } = useUserStore();
  const { categories, getAllCategory, setCategory } = useCategoryStore();
  const {
    getCountryName,
    getRecipeByCountry,
    recipes,
    countryList,
    getRecipeByName,
    setRecipe,
  } = useRecipeStore();
  const { saveRecipes, getSaveRecipe } = useSaveRecipeStore();

  // Initial fetch
  useEffect(() => {
    getAllCategory();
    getCountryName();
    getSaveRecipe();
  }, []);

  // Fetch recipes when country changes
  useEffect(() => {
    getRecipeByCountry(country);
  }, [country]);

  const navigateMeals = useCallback(
    (cate: CategorySet) => {
      setCategory(cate);
      router.push("/meals");
    },
    [setCategory]
  );

  const searchRecipeFun = async () => {
    setLoading(true);
    const result = await getRecipeByName(name);
    setLoading(false);
    if (result) {
      router.push("/searchList");
    }
  };

  const exploreFood = async (item: any) => {
    await setRecipe(item);
    router.push("/meal");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello {user?.name?.split(" ")[0]}</Text>
          <Text style={styles.title}>What would you like to cook today?</Text>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <View style={styles.iconInput}>
            <EvilIcons name="search" size={24} color="#666" />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Search recipes"
              style={styles.input}
              numberOfLines={1}
            />
          </View>

          <Pressable style={styles.searchBtn} onPress={searchRecipeFun}>
            <Text style={styles.searchText}>
              {loading ? "Search..." : "Search"}
            </Text>
          </Pressable>
        </View>

        {/* CATEGORIES */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories?.map((cate) => (
            <Pressable
              key={cate.idCategory}
              style={styles.categoryCard}
              onPress={() => navigateMeals(cate)}
            >
              <Image
                source={{ uri: cate.strCategoryThumb }}
                style={styles.categoryImage}
              />
              <Text style={styles.categoryText}>{cate.strCategory}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* COUNTRY PICKER */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explore foods of {country}</Text>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={country}
              onValueChange={(value) => setCountry(value)}
            >
              {countryList?.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.strArea}
                  value={item.strArea}
                />
              ))}
            </Picker>
          </View>
        </View>

        {/* RECIPES */}
        <View style={styles.recipeRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recipes &&
              recipes.map((recipe, index) => (
                <Pressable
                  onPress={() => exploreFood(recipe)}
                  key={index}
                  style={styles.recipeCard}
                >
                  <Image
                    source={{ uri: recipe.strMealThumb }}
                    style={styles.recipeImage}
                  />
                  <Text style={styles.recipeTitle} numberOfLines={1}>
                    {recipe.strMeal}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>

        {/* SAVED RECIPES */}
        <View style={styles.section}>
          {saveRecipes ? (
            <View style={styles.savedRow}>
              <Text style={styles.sectionTitle}>
                You have {saveRecipes.length} saved recipes
              </Text>
              <Pressable onPress={() => router.push("/saveRecipe")}>
                <Text style={styles.link}>View All →</Text>
              </Pressable>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}
        </View>

        {/* AI CTA */}
        <View style={styles.aiCard}>
          <Text style={styles.sectionTitle}>Don’t know what to cook?</Text>
          <Pressable onPress={() => router.push("/auto_food")}>
            <Text style={styles.link}>Let AI help you →</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  header: {
    padding: 16,
  },
  greeting: {
    fontSize: 14,
    color: "#666",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 6,
  },
  searchBox: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 999,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  iconInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1, // ⭐ REQUIRED
  },

  input: {
    fontSize: 14,
    flex: 1, // ⭐ REQUIRED
  },

  searchBtn: {
    borderLeftWidth: 2,
    borderLeftColor: "black",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchText: {
    fontSize: 12,
  },
  categoryCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginHorizontal: 8,
    borderRadius: 12,
    alignItems: "center",
  },
  categoryImage: {
    width: 60,
    height: 40,
    resizeMode: "contain",
  },
  categoryText: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "500",
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 36,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  recipeRow: {
    marginTop: 10,
    paddingLeft: 16,
  },
  recipeCard: {
    width: 320,
    height: 320,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    marginRight: 10,
  },
  recipeImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  recipeTitle: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "500",
  },
  savedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "#007AFF",
    fontWeight: "500",
  },
  aiCard: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
});
