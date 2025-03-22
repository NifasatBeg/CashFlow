import React from "react";
import { Text, StyleSheet, TextProps, Platform } from "react-native";

interface CustomTextProps extends TextProps {
  style?: any;
  children: React.ReactNode;
}

const CustomText: React.FC<CustomTextProps> = ({ style, children, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontFamily: Platform.select({
      ios: "Helvetica",
      android: "Roboto",
      default: "System",
    }),
    fontSize: 16, // Added a default font size for better readability
  },
});

export default CustomText;
