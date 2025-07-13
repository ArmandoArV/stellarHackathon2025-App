import React, { useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Header from "../components/Header";
import { TopicProps } from "../types/TopicProps";
import Topic from "../components/Topic";
const styles = StyleSheet.create({
  pageBackground: {
    backgroundColor: "#f3f6f9",
    flex: 1,
    padding: 20,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 50,
    paddingBottom: 20,
    gap: 8,
    backgroundColor: "#f3f6f9",
  },
  greetingText: {
    fontSize: 50,
    fontWeight: "300",
    color: "#222",
    backgroundColor: "#f3f6f9",
  },
});

export default function HistoryScreen() {
  const [topics, setTopics] = useState<TopicProps[]>([
    {
      topic: "Web Development",
      title: "Build a responsive website",
      reward: "+20 Tokens",
    },
    {
      topic: "Mobile Apps",
      title: "Create a mobile app",
      reward: "+30 Tokens",
    },
  ]);
  return (
    <>
      <Header />
      <ThemedView style={styles.pageBackground}>
        <ThemedView style={styles.greetingRow}>
          <ThemedView style={{ flex: 1 }}>
            <Text style={styles.greetingText}>All Bounties</Text>
          </ThemedView>
        </ThemedView>
        <ThemedView
          style={{ flex: 1, padding: 10, backgroundColor: "#f3f6f9" }}
        >
          <ScrollView>
            {topics.map((topic, index) => (
              <Topic
                key={index}
                topic={topic.topic}
                title={topic.title}
                reward={topic.reward}
              />
            ))}
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </>
  );
}
