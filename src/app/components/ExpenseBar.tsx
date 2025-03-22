import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const ExpenseBar = ({ timeBasedExpenses}:any) => {
  const [selectedBar, setSelectedBar] = useState(null);
  const availableLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const barData = timeBasedExpenses.map((item, index) => ({
    value: item.totalAmount,
    label: availableLabels[index % availableLabels.length], // A, B, C, ...
    originalLabel: item.timePeriod, // Store original label for legend
    frontColor: "#177AD5",
    onPress: () => setSelectedBar(index === selectedBar ? null : index), // Toggle selection
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spending Over Time</Text>
      <BarChart
        width={250} // Increased width
        barWidth={25}
        noOfSections={5}
        barBorderRadius={4}
        data={barData}
        yAxisThickness={1}
        xAxisThickness={1}
        yAxisLabelWidth={40} // Allocate space for Y-axis numbers
        yAxisTextStyle={{ color: "#34495e", fontSize: 12 }} // Style for better visibility
        isAnimated
        scrollToEnd
        showScrollIndicator
        renderTooltip={(index) =>
          selectedBar === index ? (
            <View style={styles.tooltip}>
              <Text style={styles.tooltipText}>
                ₹{barData[index].value}
              </Text>
            </View>
          ) : null
        }
      />

      {/* Legend */}
      <View style={styles.legendContainer}>
        <FlatList
          data={barData}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.legendItem}>
              <View style={[styles.colorBox, { backgroundColor: item.frontColor }]} />
              <Text style={styles.legendText}>
                {item.label}: {item.originalLabel}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  tooltip: {
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 5,
    position: "absolute",
    top: -25,
  },
  tooltipText: {
    color: "#fff",
    fontWeight: "bold",
  },
  legendContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    color: "#34495e",
  },
});

export default ExpenseBar;
