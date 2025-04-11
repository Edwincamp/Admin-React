import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginScreen';
import AccessLogScreen from './screens/RegistroAperturasScreen';
import ClaveTemporalScreen from './screens/ClaveTemporalScreen';
import RegisterScreen from './screens/RegisterScreen';
import FingerPrint from './screens/FingerPrintScreen';

type RootStackParamList = {
  Login: undefined;
  AccessLog: undefined;
  ClaveTemporal: undefined;
  Register: undefined;
  FingerPrint:undefined;
};

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Sidebar personalizada
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContainer}>
      <View style={styles.profileContainer}>
        <View style={styles.profileIcon}>
          <Text style={styles.profileIconText}>👤</Text>
        </View>
        <Text style={styles.profileName}>Paco</Text>
        <Text style={styles.profileEmail}>paco@email.com</Text>
      </View>
      <View style={styles.menuContainer}>
        {/* Navegar a Registro de Aperturas */}
        <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('AccessLog')}>
          <Text style={styles.menuItemText}>Registro de Aperturas</Text>
        </TouchableOpacity>
        {/* Navegar a Crear Clave Temporal */}
        <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('ClaveTemporal')}>
          <Text style={styles.menuItemText}>Crear Clave Temporal</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => props.navigation.navigate('Login')}>
        <Text style={styles.logoutButtonText}>Salir</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

// Configuración del Drawer Navigator
function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="AccessLog" component={AccessLogScreen} />
      <Drawer.Screen name="ClaveTemporal" component={ClaveTemporalScreen} />
    </Drawer.Navigator>
  );
}

// Configuración del Stack Navigator
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AccessLog" component={DrawerNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FingerPrint" component={FingerPrint} options={{ title: 'Registrar Huella' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#E6F0FA',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E0',
  },
  profileIcon: {
    backgroundColor: '#BEE3F8',
    borderRadius: 50,
    padding: 20,
    marginBottom: 10,
  },
  profileIconText: {
    fontSize: 32,
    color: '#2C5282',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2C5282',
  },
  profileEmail: {
    fontSize: 14,
    color: '#4A5568',
  },
  menuContainer: {
    marginTop: 20,
  },
  menuItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#2C5282',
    fontWeight: '500',
  },
  logoutButton: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#3182CE',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default App;
