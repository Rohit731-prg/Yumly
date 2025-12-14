import { useEffect, useState } from "react"
import { Text, TextInput, View, Button, Image } from "react-native"
import axios from "axios";
import useCategoryStore from "@/Store/CategoryStore";

type categortSet = {
    idCategory: string,
    strCategoryThumb: string,
    strCategory: string
}

function Home() {
    const { categories, getAllCategory } = useCategoryStore();

    const fetchData = async () => {
        await getAllCategory();
    };

    useEffect(() => {
        fetchData();
    }, []);
  return (
    <View style={{ padding: 20 }}>
        <Text>Hellow </Text>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>What would you like to cook today ?</Text>

        <View style={{ flexDirection: "row", width: "100%"}}>
            <View>
                <Text>🔍</Text>
                <TextInput placeholder="Enter the recipe name" />
            </View>
            <Button title="Search" onPress={() => {}} />
        </View>

        <View style={{ flexDirection: "row" }}>
            {categories?.map((cate) => (
                <View key={cate?.idCategory}>
                    <Image source={{ uri: cate?.strCategoryThumb}} style={{ width: 40, height: 40 }} />
                    <Text>{cate?.strCategory}</Text>
                </View>
            ))}
        </View>
    </View>
  )
}

export default Home