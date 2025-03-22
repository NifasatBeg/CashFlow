import { Card, Avatar, Text } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import React from 'react';

const UserSummaryCard = ({ userDetails, largestExpense, avgDailySpend, topMerchant, onPress }) => {
  return (
    <Card style={styles.card} onPress={() => onPress({ cardType: "UserInfo" })}>
      <Card.Content style={styles.cardContent}>
        {/* Left: User Details */}
        <View style={styles.userInfo}>
          <Avatar.Icon size={50} icon="account" style={styles.profilePic} />
          <Text style={styles.userName}>{userDetails.username}</Text>
        </View>

        {/* Right: Expense Insights */}
        <View style={styles.expenseContainer}>
          <View style={styles.expenseRow}>
            <Text style={styles.detailText}>💰 Largest:</Text>
            <Text style={styles.amountText}>₹{largestExpense}</Text>
          </View>
          <View style={styles.expenseRow}>
            <Text style={styles.detailText}>📊 Avg:</Text>
            <Text style={styles.amountText}>₹{avgDailySpend}</Text>
          </View>
          <View style={styles.expenseRow}>
            <Text style={styles.detailText}>🏪 Top:</Text>
            <Text style={styles.amountText}>{topMerchant}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    elevation: 3, // Shadow for Android
    backgroundColor: 'white',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePic: {
    backgroundColor: '#000000',
    marginRight: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expenseContainer: {
    alignItems: 'flex-end', // Align to the right
  },
  expenseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 160, // Ensures proper alignment
  },
  detailText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5,
    color: "#222",
  },
});

export default UserSummaryCard;
