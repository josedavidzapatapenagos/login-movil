import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import MyButton from '../components/Button';
import Input from '../components/Input';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const manejarLogin = () => {
    if (!email.includes('@') || password.length < 6) {
      Alert.alert("Error", "Credenciales no válidas.");
      return;
    }
    // Pasamos el nombre al dashboard
    router.replace({ pathname: '/home', params: { nuevoNombre: 'Jose Zapata' } } as any);
  };

  return (
    <LinearGradient colors={['#4c669f', '#4f51be', '#e6ebfa']} style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/images/Logoo.png')} style={styles.logo} resizeMode="contain" />
        <Input label="Correo" value={email} onChangeText={setEmail} placeholder="admin@correo.com" />
        <Input label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry placeholder="******" />
        <MyButton title="Iniciar Sesión" onPress={manejarLogin} />
        <MyButton title="Crear Cuenta" variant="outline" onPress={() => router.push('/registro')} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 20, elevation: 10 },
  logo: { width: 150, height: 60, alignSelf: 'center', marginBottom: 30 }
});