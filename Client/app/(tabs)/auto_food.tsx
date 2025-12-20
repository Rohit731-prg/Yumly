import { ScrollView, Text, View, TextInput, Pressable, StyleSheet, FlatList } from "react-native";
import { foodList } from "../../Utils/foodList";
import { useState } from "react";
import useGenStore from "../../Store/genStore";

export default function AutoFood() {
    const { getResponse, response } = useGenStore();
    const [loading, setLoading] = useState(false);
    const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
    const [time, setTime] = useState("");
    const [people, setPeople] = useState("");

    const toggleFood = (name: string) => {
        if (selectedFoods.includes(name)) {
            setSelectedFoods(selectedFoods.filter((food) => food !== name));
        } else {
            setSelectedFoods([...selectedFoods, name]);
        }
    };

    const handleGenerate = async () => {
        setLoading(true);
        const data = {
            name: selectedFoods.join(","),
            time: time,
            people: people,
        };
        const result = await getResponse(data);
        if (result) {
            setLoading(false);
            setSelectedFoods([]);
            setTime("");
            setPeople("");
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Select the ingredients you have:</Text>

            <View style={styles.foodGrid}>
                {foodList.map((food, index) => {
                    const selected = selectedFoods.includes(food.name);
                    return (
                        <Pressable
                            key={index}
                            style={[styles.foodCard, selected && styles.foodCardSelected]}
                            onPress={() => toggleFood(food.name)}
                        >
                            <Text style={styles.foodIcon}>{food.icon}</Text>
                            <Text style={styles.foodName}>{food.name}</Text>
                        </Pressable>
                    );
                })}
            </View>

            <Text style={styles.label}>Time to cook (minutes)</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the time"
                keyboardType="numeric"
                value={time}
                onChangeText={setTime}
            />

            <Text style={styles.label}>Number of people</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter the number"
                keyboardType="numeric"
                value={people}
                onChangeText={setPeople}
            />

            <Pressable style={styles.button} onPress={handleGenerate}>
                <Text style={styles.buttonText}>{loading ? "Generating..." : "Generate"}</Text>
            </Pressable>

            {response && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>🍽 Recipes for you</Text>

                    {response.map((food, index) => (
                        <View key={index} style={styles.recipeCard}>
                            <Text style={styles.recipeName}>{food.name}</Text>

                            <Text style={styles.recipeMeta}>
                                ⏱ {food.time}
                            </Text>

                            <Text style={styles.recipeDescription}>
                                {food.description}
                            </Text>

                            <Text style={styles.stepsTitle}>Steps</Text>

                            {food.steps.map((step, i) => (
                                <Text key={i} style={styles.stepText}>
                                    {i + 1}. {step}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            )}

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        padding: 16,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
    },
    foodGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 20,
    },
    foodCard: {
        width: "22%",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#eee",
    },
    foodCardSelected: {
        borderColor: "#2196f3",
        backgroundColor: "#e3f2fd",
    },
    foodIcon: {
        fontSize: 24,
        marginBottom: 4,
    },
    foodName: {
        fontSize: 12,
        textAlign: "center",
    },
    label: {
        fontSize: 16,
        marginBottom: 6,
        fontWeight: "500",
    },
    input: {
        height: 50,
        paddingHorizontal: 12,
        backgroundColor: "white",
        borderRadius: 10,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        height: 50,
        backgroundColor: "#2196f3",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 12,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    resultContainer: {
        marginTop: 30,
    },

    resultTitle: {
        fontSize: 20,
        fontWeight: "700",
        marginBottom: 16,
    },

    recipeCard: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },

    recipeName: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
        color: "#222",
    },

    recipeMeta: {
        fontSize: 13,
        color: "#666",
        marginBottom: 10,
    },

    recipeDescription: {
        fontSize: 14,
        color: "#444",
        marginBottom: 12,
        lineHeight: 20,
    },

    stepsTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },

    stepText: {
        fontSize: 14,
        color: "#333",
        marginBottom: 6,
        lineHeight: 20,
    },

});
