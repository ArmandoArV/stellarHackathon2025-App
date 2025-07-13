import React, { useState } from "react";
import { Image } from "expo-image";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import Header from "../components/Header";
import Topic from "../components/Topic";
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
  tokensCard: {
    backgroundColor: "#D8D2BDD2",
    borderRadius: 16,
    padding: 20,
    height: 165,
    marginBottom: 32,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  tokensTitle: {
    fontSize: 24,
    marginBottom: 1,
    fontWeight: "300",
    backgroundColor: "transparent",
  },
  tokenContainer: {
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tokenValueNumber: {
    fontSize: 70,
    color: "#222",
    backgroundColor: "transparent",
  },
  redeemButton: {
    backgroundColor: "#315A2B",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  bountyContainer: {
    width: 280,
    height: 190,
    marginRight: 1,
    backgroundColor: "#f3f6f9",
    borderRadius: 8,
    padding: 3,
  },
});

export default function TabTwoScreen() {
  const [tokenValue, setTokenValue] = useState(100);
  const repeatedTopics: TopicProps[] = [
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
  ];
  return (
    <>
      <Header />
      <ThemedView style={styles.pageBackground}>
        <ThemedView style={styles.greetingRow}>
          <ThemedView style={{ flex: 1 }}>
            <Text style={styles.greetingText}>The Vault</Text>
          </ThemedView>
          <Image
            source={require("../../assets/images/Standing.png")}
            style={styles.illustration}
            contentFit="contain"
            alt="Illustration of a person standing"
          />
        </ThemedView>
        <ThemedView style={styles.tokensCard}>
          <Text style={styles.tokensTitle}>Collected Tokens</Text>
          <ThemedView style={styles.tokenContainer}>
            <Text style={styles.tokenValueNumber}>{tokenValue}</Text>
          </ThemedView>
        </ThemedView>
        <TouchableOpacity
          style={styles.redeemButton}
          onPress={() => {
            // Redeem logic here
            setTokenValue(0);
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Redeem
          </Text>
        </TouchableOpacity>
        <ThemedView
          style={{ flex: 1, padding: 10, backgroundColor: "#f3f6f9", alignContent: "center", justifyContent: "center", display: "flex" }}
        >
          <Text style={{ fontSize: 18, color: "#222", marginBottom: 20 }}>
           Popular options
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {repeatedTopics.map((t, idx) => (
              <ThemedView key={idx} style={styles.bountyContainer}>
                <Topic
                  key={idx}
                  topic={t.topic}
                  title={t.title}
                  reward={t.reward}
                />
              </ThemedView>
            ))}
          </ScrollView>
        </ThemedView>
      </ThemedView>
    </>
  );
}
