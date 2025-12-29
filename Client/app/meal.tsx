// import { SafeAreaView } from "react-native-safe-area-context";
import useRecipeStore, { recipeStruct } from "../Store/RecipeStore";
import {
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { useEffect } from "react";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import useSaveRecipeStore from "../Store/SaveRecipeStore";
import LottieView from "lottie-react-native";
import loading from "../assets/loading1.json";
import YoutubePlayer from "react-native-youtube-iframe";

function Meal() {
  const { recipeDetail, setRecipeDetail } = useRecipeStore();
  const { updateSaveRecipe } = useSaveRecipeStore();

  useEffect(() => {
    setRecipeDetail();
  }, []);

  return (
    <ScrollView style={style.screen} contentContainerStyle={{ flexGrow: 1 }}
>
      {recipeDetail ? (
        <View>
          <Image
            source={{ uri: recipeDetail?.strMealThumb }}
            style={style.image}
          />

          <View style={style.card}>
            <View style={style.header}>
              <Text style={style.title}>{recipeDetail?.strMeal}</Text>
              <Pressable
                onPress={() => updateSaveRecipe(recipeDetail?.idMeal as string)}
              >
                <EvilIcons name="share-apple" size={24} color="black" />
              </Pressable>
            </View>
            <Text style={style.meta}>
              {recipeDetail?.strCategory} • {recipeDetail?.strArea}
            </Text>

            <Text style={style.sectionTitle}>Description</Text>
            <Text style={style.bodyText}>{recipeDetail?.strInstructions}</Text>

            <Text style={style.sectionTitle}>Video</Text>
            {recipeDetail?.strYoutube && (
              <View style={{ height: 220, marginTop: 16 }}>
                <YoutubePlayer
                  videoId={recipeDetail?.strYoutube}
                  height={220}
                  play={true}
                />
              </View>
            )}

            <Text style={style.sectionTitle}>Ingredients</Text>

            {Array.from({ length: 20 }).map((_, index) => {
              const ingredientKey = `strIngredient${
                index + 1
              }` as keyof recipeStruct;
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
        </View>
      ) : (
        <View style={style.containerFail}>
          <LottieView source={loading} autoPlay loop style={style.loader} />
        </View>
      )}
    </ScrollView>
  );
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
    marginBottom: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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

  containerFail: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // optional, but helps debug
  },

  loader: {
    width: 200,
    height: 200,
  },
});

export default Meal;
