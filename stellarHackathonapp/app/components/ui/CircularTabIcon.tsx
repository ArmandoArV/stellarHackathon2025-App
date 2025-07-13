import React from "react";
import { View, StyleSheet } from "react-native";

interface CircularTabIconProps {
  focused: boolean;
  children: React.ReactNode;
}

export const CircularTabIcon: React.FC<CircularTabIconProps> = ({
  focused,
  children,
}) => {
  return (
    <View style={[styles.iconContainer, focused && styles.focusedBackground]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    padding: 5,
  },
  focusedBackground: {
    backgroundColor: "#4D4D4D",
  },
});
