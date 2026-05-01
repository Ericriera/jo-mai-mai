import React, { useLayoutEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function Add() {
  const navigation = useNavigation();
  const [newSuggestion, setNewSuggestion] = useState({
    suggestion: "",
    category: "",
  });

  useLayoutEffect(() => {
    Platform.OS === "ios" &&
      navigation.setOptions({
        headerRight: () => (
          <Button title="Enviar" color="#000" onPress={onSend} />
        ),
        headerLeft: () => (
          <Button
            title="Cancelar"
            color="#000"
            onPress={() => navigation.goBack()}
          />
        ),
      });
  }, []);

  const onSend = async () => {
    try {
      const response = await fetch(
        `https://jo-mai-mai-api.onrender.com/suggestions/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: "",
            suggestion: newSuggestion.suggestion,
            category: newSuggestion.category,
            created_at: "",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error en el envío");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <LinearGradient colors={["#b1c6f4", "#ffffff"]} style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <View style={styles.inputContainerTop}>
            <TextInput
              style={styles.textContainer}
              onChangeText={(text) =>
                setNewSuggestion({ ...newSuggestion, category: text })
              }
              placeholder="Tipus"
              placeholderTextColor="#888"
              selectionColor="#000"
              clearButtonMode="while-editing"
            />
            <TextInput
              style={styles.textContainer}
              onChangeText={(text) =>
                setNewSuggestion({ ...newSuggestion, suggestion: text })
              }
              placeholder="Sugerencia"
              placeholderTextColor="#888"
              selectionColor="#000"
              clearButtonMode="while-editing"
            />
          </View>
        </View>
        {Platform.OS !== "ios" && (
          <TouchableOpacity style={styles.send} onPress={onSend}>
            <View style={styles.sendTop}>
              <Text style={styles.buttonText}>Enviar</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    flex: 5,
    marginTop: Platform.OS === "android" ? 125 : 75,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#000",
    width: "90%",
    alignItems: "center",
    borderRadius: 10,
    transform: [{ translateX: 5 }],
  },
  inputContainerTop: {
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 1,
    transform: [{ translateX: -5 }, { translateY: -5 }],
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  textContainer: {
    width: "100%",
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: "2%",
    fontSize: 16,
    color: "#000",
  },
  send: {
    width: "90%",
    backgroundColor: "#000",
    borderRadius: 10,
    marginVertical: 50,
    transform: [{ translateX: 5 }],
  },
  sendTop: {
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
});
