import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useCalculator } from '../hooks/useCalculator';

export default function ScientificCalculator() {
  const {
    currentNumber,
    lastNumber,
    operation,
    handleNumber,
    handleOperation,
    clear,
    calculate,
    handleScientific,
    handlePercentage
  } = useCalculator();

  const scientificButtons = [
    ['sin', 'cos', 'tan', 'log'],
    ['√', 'x²', 'xʸ', 'π'],
    ['(', ')', 'e', '!'],
  ];

  const standardButtons = [
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
    if (['sin', 'cos', 'tan', 'log', '√', 'x²', 'xʸ', 'π', '(', ')', 'e', '!'].includes(btn)) {
      return [styles.button, styles.scientificButton];
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
        <View style={styles.scientificSection}>
          {scientificButtons.map((row, i) => (
            <View key={i} style={styles.row}>
              {row.map((btn) => (
                <TouchableOpacity
                  key={btn}
                  style={getButtonStyle(btn)}
                  onPress={() => handleScientific(btn)}
                >
                  <Text style={[styles.buttonText, styles.scientificButtonText]}>{btn}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.standardSection}>
          {standardButtons.map((row, i) => (
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
                    else if (btn === '%') handlePercentage();
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  display: {
    flex: 0.25,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 15,
  },
  lastNumberText: {
    color: '#747474',
    fontSize: 26,
  },
  currentNumberText: {
    color: '#fff',
    fontSize: 50,
  },
  buttons: {
    flex: 0.75,
    padding: 8,
    marginBottom: 40,
  },
  scientificSection: {
    marginBottom: 8,
  },
  standardSection: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 4,
    height: 45,
  },
  numberButton: {
    backgroundColor: '#333333',
  },
  operationButton: {
    backgroundColor: '#FF9F0A',
  },
  scientificButton: {
    backgroundColor: '#2C3E50',
    height: 40,
  },
  equalsButton: {
    backgroundColor: '#4CAF50',
    flex: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
  },
  scientificButtonText: {
    fontSize: 18,
  },
  operationButtonText: {
    color: '#fff',
  },
  equalsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
