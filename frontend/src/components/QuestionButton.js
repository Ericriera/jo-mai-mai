import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function QuestionButton({
  text,
  image,
  isSelected,
  setIsSelected,
}) {
  return (
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => setIsSelected(!isSelected)}
    >
      <View
        style={[styles.containerTop, isSelected && styles.containerSelected]}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
          <Text style={[styles.buttonText, isSelected && { color: "#fff" }]}>
            {text}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "40%",
    aspectRatio: 0.75,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: "#fff",
  },
  containerTop: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }],
  },
  containerSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
    transform: [{ translateX: 0 }, { translateY: 0 }],
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ translateY: -25 }],
  },
  image: {
    height: "100%",
    width: "auto",
    aspectRatio: 1,
  },
  buttonText: {
    fontFamily: "Horizon",
    fontSize: 20,
    color: "#000",
  },
});
