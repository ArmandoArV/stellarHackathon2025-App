import { Image } from "expo-image";
import { Platform, StyleSheet, Text, ScrollView, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Topic from "../components/Topic";
import Header from "../components/Header";
import React, { useState } from "react";
import { TopicProps } from "../types/TopicProps";

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
    paddingTop: Platform.OS === "ios" ? 50 : 0,
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
  nameText: {
    fontSize: 50,
    fontWeight: "300",
    color: "#222",
    backgroundColor: "#f3f6f9",
  },
  illustration: {
    width: 100,
    height: 100,
    marginLeft: 5,
    backgroundColor: "#f3f6f9",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  bountiesCard: {
    backgroundColor: "#ea893a",
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    alignItems: "center",
  },
  bountiesTitle: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "500",
    backgroundColor: "#ea893a",
  },
  bountiesStatsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    backgroundColor: "#ea893a",
  },
  bountyStatCol: {
    alignItems: "center",
    minWidth: 80,
    backgroundColor: "#ea893a",
  },
  bountyStatNumber: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "700",
    lineHeight: 56,
    backgroundColor: "#ea893a",
  },
  bountyStatLabel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    backgroundColor: "#ea893a",
    textAlign: "center",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 12,
    color: "#222",
  },
  bountyCardsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
    backgroundColor: "#f3f6f9",
    justifyContent: "flex-start", // Important fix for scrolling
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bountyCard: {
    borderRadius: 16,
    padding: 16,
    minWidth: 140,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
});

export default function HomeScreen() {
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

  const repeatedTopics = [...topics, ...topics, ...topics];

  const [name, setName] = useState("Armando");

  const [bountyWeek, setBountyWeek] = useState(7);
  const [bountyTotal, setBountyTotal] = useState(54);

  return (
    <>
      <Header />
      <ThemedView style={styles.pageBackground}>
        <ThemedView style={styles.pageBackground}>
          {/* Greeting and Illustration */}
          <ThemedView style={styles.greetingRow}>
            <ThemedView style={{ flex: 1 }}>
              <Text style={styles.greetingText}>Hi</Text>
              <Text style={styles.nameText}>{name}!</Text>
            </ThemedView>
            <Image
              source={require("../../assets/images/Sitting.png")}
              style={styles.illustration}
              contentFit="contain"
              alt="Illustration of a person sitting"
            />
          </ThemedView>

          {/* Completed bounties card */}
          <ThemedView style={styles.bountiesCard}>
            <Text style={styles.bountiesTitle}>Completed bounties</Text>
            <ThemedView style={styles.bountiesStatsRow}>
              <ThemedView style={styles.bountyStatCol}>
                <Text style={styles.bountyStatNumber}>{bountyWeek}</Text>
                <Text style={styles.bountyStatLabel}>This week</Text>
              </ThemedView>
              <ThemedView style={styles.bountyStatCol}>
                <Text style={styles.bountyStatNumber}>{bountyTotal}</Text>
                <Text style={styles.bountyStatLabel}>Total</Text>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* May interest you */}
          <Text style={styles.sectionTitle}>May interest you</Text>
          <ThemedView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bountyCardsRow}
              style={{ paddingVertical: 8, backgroundColor: "#f3f6f9" }}
            >
              {repeatedTopics.map((t, idx) => (
                <Topic
                  key={idx}
                  topic={t.topic}
                  title={t.title}
                  reward={t.reward}
                />
              ))}
            </ScrollView>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </>
  );
}
