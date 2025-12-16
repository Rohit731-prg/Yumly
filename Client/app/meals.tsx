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
import useCategoryStore from "@/Store/CategoryStore";
import { router } from "expo-router";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import useRecipeStore from "@/Store/RecipeStore";
import { useEffect } from "react";

function Meals() {
  const { category } = useCategoryStore();
  const { getAllRecipeByCategory, recipes, setRecipe } = useRecipeStore();

  const fetchData = async () => {
    await getAllRecipeByCategory();
  };

  const setRecipeFun = async (id: string) => {
    await setRecipe(id);
    router.push("/meal");
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable onPress={() => router.push("/home")} style={styles.back}>
        <Feather name="arrow-left" size={24} color="black" />
      </Pressable>

      <Text>{category?.strCategory}</Text>
      <View style={styles.searchBox}>
        <View style={styles.iconInput}>
          <EvilIcons name="search" size={24} color="black" />
          <TextInput placeholder="Enter the recipe name" />
        </View>
        <Pressable style={styles.searchBtn}>
          <Text>Search</Text>
        </Pressable>
      </View>

      <View>
        {recipes?.map((item) => (
          <Pressable key={item?.idMeal} style={styles.itemBox} onPress={() => setRecipeFun(item?.idMeal)}>
            <View style={styles.innerView}>
              <Image
                source={{ uri: item?.strMealThumb }}
                style={styles.images}
              />
              <Text style={styles.text}>{item?.strMeal}</Text>
            </View>
            <Feather name="arrow-right" size={24} color="black" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#d6d5d0ff",
    minHeight: "100%",
  },
  back: {
    padding: 5,
    backgroundColor: "white",
    marginBottom: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 30,
  },
  searchBox: {
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  iconInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIndex: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "white",
    borderRadius: 5,
  },
  searchBtn: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    borderRadius: 999,
    paddingVertical: 5,
  },
  itemBox: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
    justifyContent: "space-between",
    alignItems: "center"
  },
  innerView: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  images: {
    width: 150,
    height: 100,
    borderRadius: 5,
    marginRight: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: "medium",
  },
});

export default Meals;
