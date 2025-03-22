import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { FAB, Menu } from "react-native-paper";

const FloatingTimeframeButton = ({ onSelect, menuVisible, setMenuVisible }) => {

  const toggleMenu = () => setMenuVisible(!menuVisible);
  const closeMenu = () => setMenuVisible(false);

  const handleSelection = (timeframe) => {
    closeMenu();
    if (onSelect) onSelect(timeframe);
  };

  return (
    <View style={styles.container}>
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <FAB
            icon="filter"
            style={styles.filterFab}
            onPress={toggleMenu}
          />
        }
      >
        <Menu.Item onPress={() => handleSelection("day")} title="Daily" />
        <Menu.Item onPress={() => handleSelection("week")} title="Weekly" />
        <Menu.Item onPress={() => handleSelection("month")} title="Monthly" />
        <Menu.Item onPress={() => handleSelection("year")} title="Yearly" />
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 30,
    left: 20,
  },
  filterFab: {
    backgroundColor: "#03DAC6",
  },
});

export default FloatingTimeframeButton;
