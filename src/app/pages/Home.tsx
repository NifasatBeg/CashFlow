import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AddExpense from "../components/AddExpense";
import { getHeaders } from "../utils/ApiUtils";
import FloatingTimeframeButton from "../components/TimeFrame";
import { Icon, Avatar } from "react-native-paper";
import { getEndDateUTC, getStartDateUTC } from "../utils/DateUtils";
import ExpensePie from "../components/ExpensePie";
import ExpenseBar from "../components/ExpenseBar";
import UserSummaryCard from "../components/UserSummaryCard";
import GENERAL_CONFIG from "../config/AppConfig";

const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;

const Home = ({navigation}) => {
  const [timeBasedExpenses, setTimeBasedExpenses] = useState([]);
  const [merchantBasedExpenses, setMerchantBasedExpenses] = useState([]);
  const [timeFrame, setTimeFrame] = useState("day");
  const [timeFrameMenuVisible, setTimeFrameMenuVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userSummary, setUserSummary] = useState({largestExpense: {amount: 0}, averageDailyExpense: 0, topMerchant: ""});

  const fetchTimeBasedExpenses = async (userId) => {
    try {
      const apiUrl = `${SERVER_BASE_URL}/expense/v1/count?user_id=${userId}&time_frame=${timeFrame}&start_date=${getStartDateUTC(timeFrame)}&end_date=${getEndDateUTC()}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "X-User-Id": userId, ...(await getHeaders()) },
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setTimeBasedExpenses(data);
    } catch (error) {
      console.error("Error fetching time-based expenses:", error);
    }
  };

  const fetchMerchantBasedExpense = async (userId) => {
    try {
      const apiUrl = `${SERVER_BASE_URL}/expense/v1/merchant-summary?user_id=${userId}&start_date=${getStartDateUTC(timeFrame)}&end_date=${getEndDateUTC()}`;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: { "X-User-Id": userId, ...(await getHeaders()) },
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setMerchantBasedExpenses(data);
    } catch (error) {
      console.error("Error fetching merchant-based expenses:", error);
    }
  };

  const fetchExpenses = async () => {
    setLoading(true);
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      await fetchMerchantBasedExpense(userId);
      await fetchTimeBasedExpenses(userId);
    }
    setLoading(false);
  };
  
  const fetchUserDetails = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      const response = await fetch(`${SERVER_BASE_URL}/user/v1/getUser?user_id=${userId}`, {
        method: "GET",
        headers: { "X-User-Id": userId, ...(await getHeaders()) },
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setUserDetails(data || {});
    }
  };

  const fetchUserSummmary = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (userId) {
      const response = await fetch(`${SERVER_BASE_URL}/expense/v1/summary?user_id=${userId}`, {
        method: "GET",
        headers: { "X-User-Id": userId, ...(await getHeaders()) },
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      setUserSummary(data || {});
    }
  }


  const handleCardClick = ({cardType, merchant ,timeFrame}:any) => {
    switch (cardType) {
      case "UserInfo":
        navigation.navigate("Details", { name: "Details" });
        break;
      case "PieChart":
        navigation.navigate("Details", { name: "Details", merchant, timeFrame});
        break;
      case "BarChart":
        navigation.navigate("Details", { name: "Details", timeFrame});
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, [timeFrame, refresh]);

  useEffect(() => {
    fetchUserDetails();
    fetchUserSummmary();
  }, []);

  useEffect


  return (
    <View style={styles.container}>
      {/* User Info */}
      <UserSummaryCard userDetails={userDetails} largestExpense={userSummary.largestExpense.amount} avgDailySpend={userSummary.averageDailyExpense.toFixed(2)} topMerchant={userSummary.topMerchant} onPress={handleCardClick}/>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#3498db" />}

      {/* Scrollable Content */}
      <View style={styles.chartView}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.graphTitle}>Graphical Analysis - {timeFrame}</Text>
          {merchantBasedExpenses.length > 0 && (
            <View style={styles.chartContainer}>
              <ExpensePie merchantBasedExpenses={merchantBasedExpenses} timeFrame={timeFrame} onPress = {handleCardClick}/>
            </View>
          )}
          {timeBasedExpenses.length > 0 && (
            <View style={styles.chartContainer}>
              <ExpenseBar timeBasedExpenses={timeBasedExpenses}/>
            </View>
          )}
          {timeBasedExpenses.length === 0 && merchantBasedExpenses.length === 0 && (
            <Text>No expenses found for the selected time frame.</Text>
          )}
        </ScrollView>
      </View>

      {/* Floating Filter Button */}
      <TouchableOpacity style={styles.filterButton} onPress={() => setTimeFrameMenuVisible(true)}>
        <Icon source="filter-variant" color="white" size={32} />
      </TouchableOpacity>

      {/* Time Frame Selector */}
      <FloatingTimeframeButton
        onSelect={setTimeFrame}
        menuVisible={timeFrameMenuVisible}
        setMenuVisible={setTimeFrameMenuVisible}
      />

      <AddExpense refresh={refresh} setRefresh={setRefresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  graphTitle: {
    fontSize: 22,         // Bigger text
    fontWeight: 'bold',   // Bold for emphasis
    color: '#bb88ff',     // Theme-based color
    textAlign: 'left',    // Align to the left (or 'center' if preferred)
    marginVertical: 10,   // Add spacing around the text
    paddingBottom: 5,     // Space between text and charts
    borderBottomWidth: 2, // Underline effect
    borderBottomColor: '#ddd', // Light gray border
  },
  userInfoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    backgroundColor: "#3498db",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34495e",
    marginTop: 10,
  },
  chartView: {
    flex: 3,
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 10,
    height: "100%"
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80,
  },
  chartContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 15,
  },
  filterButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 10,
  },
});

export default Home;
