import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseCard from '../components/ExpenseCard';
import AddExpense from '../components/AddExpense';
import {getStartDateUTC} from '../utils/DateUtils';
import {getHeaders} from '../utils/ApiUtils';
import DateRangeModal from '../components/DateRangeModal';
import {Card, IconButton} from 'react-native-paper';
import GENERAL_CONFIG from '../config/AppConfig';

const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;

const Details = ({navigation, route}) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [merchant, setMerchant] = useState(null);
  const [dateRange, setDateRange] = useState({startDate: null, endDate: null});
  const [openDateRangeModal, setOpenDateRangeModal] = useState(false);

  const {name, merchant: passedMerchant, timeFrame} = route.params;

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found');

      const endpoint = merchant
        ? '/expense/v1/merchant/rangeBasedExpense'
        : '/expense/v1/rangeBasedExpense';
      const params = [
        `user_id=${userId}`,
        `start_date=${dateRange.startDate}`,
        `end_date=${dateRange.endDate}`,
        merchant ? `merchant=${merchant}` : '',
      ].join('&');

      const apiUrl = `${SERVER_BASE_URL}${endpoint}?${params}`;
      console.log({apiUrl});

      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {'X-User-Id': userId, ...(await getHeaders())},
      });

      if (!response.ok) throw new Error(await response.text());

      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      Alert.alert('Error', 'Failed to fetch expenses.');
    }
    setLoading(false);
  };

  const handleDelete = useCallback(
    async externalId => {
      Alert.alert(
        'Delete Expense',
        'Are you sure you want to delete this expense?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) throw new Error('User ID not found');
                const expenseToDelete = expenses.find(
                  exp => exp.externalId === externalId,
                );
                if (!expenseToDelete) throw new Error('Expense not found');

                const response = await fetch(
                  `${SERVER_BASE_URL}/expense/v1/deleteExpense?user_id=${userId}`,
                  {
                    method: 'DELETE',
                    headers: {'X-User-Id': userId, ...(await getHeaders())},
                    body: JSON.stringify(expenseToDelete),
                  },
                );

                if (!response.ok) throw new Error(await response.text());
                setRefresh(!refresh);
              } catch (error) {
                console.error('Error deleting expense:', error);
                Alert.alert('Error', 'Failed to delete expense.');
              }
            },
          },
        ],
      );
    },
    [expenses],
  );

  useEffect(() => {
    if (passedMerchant) {
      setMerchant(passedMerchant);
    }
    if (timeFrame) {
      setDateRange({
        startDate: getStartDateUTC(timeFrame),
        endDate: new Date().getTime(),
      });
    }
  }, []);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) fetchExpenses();
  }, [merchant, dateRange, timeFrame, refresh]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Detailed Expenses</Text>
      {loading && <ActivityIndicator size="large" color="#3498db" />}
      {(merchant || (dateRange.startDate && dateRange.endDate)) && (
        <Card style={styles.infoCard}>
          <Card.Content>
            {merchant && <Text style={styles.infoText}>Merchant: {merchant}</Text>}
            {dateRange.startDate && dateRange.endDate && (
              <Text style={styles.infoText}>
                Date Range: {new Date(dateRange.startDate).toLocaleDateString()} - {new Date(dateRange.endDate).toLocaleDateString()}
              </Text>
            )}
          </Card.Content>
        </Card>
      )}
      <View style={styles.filterContainer}>
        <IconButton
          icon="calendar-range"
          size={28}
          onPress={() => setOpenDateRangeModal(true)}
        />
      </View>
      <DateRangeModal
        isVisible={openDateRangeModal}
        onClose={() => setOpenDateRangeModal(false)}
        onRangeChange={setDateRange}
      />
      <FlatList
        data={expenses}
        keyExtractor={item => item.externalId.toString()}
        renderItem={({item}) => <ExpenseCard expense={item} onDelete={handleDelete}/>}
        contentContainerStyle={styles.list}
      />
      <AddExpense refresh={refresh} setRefresh={setRefresh} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#2c3e50',
  },
  infoCard: {
    backgroundColor: '#ecf0f1',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  list: {
    paddingBottom: 20,
  },
});

export default Details;