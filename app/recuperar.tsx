import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Importamos tus piezas de rompecabezas
import Button from '../components/Button';
import Input from '../components/Input';

export default function RecuperarScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleRecuperar = () => {
    if (email.length > 0) {
      Alert.alert(
        "Correo enviado", 
        "Si el correo existe en nuestro sistema, recibirás instrucciones pronto.",
        [{ text: "OK", onPress: () => router.back() }]
      );
    } else {
      Alert.alert("Error", "Por favor ingresa un correo electrónico.");
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#4f51be', '#e6ebfa']}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Recuperar Acceso</Text>
          <Text style={styles.subtitle}>
            Ingresa tu correo y te enviaremos las instrucciones para restablecer tu contraseña.
          </Text>
        </View>

        <View style={styles.formCard}>
          <Input 
            label="Correo Electrónico"
            placeholder="tu@correo.com"
            keyboardType="email-address" // Aquí es donde se usaba la prop que daba error
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          <Button 
            title="Enviar Instrucciones" 
            onPress={handleRecuperar} 
          />

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>Volver al inicio de sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '90%',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    color: '#4f51be',
    fontWeight: '600',
    fontSize: 14,
  },
});