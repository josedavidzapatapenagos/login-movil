import React, { useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Animated, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Importamos tus componentes personalizados
import Button from '../components/Button';
import Input from '../components/Input';

export default function LoginScreen() {
  const router = useRouter();

  // 1. Inicializamos las variables de animación
  const fadeAnim = useRef(new Animated.Value(1)).current;   // Opacidad del formulario
  const scaleAnim = useRef(new Animated.Value(1)).current;  // Escala del logo
  const socialFade = useRef(new Animated.Value(1)).current; // Opacidad de redes sociales

  const iniciarSesionAnimada = () => {
    // 2. Ejecutamos la transición de "entrada"
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(socialFade, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 6, 
        duration: 900,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
    ]).start(() => {
      console.log('Login exitoso - Navegando...');
      // Aquí navegarías a la pantalla principal de la app
    });
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#4f51be', '#e6ebfa']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Sección del Logo y Cabecera */}
        <View style={styles.headerContainer}>
          <Animated.View style={[styles.header, { transform: [{ scale: scaleAnim }] }]}>
            <Image 
              source={require('../assets/images/Logoo.png')} 
              style={styles.logo}
              resizeMode="contain" 
            />
          </Animated.View>

          <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
            Soluciones informáticas a tu servicio hoy
          </Animated.Text>
        </View>

        {/* Tarjeta de Formulario */}
        <Animated.View style={[styles.formCard, { opacity: fadeAnim }]}>
          <Input 
            label="Correo Electrónico"
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
          />
          
          <Input 
            label="Contraseña"
            placeholder="********"
            secureTextEntry 
          />

          <Button 
            title="Iniciar Sesión" 
            onPress={iniciarSesionAnimada} 
          />
          
          <TouchableOpacity onPress={() => router.push('/recuperar')}>
            <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Sección de Redes Sociales */}
        <Animated.View style={[styles.socialSection, { opacity: socialFade }]}>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o continúa con</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../assets/images/Google.png')} style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../assets/images/Facebook.png')} style={styles.socialIcon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <Image source={require('../assets/images/Github.png')} style={styles.socialIcon} />
            </TouchableOpacity>
          </View>
        </Animated.View>

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 25,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 80 : 60, 
    marginBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
    zIndex: 100,
  },
  logo: {
    width: 140, 
    height: 50,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 5,
    maxWidth: '80%',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    width: '100%',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  forgotPassword: {
    color: '#4f51be',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    fontWeight: '600',
  },
  socialSection: {
    marginTop: 35,
    alignItems: 'center',
    paddingBottom: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 10,
    fontSize: 13,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  socialButton: {
    backgroundColor: '#fff',
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  socialIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
});