import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image 
            source={require('../images/logo.jpg')} // Ruta correcta al logo
            style={{ width: 120, height: 120, resizeMode: 'contain' }} // Ajusta el tamaño y el estilo del logo
          />
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido a GateGuardian</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Usuario o correo electrónico" 
          keyboardType="email-address" 
          value={email} 
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>

        {/* Enlace para recuperar contraseña */}
        <TouchableOpacity>
          <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Enlace para registrarse */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.link}>No tienes cuenta? <Text style={{ fontWeight: 'bold' }}>Crea una</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
