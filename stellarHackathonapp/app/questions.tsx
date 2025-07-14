import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const questions = [
  {
    id: "quiz_dengue_001",
    nombre: "Prevención del Dengue",
    descripcion:
      "Este quiz evalúa conocimientos básicos sobre cómo prevenir la propagación del dengue mediante acciones simples y efectivas en el entorno cotidiano.",
    quiz: [
      {
        pregunta:
          "¿Cuál es la forma más efectiva de evitar la reproducción del mosquito que transmite el dengue?",
        opciones: [
          "Usar repelente solo durante la noche",
          "Eliminar recipientes con agua estancada",
          "Dormir con las ventanas abiertas",
        ],
        respuesta_correcta: 1,
      },
      {
        pregunta:
          "¿Qué horario es más común para la actividad del mosquito transmisor del dengue (Aedes aegypti)?",
        opciones: [
          "Durante el mediodía",
          "Durante la noche",
          "Al amanecer y al atardecer",
        ],
        respuesta_correcta: 2,
      },
      {
        pregunta:
          "¿Cuál de las siguientes acciones contribuye a prevenir el dengue en casa?",
        opciones: [
          "Mantener puertas abiertas para ventilar",
          "Tapar tanques y depósitos de agua",
          "Usar ventiladores en lugar de aire acondicionado",
        ],
        respuesta_correcta: 1,
      },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f3f6f9",
  },
  quizContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  questionContainer: {
    marginBottom: 15,
  },
  question: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
  option: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
});

export default function Questions() {
  const route = useRoute();
  // @ts-ignore
  const { id } = route.params || {};
  const quiz = questions.find((q) => q.id === id) || questions[0];

  return (
    <View style={styles.container}>
      <View key={quiz.id} style={styles.quizContainer}>
        <Text style={styles.title}>{quiz.nombre}</Text>
        <Text style={styles.description}>{quiz.descripcion}</Text>
        {quiz.quiz.map((item, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.question}>{item.pregunta}</Text>
            {item.opciones.map((option, optIndex) => (
              <Text key={optIndex} style={styles.option}>
                {optIndex + 1}. {option}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
