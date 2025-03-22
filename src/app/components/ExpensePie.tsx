import { PieChart } from "react-native-gifted-charts";
import { View, Text, FlatList } from "react-native";
import React from "react";

const ExpensePie = ({ merchantBasedExpenses = [], timeFrame, onPress }: any) => {
  const availableColors = [
    "#fbd203",
    "#ffb300",
    "#ff9100",
    "#ff6c00",
    "#ff3d00",
    "#ff0000",
    "#ff00ff",
    "#0000ff",
    "#00ff00",
    "#00ffff",
  ];

  const data = merchantBasedExpenses.map((item: any, index: number) => ({
    value: item.totalAmount,
    text: `${index + 1}`,
    color: availableColors[index % availableColors.length],
    merchant: item.merchant,
  }));

  return (
    <View style={{ alignItems: "center", padding: 20, backgroundColor: "#f8f9fa", borderRadius: 16, elevation: 3 }}>
      {/* Pie Chart */}
      <PieChart
        data={data}
        showText
        textColor="black"
        radius={120}
        textSize={18}
        focusOnPress
        showValuesAsLabels
        onPress={(data) => onPress({cardType:"PieChart", merchant: data.merchant, timeFrame})}
      />

      {/* Legend Container */}
      <View style={{ 
        marginTop: 20, 
        width: "100%", 
        backgroundColor: "white", 
        padding: 15, 
        borderRadius: 12, 
        elevation: 2
      }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 }}>Merchant Breakdown</Text>
        
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2} // Keeps legend compact
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 5, flex: 1 }}>
              <View
                style={{
                  width: 14,
                  height: 14,
                  backgroundColor: item.color,
                  borderRadius: 7,
                  marginRight: 8,
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>{item.merchant}: ₹{item.value}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}



export default ExpensePie;