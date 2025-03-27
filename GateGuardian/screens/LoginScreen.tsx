import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

// Definir los tipos de estado para email, username, password y confirmPassword
const RegisterScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
        </View>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Regístrate en GateGuardian</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Correo electrónico" 
          keyboardType="email-address" 
          value={email} 
          onChangeText={setEmail} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Nombre de usuario" 
          value={username} 
          onChangeText={setUsername} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Contraseña" 
          secureTextEntry 
          value={password} 
          onChangeText={setPassword} 
        />
        <TextInput 
          style={styles.input} 
          placeholder="Confirmar contraseña" 
          secureTextEntry 
          value={confirmPassword} 
          onChangeText={setConfirmPassword} 
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
