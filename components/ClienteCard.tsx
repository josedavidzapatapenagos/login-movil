import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Cliente {
  id: string;
  nombre: string;
  correo: string;
}

interface ClienteCardProps {
  cliente: Cliente;
  onDelete?: () => void; // Agregamos esta línea para habilitar el borrado
}

export const ClienteCard = ({ cliente, onDelete }: ClienteCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.nombre}>{cliente.nombre}</Text>
        <Text style={styles.correo}>{cliente.correo}</Text>
      </View>
      
      {onDelete && (
        <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
          <Ionicons name="trash-outline" size={22} color="#FF5A5F" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { 
    backgroundColor: 'white', 
    padding: 15, 
    borderRadius: 15, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    elevation: 3
  },
  info: { flex: 1 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  correo: { fontSize: 14, color: '#666' },
  deleteBtn: { padding: 5 }
});