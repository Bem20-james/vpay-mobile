import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

interface Beneficiary {
  name: string;
  initial: string;
}

const Beneficiaries: React.FC = () => {
  const beneficiaries: Beneficiary[] = [
    { name: 'Bon James', initial: 'B' },
    { name: 'Chipper Been', initial: 'C' },
    { name: 'Jarewon Awokoyo', initial: 'J' },
    { name: 'Mbanwie Kelvin', initial: 'M' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Beneficiaries</Text>
        <Text style={styles.viewAll}>VIEW ALL</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.list}>
        {beneficiaries.map((beneficiary, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{beneficiary.initial}</Text>
            </View>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {beneficiary.name}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color: '#fff',
  },
  viewAll: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  list: {
    flexDirection: 'row',
    gap: 15,
  },
  item: {
    alignItems: 'center',
    width: 80,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#333',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
  },
  name: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Beneficiaries;