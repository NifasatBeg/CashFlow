import React, { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type CustomBoxProps = {
  style?: any;
  children?: ReactNode;
};

const CustomBox: React.FC<CustomBoxProps> = ({ style = {}, children, ...props }) => {
  const dynamicStyles = getDynamicStyles(style);

  return (
    <View style={styles.container} {...props}>
      {/* Main Box Container */}
      <View style={[styles.headingContainer, dynamicStyles.mainBox, style?.mainBox]}>
        <View style={styles.textContainer}>{children}</View>
      </View>

      {/* Shadow Effect */}
      <View style={[styles.shadowContainer, dynamicStyles.shadowBox, style?.shadowBox]} />
    </View>
  );
};

export default CustomBox;

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  headingContainer: {
    padding: 20,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 10,
  },
  textContainer: {
    color: "white",
  },
  shadowContainer: {
    position: "absolute",
    borderRadius: 10,
    top: 5,
    left: 5,
    right: -5,
    bottom: -5,
    backgroundColor: "gray",
    zIndex: -1,
  },
});

// Dynamic Styling Function
const getDynamicStyles = (customStyle: any) => ({
  mainBox: {
    borderColor: customStyle?.mainBox?.borderColor || "black",
    backgroundColor: customStyle?.mainBox?.backgroundColor || "black",
    borderRadius: customStyle?.mainBox?.borderRadius || 10,
  },
  shadowBox: {
    backgroundColor: customStyle?.shadowBox?.backgroundColor || "gray",
    borderRadius: customStyle?.shadowBox?.borderRadius || 10,
  },
});
