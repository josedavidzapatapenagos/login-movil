import React from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  label: string;
  placeholder?: string; 
  secureTextEntry?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
}

export default function Input({ label, placeholder, secureTextEntry, value, onChangeText, keyboardType = 'default' }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', marginBottom: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 8 },
  input: { height: 52, backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, fontSize: 16, borderWidth: 1, borderColor: '#e0e0e0' },
});