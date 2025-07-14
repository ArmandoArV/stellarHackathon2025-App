// CongratsModal.tsx
import React from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Or use your preferred icon library

interface Props {
  visible: boolean;
  tokenCount?: number; // Optional prop to display token count
  onClose: () => void;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    maxWidth: 300,
  },
  icon: {
    marginBottom: 10,
  },
  congratsText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default function CongratsModal({ visible, tokenCount, onClose }: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <MaterialCommunityIcons
            name="puzzle-outline"
            size={48}
            color="#333"
            style={styles.icon}
          />
          <Text style={styles.congratsText}>Congrats!</Text>
          <Text style={styles.subText}>
            {tokenCount} Tokens were added to your account
          </Text>
        </View>
      </View>
    </Modal>
  );
}
