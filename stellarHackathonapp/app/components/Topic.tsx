import React from "react";
import { StyleSheet, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { TopicProps } from "../types/TopicProps";

const styles = StyleSheet.create({
  bountyCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  bountyCardTopic: {
    color: "#888",
    fontSize: 13,
    marginBottom: 4,
  },
  bountyCardTitle: {
    color: "#222",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  bountyCardReward: {
    color: "#ea893a",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default function Topic({ topic, title, reward }: TopicProps) {
  return (
    <ThemedView style={styles.bountyCard}>
      <Text style={styles.bountyCardTopic}>{topic}</Text>
      <Text style={styles.bountyCardTitle}>{title}</Text>
      <Text style={styles.bountyCardReward}>{reward}</Text>
    </ThemedView>
  );
}
