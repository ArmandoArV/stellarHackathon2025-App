import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ThemedView } from "@/components/ThemedView";
import Header from "./components/Header";
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
  pageBackground: {
    backgroundColor: "#f3f6f9",
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: "300",
    color: "#222",
    backgroundColor: "#f3f6f9",
  },
  description: {
    fontSize: 18,
    color: "#444",
    marginBottom: 8,
    backgroundColor: "#f3f6f9",
  },
  reward: {
    fontSize: 20,
    color: "#315A2B",
    fontWeight: "600",
    marginTop: 10,
    backgroundColor: "#f3f6f9",
  },
  videoContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f6f9",
    borderRadius: 8,
    overflow: "hidden",
    marginTop: 20,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    fontSize: 50,
    fontWeight: "300",
    color: "#222",
    backgroundColor: "#f3f6f9",
  },
  infoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f3f6f9",
    borderRadius: 8,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f3f6f9",
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  redeemButton: {
    backgroundColor: "#315A2B",
    padding: 15,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

const topicInfo = {
  id: "1",
  title: "Stop Dengue Before It Starts",
  description:
    "Help raise awareness about mosquito-borne diseases like dengue, Zika, and chikungunya. Watch the short educational video below and complete a brief 3-question quiz to prove you've learned the key prevention methods.",
  reward: "1000 XLM",
  topic: "Stop Dengue Before It Starts",
  videoUrl:
    "https://www.youtube.com/embed/F9D7oudFtGA", // YouTube embed URL
};

type RootStackParamList = {
  questions: { id: string };
  // Add other routes here if needed
};

export default function TopicDetail() {
  // Video logic removed; now using WebView for YouTube embed
  const [topic] = useState(topicInfo);
  const [loading] = useState(false);
  const [error] = useState("");
  // videoError state removed
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "questions">>();
  // handlePlaybackStatusUpdate removed

  if (loading) return <ActivityIndicator size="large" color="#315A2B" />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!topic) return <Text style={styles.errorText}>No topic found.</Text>;

  return (
    <>
      <Header />
      <View style={styles.pageBackground}>
        <ThemedView style={styles.container}>
          <ThemedView style={styles.titleContainer}>
            <Text style={styles.title}>{topic.topic}</Text>
          </ThemedView>
          <ThemedView style={styles.infoContainer}>
            <Text style={styles.description}>{topic.description}</Text>
          </ThemedView>

          <ThemedView style={styles.videoContainer}>
            <WebView
              source={{ uri: topic.videoUrl }}
              style={styles.video}
              allowsFullscreenVideo
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
              renderError={() => (
                <Text style={styles.errorText}>Failed to load video</Text>
              )}
            />
          </ThemedView>

          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={() => {
                console.log("Redeem button pressed");
                navigation.navigate("questions", { id: topic.id });
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
                Start
              </Text>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </View>
    </>
  );
}
