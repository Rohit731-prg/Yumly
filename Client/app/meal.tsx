// import { SafeAreaView } from "react-native-safe-area-context";
import useRecipeStore, { recipeStruct } from "../Store/RecipeStore"
import { View, Image, Text, StyleSheet, ScrollView, Pressable } from "react-native"
import { useEffect } from "react";


function Meal() {
  const { recipeDetail, setRecipeDetail } = useRecipeStore();

  useEffect(() => {
    setRecipeDetail();
  }, []);

  return (
    <ScrollView style={style.screen}>
      <Image source={{ uri: recipeDetail?.strMealThumb }} style={style.image} />

      <View style={style.card}>
        <Text style={style.title}>{recipeDetail?.strMeal}</Text>
        <Text style={style.meta}>
          {recipeDetail?.strCategory} • {recipeDetail?.strArea}
        </Text>

        <Text style={style.sectionTitle}>Description</Text>
        <Text style={style.bodyText}>{recipeDetail?.strInstructions}</Text>

        <Text style={style.sectionTitle}>Video</Text>
        <Pressable>
          <Text style={style.linkText}>
            {recipeDetail?.strYoutube ? "Watch on YouTube" : "No video available"}
          </Text>
        </Pressable>

        <Text style={style.sectionTitle}>Ingredients</Text>

        {Array.from({ length: 20 }).map((_, index) => {
          const ingredientKey = `strIngredient${index + 1}` as keyof recipeStruct;
          const measureKey = `strMeasure${index + 1}` as keyof recipeStruct;

          const ingredient = recipeDetail?.[ingredientKey];
          const measure = recipeDetail?.[measureKey];

          if (!ingredient) return null;

          return (
            <View key={index} style={style.row}>
              <Text style={style.ingredient}>{ingredient}</Text>
              <Text style={style.measure}>{measure}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>

  )
}

const style = StyleSheet.create({
  screen: {
    backgroundColor: "#FFFFFF",
  },

  image: {
    width: "100%",
    height: 280,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },

  meta: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 20,
    marginBottom: 8,
  },

  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#374151",
  },

  linkText: {
    fontSize: 15,
    color: "#2563EB",
    fontWeight: "500",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#E5E7EB",
  },

  ingredient: {
    fontSize: 15,
    color: "#111827",
    flex: 1,
  },

  measure: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "right",
  },
});


export default Meal