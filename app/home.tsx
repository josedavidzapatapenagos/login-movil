import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { Cliente, ClienteCard } from '../components/ClienteCard';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Estados para controlar la visibilidad de los Modales
  const [menuVisible, setMenuVisible] = useState(false);
  const [reporteVisible, setReporteVisible] = useState(false);
  const [search, setSearch] = useState('');
  
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: '1', nombre: 'Ana López', correo: 'ana@ejemplo.com' },
    { id: '2', nombre: 'Juan Pérez', correo: 'juan@ejemplo.com' },
  ]);

  // Datos para el gráfico de ingresos
  const datosIngresos = [
    { fuente: 'Suscripciones', monto: 5000, color: '#4c669f', porcentaje: '40%' as const },
    { fuente: 'Consultorías', monto: 4500, color: '#4f51be', porcentaje: '36%' as const },
    { fuente: 'Ventas Directas', monto: 3000, color: '#a2b6f0', porcentaje: '24%' as const },
  ];

  useEffect(() => {
    if (params.nuevoNombre && params.nuevoEmail) {
      const nuevo: Cliente = {
        id: Date.now().toString(),
        nombre: params.nuevoNombre as string,
        correo: params.nuevoEmail as string,
      };
      setClientes(prev => [nuevo, ...prev]);
    }
  }, [params.nuevoNombre]);

  const abrirReporteDesdeMenu = () => {
    setMenuVisible(false); // Cerramos el menú primero
    setTimeout(() => setReporteVisible(true), 300); // Abrimos el reporte con un pequeño delay
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.logoTitle}>Admin Panel</Text>
        <View style={{ width: 32 }} /> 
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Buscar clientes..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNum}>{clientes.length}</Text>
          <Text style={styles.statLab}>Total</Text>
        </View>
        <TouchableOpacity style={styles.statBox} onPress={() => setReporteVisible(true)}>
          <Text style={styles.statNum}>$12.5k</Text>
          <Text style={styles.statLab}>Ingresos ↗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={['#4c669f', '#4f51be', '#e6ebfa']} style={styles.container}>
      
      {/* --- MODAL DEL MENÚ LATERAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
            <View style={styles.overlayCloseArea} />
          </TouchableWithoutFeedback>
          
          <Animated.View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Ionicons name="person-circle" size={60} color="#4f51be" />
              <Text style={styles.userName}>{params.nuevoNombre || "Jose Zapata"}</Text>
            </View>
            
            <TouchableOpacity style={styles.menuItem} onPress={() => setMenuVisible(false)}>
              <Ionicons name="people" size={24} color="#333" />
              <Text style={styles.menuText}>Clientes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={abrirReporteDesdeMenu}>
              <Ionicons name="bar-chart" size={24} color="#333" />
              <Text style={styles.menuText}>Reportes</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, { marginTop: 'auto' }]} 
              onPress={() => router.replace('/')}
            >
              <Ionicons name="log-out" size={24} color="#FF5A5F" />
              <Text style={[styles.menuText, { color: '#FF5A5F' }]}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>

      {/* --- MODAL DE REPORTES --- */}
      <Modal visible={reporteVisible} animationType="slide" transparent>
        <View style={styles.modalOverlayCenter}>
          <View style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <Text style={styles.reportTitle}>Análisis de Ingresos</Text>
              <TouchableOpacity onPress={() => setReporteVisible(false)}>
                <Ionicons name="close-circle" size={30} color="#666" />
              </TouchableOpacity>
            </View>

            {datosIngresos.map((item, index) => (
              <View key={index} style={styles.barRow}>
                <Text style={styles.barLabel}>{item.fuente}</Text>
                <View style={styles.barBackground}>
                  <View style={[styles.barFill, { width: item.porcentaje, backgroundColor: item.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>
      </Modal>

      <FlatList
        data={clientes.filter(c => c.nombre.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClienteCard 
            cliente={item} 
            onDelete={() => setClientes(clientes.filter(c => c.id !== item.id))}
          />
        )}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={{ padding: 20, paddingTop: 50 }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContent: { marginBottom: 20 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  logoTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 15, height: 50, elevation: 5 },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  statBox: { width: '48%', backgroundColor: 'rgba(255,255,255,0.2)', padding: 15, borderRadius: 15, alignItems: 'center' },
  statNum: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  statLab: { color: 'white', opacity: 0.8 },
  
  // Estilos del Menú corregidos
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', flexDirection: 'row' },
  modalOverlayCenter: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  overlayCloseArea: { flex: 1 }, // Área para cerrar al tocar fuera
  sidebar: { width: width * 0.75, backgroundColor: 'white', height: '100%', padding: 25, elevation: 10 },
  sidebarHeader: { alignItems: 'center', marginBottom: 40, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 20 },
  userName: { fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#333' },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  menuText: { marginLeft: 15, fontSize: 16, color: '#444' },

  // Reportes
  reportCard: { width: width * 0.9, backgroundColor: 'white', borderRadius: 20, padding: 20 },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  reportTitle: { fontSize: 20, fontWeight: 'bold' },
  barRow: { marginBottom: 15 },
  barLabel: { fontSize: 13, color: '#444', marginBottom: 5 },
  barBackground: { height: 10, backgroundColor: '#eee', borderRadius: 5, overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: 5 }
});