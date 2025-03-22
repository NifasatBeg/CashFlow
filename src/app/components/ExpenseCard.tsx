import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

const ExpenseCard = ({ expense, onDelete }: { expense: any; onDelete: (id: number) => void }) => {

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
      
        // Convert to IST (UTC +5:30)
        const options: Intl.DateTimeFormatOptions = { 
          timeZone: "Asia/Kolkata", 
          day: "numeric", 
          month: "long", 
          year: "numeric" 
        };
        
        const formatter = new Intl.DateTimeFormat("en-IN", options);
        const formattedDate = formatter.format(date);
      
        // Extract day for suffix
        const day = date.getDate();
        const getDaySuffix = (day: number) => {
          if (day >= 11 && day <= 13) return "th";
          switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
          }
        };
      
        return `${day}${getDaySuffix(day)} of ${formattedDate.split(" ")[1]}, ${date.getFullYear()}`;
      };


  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.merchant}>{expense.merchant}</Text>
        <IconButton 
          icon="delete" 
          size={24} 
          iconColor="#000" 
          onPress={() => onDelete(expense.externalId)} 
        />
      </View>
      <View style={styles.body}>
        <Text style={styles.amount}>₹{expense.amount}</Text>
        <Text style={styles.createdAt}>{formatDate(expense.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  merchant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  body: {
    marginTop: 5,
  },
  amount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#27ae60",
  },
  createdAt: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
});

export default ExpenseCard;
