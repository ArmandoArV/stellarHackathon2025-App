import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 70,
    paddingBottom: 8,
    backgroundColor: "#f3f6f9",
  },
  logo: {
    fontSize: 28,
    fontWeight: "400",
    letterSpacing: 2,
    color: "#222",
  },
  bellWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  bellCircle: {
    backgroundColor: "#dedede",
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={28} color="#222" />
      </TouchableOpacity>
      <Text style={styles.logo}>LOGO</Text>
      <TouchableOpacity style={styles.bellWrapper}>
        <View style={styles.bellCircle}>
          <Ionicons name="notifications-outline" size={22} color="#888" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
