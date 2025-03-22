import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseCard from '../components/ExpenseCard';
import { getHeaders } from '../utils/ApiUtils';
import GENERAL_CONFIG from '../config/AppConfig';

const AddExpense = ({refresh, setRefresh}:any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [loading, setLoading] = useState(false);
  const SERVER_BASE_URL = GENERAL_CONFIG.BASE_URL;

  // Add an expense
  const addExpense = async () => {
    if (!merchant || !amount || isNaN(parseFloat(amount))) {
      Alert.alert('Error', 'Enter valid expense details.');
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found');

      const response = await fetch(`${SERVER_BASE_URL}/expense/v1/addExpense`, {
        method: 'POST',
        headers: {'X-User-Id': userId, ...(await getHeaders())},
        body: JSON.stringify({merchant, amount: parseFloat(amount), currency}),
      });

      if (!response.ok) throw new Error(await response.text());

      const result = await response.json();
      if (result) {
        setLoading(false);
        setModalVisible(false);
        setRefresh(!refresh);
      } else {
        Alert.alert('Error', 'Failed to add expense.');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setMerchant('');
          setAmount('');
          setCurrency('INR');
          setModalVisible(true);
        }}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Add Expense Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => {
          setModalVisible(false);
          setMerchant('');
          setAmount('');
          setCurrency('INR');
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Expense</Text>
            <TextInput
              style={styles.input}
              placeholder="Merchant"
              value={merchant}
              onChangeText={setMerchant}
            />
            <TextInput
              style={styles.input}
              placeholder="Amount"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
            />
            <TextInput
              style={styles.input}
              placeholder="Currency"
              value={currency}
              onChangeText={setCurrency}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setMerchant('');
                  setAmount('');
                  setCurrency('INR');
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={addExpense}>
                <Text style={{color: 'white'}}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
    paddingHorizontal: 10,
    },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {fontSize: 32, color: 'white', fontWeight: 'bold'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {padding: 10, backgroundColor: '#ccc', borderRadius: 5},
  saveButton: {padding: 10, backgroundColor: '#27ae60', borderRadius: 5},
});
