import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MyButton from '../components/Button';
import Input from '../components/Input';

export default function RegistroScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const confirmarRegistro = () => {
    if (!nombre || !email) {
      Alert.alert("Error", "Todos los campos son obligatorios.");
      return;
    }
    // Enviamos los datos como parámetros al Home
    router.replace({
      pathname: '/home',
      params: { nuevoNombre: nombre, nuevoEmail: email }
    } as any);
  };

  return (
    <LinearGradient colors={['#4c669f', '#4f51be', '#e6ebfa']} style={styles.container}>
      <View style={styles.card}>
        <Input label="Nombre del Cliente" value={nombre} onChangeText={setNombre} placeholder="Ej. Juan Pérez" />
        <Input label="Correo" value={email} onChangeText={setEmail} placeholder="juan@correo.com" />
        <MyButton title="Registrar Cliente" onPress={confirmarRegistro} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 15 }
});