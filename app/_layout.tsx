import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Esto le dice a la app que index es la primera pantalla */}
      <Stack.Screen name="index" />
      {/* Esto registra la pantalla de inicio */}
      <Stack.Screen name="home" />
      <Stack.Screen name="recuperar" />
      <Stack.Screen name="modal" />
    </Stack>
  );
}