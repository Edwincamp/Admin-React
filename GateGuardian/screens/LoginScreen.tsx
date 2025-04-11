import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginUser } from '../services/api'; // Importa la función de login desde api.ts

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  AccessLog: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterPress = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa tu correo y contraseña');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      Alert.alert('Error', 'Por favor ingresa un correo electrónico válido');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const result = await loginUser(email, password); // Llama a la API para iniciar sesión
      Alert.alert('Éxito', 'Inicio de sesión exitoso');
      navigation.navigate('AccessLog'); // Navega a la pantalla de registros de acceso
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo iniciar sesión');
    }
  };

  return (
    <View style={styles.container}>
      {/* Fondo azul con logo y texto */}
      <View style={styles.header}>
        <Image
          source={require('../images/icon.png')} // Ruta del logo
          style={styles.logo}
        />
        <Text style={styles.headerText}>GateGuardian</Text>
      </View>

      {/* Formulario */}
      <View style={styles.form}>
        <Text style={styles.title}>Bienvenido</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#A0AEC0"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A0AEC0"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleLogin}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegisterPress}>
          <Text style={styles.link}>
            ¿No tienes cuenta? <Text style={styles.linkHighlight}>Crea una</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flex: 1,
    backgroundColor: '#3182CE', // Fondo azul
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120, // Tamaño más grande del logo
    height: 120,
    borderRadius: 75, // Hace que el logo sea circular
    backgroundColor: '#FFFFFF', // Fondo blanco para el logo
    marginBottom: 10, // Espaciado entre el logo y el texto
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto blanco
  },
  form: {
    flex: 2,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C5282',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#F7FAFC', // Fondo gris claro
    borderRadius: 25, // Bordes redondeados
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0', // Color del borde más claro
    fontSize: 16,
    color: '#4A5568',
  },
  button: {
    width: '100%',
    backgroundColor: '#3182CE', // Color azul sólido
    paddingVertical: 15,
    borderRadius: 25, // Bordes redondeados
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF', // Texto blanco
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: '#4A5568',
    fontSize: 14,
    textAlign: 'center', // Alineado al centro
  },
  linkHighlight: {
    color: '#3182CE', // Color azul para "Crea una"
    fontWeight: 'bold',
  },
});

export { LoginScreen };