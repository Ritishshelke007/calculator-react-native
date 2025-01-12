import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_STORAGE_KEY = '@calculator_history';

export const useCalculator = () => {
  const [currentNumber, setCurrentNumber] = useState('0');
  const [lastNumber, setLastNumber] = useState('');
  const [operation, setOperation] = useState(null);
  const [history, setHistory] = useState([]);
  const [justCalculated, setJustCalculated] = useState(false);

  // Load history from storage when component mounts
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const saveHistory = async (newHistory) => {
    try {
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving history:', error);
    }
  };

  const handleNumber = useCallback((num) => {
    if (justCalculated) {
      setCurrentNumber(num);
      setJustCalculated(false);
    } else if (currentNumber === '0') {
      setCurrentNumber(num);
    } else {
      setCurrentNumber(currentNumber + num);
    }
  }, [currentNumber, justCalculated]);

  const handleOperation = useCallback((op) => {
    setOperation(op);
    setLastNumber(currentNumber);
    setCurrentNumber('0');
    setJustCalculated(false);
  }, [currentNumber]);

  const clear = useCallback(() => {
    setCurrentNumber('0');
    setLastNumber('');
    setOperation(null);
    setJustCalculated(false);
  }, []);

  const factorial = (n) => {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const handleScientific = useCallback((func) => {
    const num = parseFloat(currentNumber);
    let result;
    let expression = '';

    switch (func) {
      case 'sin':
        result = Math.sin(num * Math.PI / 180);
        expression = `sin(${num})`;
        break;
      case 'cos':
        result = Math.cos(num * Math.PI / 180);
        expression = `cos(${num})`;
        break;
      case 'tan':
        result = Math.tan(num * Math.PI / 180);
        expression = `tan(${num})`;
        break;
      case 'log':
        result = Math.log10(num);
        expression = `log(${num})`;
        break;
      case '√':
        result = Math.sqrt(num);
        expression = `√(${num})`;
        break;
      case 'x²':
        result = Math.pow(num, 2);
        expression = `${num}²`;
        break;
      case 'π':
        result = Math.PI;
        expression = 'π';
        break;
      case 'e':
        result = Math.E;
        expression = 'e';
        break;
      case '!':
        result = factorial(num);
        expression = `${num}!`;
        break;
      default:
        return;
    }

    const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8);
    setCurrentNumber(formattedResult);
    setJustCalculated(true);
    addToHistory(expression, formattedResult);
  }, [currentNumber]);

  const calculate = useCallback(() => {
    if (!operation || !lastNumber) return;

    let result = 0;
    const current = parseFloat(currentNumber);
    const previous = parseFloat(lastNumber);
    const expression = `${previous} ${operation} ${current}`;

    switch (operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = previous / current;
        break;
      default:
        return;
    }

    const formattedResult = Number.isInteger(result) ? result.toString() : result.toFixed(8);
    setCurrentNumber(formattedResult);
    setOperation(null);
    setLastNumber('');
    setJustCalculated(true);
    addToHistory(expression, formattedResult);
  }, [currentNumber, lastNumber, operation]);

  const addToHistory = (expression, result) => {
    const newHistory = [...history, { expression, result, timestamp: new Date().toISOString() }];
    setHistory(newHistory);
    saveHistory(newHistory);
  };

  const loadFromHistory = (item) => {
    setCurrentNumber(item.result);
    setLastNumber('');
    setOperation(null);
    setJustCalculated(true);
  };

  const clearHistory = async () => {
    setHistory([]);
    try {
      await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  return {
    currentNumber,
    lastNumber,
    operation,
    history,
    handleNumber,
    handleOperation,
    handleScientific,
    clear,
    calculate,
    loadFromHistory,
    clearHistory,
  };
};
