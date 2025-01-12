import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import StandardCalculator from './src/components/StandardCalculator';
import ScientificCalculator from './src/components/ScientificCalculator';
import History from './src/components/History';

export default function App() {
  const [activeTab, setActiveTab] = useState('standard');

  const renderContent = () => {
    switch (activeTab) {
      case 'standard':
        return <StandardCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'history':
        return <History />;
      default:
        return <StandardCalculator />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <View style={styles.mainContent}>
        <View style={styles.tabBar}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'standard' && styles.activeTab]}
            onPress={() => setActiveTab('standard')}
          >
            <Text style={[styles.tabText, activeTab === 'standard' && styles.activeTabText]}>Standard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'scientific' && styles.activeTab]}
            onPress={() => setActiveTab('scientific')}
          >
            <Text style={[styles.tabText, activeTab === 'scientific' && styles.activeTabText]}>Scientific</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.activeTab]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>History</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {renderContent()}
        </View>
        <Text style={styles.signature}>Calc by Ritish</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#1C1C1C',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    color: '#747474',
    fontSize: 16,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signature: {
    color: '#747474',
    textAlign: 'center',
    padding: 8,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
});
