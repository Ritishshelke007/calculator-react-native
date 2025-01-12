import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';

export default function History() {
  const { history, loadFromHistory, clearHistory } = useCalculator();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No calculations yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.historyList} contentContainerStyle={styles.historyContent}>
        {history.slice().reverse().map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.historyItem}
            onPress={() => loadFromHistory(item)}
          >
            <View style={styles.historyItemContent}>
              <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
              <Text style={styles.calculation}>{item.expression}</Text>
              <Text style={styles.result}>= {item.result}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  emptyText: {
    color: '#747474',
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  historyList: {
    flex: 1,
  },
  historyContent: {
    paddingBottom: 60, // Space for signature
  },
  historyItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  historyItemContent: {
    gap: 4,
  },
  timestamp: {
    color: '#747474',
    fontSize: 14,
  },
  calculation: {
    color: '#fff',
    fontSize: 18,
  },
  result: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
