import useRecipeStore from "@/Store/RecipeStore"
import { View, Image } from "react-native"


function Meal() {
    const { recipe } = useRecipeStore();
  return (
    <View>
        <Image source={{ uri: recipe?.strMealThumb}} />
    </View>
  )
}

export default Meal