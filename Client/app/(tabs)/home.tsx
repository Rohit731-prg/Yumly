import { useEffect, useCallback } from "react"
import { StyleSheet, Text, TextInput, View, Image, ScrollView, Pressable } from "react-native"
import useCategoryStore from "../../Store/CategoryStore";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { router } from "expo-router";
import { ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUserStore from "../../Store/UserStore";

type categortSet = {
    idCategory: string,
    strCategoryThumb: string,
    strCategory: string
}

function Home() {
    const { user } = useUserStore();
    const { categories, getAllCategory, setCategory } = useCategoryStore();

    const fetchData = async () => {
        await getAllCategory();
    };

    const navigateMeals = useCallback((cate: categortSet) => {
        ToastAndroid.show("function called", ToastAndroid.SHORT);
        setCategory(cate);
        router.push("/meals");
    }, [setCategory])

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <SafeAreaView>
            <View style={{ padding: 10 }}>
                <Text>Hello {user?.name.split(" ")[0]}</Text>
                <Text style={styles.headerlinks}>What would you like to cook today ?</Text>

                <View style={styles.searchBox}>
                    <View style={styles.iconInput}>
                        <EvilIcons name="search" size={24} color="black" />
                        <TextInput placeholder="Enter the recipe name" />
                    </View>
                    <Pressable style={styles.searchBtn}>
                        <Text>Search</Text>
                    </Pressable>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {categories?.map((cate) => (
                        <Pressable key={cate?.idCategory} style={styles.categoryIndex} onPress={() => navigateMeals(cate)}>
                            <Image source={{ uri: cate?.strCategoryThumb }} style={{ width: 60, height: 40 }} />
                            <Text style={{ textAlign: "center", marginTop: 5 }}>{cate?.strCategory}</Text>
                        </Pressable>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerlinks: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 10
    },
    searchBox: {
        marginVertical: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "space-between"
    },
    iconInput: {
        flexDirection: "row",
        alignItems: "center",
    },
    categoryIndex: {
        padding: 10,
        marginHorizontal: 5,
        backgroundColor: "white",
        borderRadius: 5
    },
    searchBtn: {
        backgroundColor: "white",
        paddingHorizontal: 5,
        borderRadius: 999,
        paddingVertical: 5
    }
})

export default Home