import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { registerUser } from '../services/api'; // Importa la función de registro desde api.ts

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
};

type RegisterScreenProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const result = await registerUser(email, password); // Llama a la API para registrar el usuario
      Alert.alert('Éxito', 'Usuario creado correctamente', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'), // Navega a la pantalla de inicio de sesión
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo registrar el usuario');
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
        <Text style={styles.title}>Crea tu cuenta</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#A0AEC0"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>
            ¿Ya tienes cuenta? <Text style={styles.linkHighlight}>Inicia sesión</Text>
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
    color: '#3182CE', // Color azul para "Inicia sesión"
    fontWeight: 'bold',
  },
});

export default RegisterScreen;