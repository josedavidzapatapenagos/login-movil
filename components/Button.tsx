import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  color?: string; 
  variant?: 'outline' | 'default'; 
}

export default function MyButton({ title, onPress, color = '#4f51be', variant = 'default' }: Props) {
  const isOutline = variant === 'outline';
  
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        { backgroundColor: isOutline ? 'transparent' : color },
        isOutline && { borderWidth: 1, borderColor: color }
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, isOutline && { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center', width: '100%', elevation: 3, marginVertical: 8 },
  text: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});