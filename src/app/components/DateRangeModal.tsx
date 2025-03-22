import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { IconButton } from "react-native-paper";

export default function DateRangePicker({ isVisible, onClose, onRangeChange }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      if (showPicker === "start") {
        setStartDate(selectedDate);
      } else {
        setEndDate(selectedDate);
      }
    }
    setShowPicker(null);
  };

  const confirmSelection = () => {
    onRangeChange({
      startDate: new Date(new Date(startDate).setHours(0, 0, 0, 0)).getTime(),
      endDate: new Date(new Date(endDate).setHours(23, 59, 59, 999)).getTime(),
    });
    onClose();
  };

  return (
    <Modal transparent visible={isVisible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <IconButton icon="calendar-range" size={30} />

          <TouchableOpacity onPress={() => setShowPicker("start")} style={styles.dateButton}>
            <Text style={styles.dateText}>Start: {startDate.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setShowPicker("end")} style={styles.dateButton}>
            <Text style={styles.dateText}>End: {endDate.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              mode="date"
              value={showPicker === "start" ? startDate : endDate}
              onChange={handleDateChange}
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmSelection} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 320,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  dateButton: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#ddd",
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    width: "100%",
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  confirmButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
