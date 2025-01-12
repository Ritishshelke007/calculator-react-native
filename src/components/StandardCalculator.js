import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';

export default function StandardCalculator() {
  const {
    currentNumber,
    lastNumber,
    operation,
    handleNumber,
    handleOperation,
    clear,
    calculate,
    history,
  } = useCalculator();

  const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonStyle = (btn) => {
    if (btn === '=') return [styles.button, styles.equalsButton];
    if (['+', '-', '*', '/', 'C', '±', '%'].includes(btn)) {
      return [styles.button, styles.operationButton];
    }
    return [styles.button, styles.numberButton];
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.lastNumberText}>{lastNumber} {operation}</Text>
        <Text style={styles.currentNumberText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((row, i) => (
          <View key={i} style={styles.row}>
            {row.map((btn) => (
              <TouchableOpacity
                key={btn}
                style={getButtonStyle(btn)}
                onPress={() => {
                  if (btn === 'C') clear();
                  else if (['+', '-', '*', '/'].includes(btn)) handleOperation(btn);
                  else if (btn === '=') calculate();
                  else if (btn === '±') handleNumber((parseFloat(currentNumber) * -1).toString());
                  else if (btn === '%') handleNumber((parseFloat(currentNumber) / 100).toString());
                  else handleNumber(btn);
                }}
              >
                <Text style={[
                  styles.buttonText,
                  ['+', '-', '*', '/', 'C', '±', '%'].includes(btn) ? styles.operationButtonText : null,
                  btn === '=' ? styles.equalsButtonText : null
                ]}>
                  {btn}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  display: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
  },
  lastNumberText: {
    color: '#747474',
    fontSize: 30,
  },
  currentNumberText: {
    color: '#fff',
    fontSize: 70,
  },
  buttons: {
    flex: 0.6,
    padding: 10,
    marginBottom: 40, // Add margin for the signature text
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    margin: 5,
    height: 80,
  },
  numberButton: {
    backgroundColor: '#333333',
  },
  operationButton: {
    backgroundColor: '#FF9F0A',
  },
  equalsButton: {
    backgroundColor: '#4CAF50',
    flex: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 30,
  },
  operationButtonText: {
    color: '#fff',
  },
  equalsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
