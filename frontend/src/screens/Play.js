import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NoItemsModal from "../components/NoItemsModal";

export default function Play({ route }) {
  const { selection } = route.params;
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const category = selection.length === 1 ? selection[0] : "";
        const response = await fetch(
          `https://jo-mai-mai-api.onrender.com/questions/?category=${category}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData().then(() => {
      setMounted(true);
    });
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      getRandomIndex();
    }
  }, [mounted]);

  const getRandomIndex = () => {
    if (index !== null) {
      setQuestions((prevQuestions) => {
        const newQuestions = prevQuestions.filter(
          (question, key) => key !== index
        );
        return newQuestions;
      });
    }
    if (questions.length - 1 === 0) setModalVisible(true);
    const seed = new Date().getTime();
    const random = seed + Math.random();
    const randomIndex =
      Math.floor(random * questions.length) % (questions.length - 1);
    setIndex(randomIndex);
  };

  return (
    <LinearGradient colors={["#b1c6f4", "#ffffff"]} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Jo mai mai</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={
            questions[index]?.categories.includes("hot") && selection.includes("hot")
              ? require("../../assets/fire.png")
              : require("../../assets/star.png")
          }
        ></Image>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.text}>{questions[index]?.question.cat}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.next} onPress={() => getRandomIndex()}>
          <View style={styles.nextTop}>
            <Text style={styles.buttonText}>Següent</Text>
          </View>
        </TouchableOpacity>
      </View>
      <NoItemsModal modalVisible={modalVisible} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageContainer: {
    flex: 1,
    marginTop: 25,
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1.6,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1.2,
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontFamily: "Horizon",
    fontSize: 30,
    marginVertical: 20,
    color: "#000",
    textAlign: "center",
  },
  text: {
    fontFamily: "Horizon",
    fontSize: 25,
    marginHorizontal: "10%",
    textAlign: "center",
    color: "#000",
  },
  next: {
    width: "80%",
    backgroundColor: "#000",
    borderRadius: 10,
    marginVertical: 10,
    transform: [{ translateX: 5 }],
  },
  nextTop: {
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }],
  },
  buttonText: {
    fontFamily: "Horizon",
    fontSize: 25,
    color: "#000",
  },
  suggestionText: {
    color: "#6495ed",
    textDecorationLine: "underline",
  },
});
