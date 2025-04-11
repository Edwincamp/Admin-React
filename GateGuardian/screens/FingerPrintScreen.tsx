import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const FingerPrintScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isFingerprintRegistered, setIsFingerprintRegistered] = useState(false);

  const handleLongPress = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsFingerprintRegistered(true);
      Alert.alert('Éxito', 'Huella Registrada Correctamente');
    }, 5000); // Simula un escaneo de 5 segundos
  };

  const handleSave = () => {
    if (!name || !isFingerprintRegistered) {
      Alert.alert('Error', 'Por favor, completa el registro de la huella y el nombre.');
      return;
    }

    // Envía los datos de la nueva huella al AccessLogScreen
    navigation.navigate('AccessLog', {
      newFingerprint: { name, method: 'Huella' },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Huella</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#A0AEC0"
        value={name}
        onChangeText={setName}
      />
      <TouchableOpacity
        style={styles.fingerprintContainer}
        onLongPress={handleLongPress}
        disabled={isScanning || isFingerprintRegistered}
      >
        <Image
          source={require('../images/dedo.png')} // Asegúrate de tener esta imagen en tu proyecto
          style={[styles.fingerprintIcon, isScanning && styles.fingerprintScanning]}
        />
        <Text style={styles.fingerprintText}>
          {isScanning
            ? 'Escaneando...'
            : isFingerprintRegistered
            ? 'Huella Registrada Correctamente'
            : 'Mantén presionado para registrar huella'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText }>Guardar</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F0FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C5282',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#CBD5E0',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
    color: '#2D3748',
  },
  fingerprintContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  fingerprintIcon: {
    width: 100,
    height: 100,
    tintColor: '#3182CE',
  },
  fingerprintScanning: {
    tintColor: '#63B3ED', // Cambia el color durante el escaneo
    opacity: 0.5,
  },
  fingerprintText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2C5282',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3182CE',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FingerPrintScreen;