import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
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
  logo: {
    width: 40,
    height: 40,
  },
});

export default function Header() {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={28} color="#222" />
      </TouchableOpacity>
      <Image
        source={require("../../assets/images/logo.svg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.bellWrapper}>
        <View style={styles.bellCircle}>
          <Ionicons name="notifications-outline" size={22} color="#888" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
