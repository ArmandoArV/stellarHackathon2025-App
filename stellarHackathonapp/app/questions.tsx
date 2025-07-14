import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type RouteParams = {
  id: string;
};

const questions = [
  {
    id: "quiz_dengue_001",
    nombre: "Dengue Prevention Quiz",
    descripcion:
      "This quiz assesses basic knowledge about how to prevent the spread of dengue through simple and effective actions in everyday environments.",
    quiz: [
      {
        pregunta:
          "What is the most effective way to prevent the reproduction of mosquitoes that transmit dengue?",
        opciones: [
          "Use repellent only at night",
          "Eliminate containers with stagnant water",
          "Sleep with the windows open",
        ],
        respuesta_correcta: 1,
      },
      {
        pregunta:
          "What time of day is the dengue-transmitting mosquito (Aedes aegypti) most active?",
        opciones: ["During midday", "At night", "At dawn and dusk"],
        respuesta_correcta: 2,
      },
      {
        pregunta:
          "Which of the following actions helps prevent dengue at home?",
        opciones: [
          "Keep doors open for ventilation",
          "Cover water tanks and containers",
          "Use fans instead of air conditioning",
        ],
        respuesta_correcta: 1,
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f6f9",
    padding: 20,
  },
  quizContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    color: "#555",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 25,
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  optionButtonSelected: {
    backgroundColor: "#e6f0ff",
    borderColor: "#4a90e2",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#333",
  },
  optionText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#ed8733",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default function Questions() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = (route.params as RouteParams) || {};
  const quiz = questions.find((q) => q.id === id) || questions[0];

  const [selectedOptions, setSelectedOptions] = useState<{
    [questionIndex: number]: number;
  }>({});
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      navigation.goBack(); // Return to previous screen
    }, 1500); // Show modal for 1.5s
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <ScrollView>
          <View key={quiz.id} style={styles.quizContainer}>
            <Text style={styles.title}>{quiz.nombre}</Text>
            <Text style={styles.description}>{quiz.descripcion}</Text>
            {quiz.quiz.map((item, index) => (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.question}>{item.pregunta}</Text>
                {item.opciones.map((option, optIndex) => {
                  const isSelected = selectedOptions[index] === optIndex;
                  return (
                    <TouchableOpacity
                      key={optIndex}
                      style={[
                        styles.optionButton,
                        isSelected && styles.optionButtonSelected,
                      ]}
                      onPress={() => handleSelectOption(index, optIndex)}
                    >
                      <View style={styles.radioCircle}>
                        {isSelected && <View style={styles.selectedRb} />}
                      </View>
                      <Text style={styles.optionText}>{option}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Modal
          transparent
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>¡Respuestas enviadas!</Text>
            </View>
          </View>
        </Modal>
      </View>
    </GestureHandlerRootView>
  );
}
