import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from "react-native";

export default function ClaveTemporalScreen() {
  // Estado para las claves, el nombre de usuario, los minutos y los segundos
  const [claves, setClaves] = useState<{ clave: string; tiempo: number; usuario: string }[]>([]);
  const [usuario, setUsuario] = useState('');
  const [minutos, setMinutos] = useState('');
  const [segundos, setSegundos] = useState('');

  // Función para generar una clave aleatoria de 8 dígitos
  function generarClave() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  // Función para manejar la generación de la clave
  function manejarGenerarClave() {
    if (!usuario || (!minutos && !segundos)) {
      Alert.alert('Error', 'Por favor ingresa el nombre de usuario y el tiempo estimado');
      return;
    }

    const tiempoTotal = (Number(minutos) || 0) * 60 + (Number(segundos) || 0);

    if (isNaN(tiempoTotal) || tiempoTotal <= 0) {
      Alert.alert('Error', 'El tiempo estimado debe ser un número válido mayor a 0');
      return;
    }

    const nuevaClave = generarClave();
    setClaves((prevClaves) => [...prevClaves, { clave: nuevaClave, tiempo: tiempoTotal, usuario }]);
    Alert.alert('Clave Generada', `Usuario: ${usuario}\nClave: ${nuevaClave}\nTiempo estimado: ${formatearTiempo(tiempoTotal)}`);
  }

  // Efecto para manejar el contador de todas las claves
  useEffect(() => {
    const interval = setInterval(() => {
      setClaves((prevClaves) => {
        const nuevasClaves = prevClaves.map((item) => ({
          ...item,
          tiempo: item.tiempo > 0 ? item.tiempo - 1 : 0, // Reducir el tiempo en 1 segundo
        }));

        // Verificar si alguna clave ha llegado a 0 y mostrar un mensaje
        nuevasClaves.forEach((item) => {
          if (item.tiempo === 0) {
            Alert.alert('Clave Finalizada', `La clave del usuario ${item.usuario} : ${item.clave} ha expirado.`);
          }
        });

        // Filtrar claves con tiempo mayor a 0
        return nuevasClaves.filter((item) => item.tiempo > 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Función para formatear el tiempo en minutos y segundos
  function formatearTiempo(segundos: number) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? '0' : ''}${segundosRestantes}`;
  }

  return (
    <View style={styles.container}>
      {/* Formulario para ingresar el nombre de usuario */}
      <Text style={styles.label}>Nombre de Usuario:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre de usuario"
        placeholderTextColor="#A0AEC0"
        value={usuario}
        onChangeText={setUsuario}
      />

      {/* Formulario para ingresar los minutos */}
      <Text style={styles.label}>Minutos:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa los minutos"
        placeholderTextColor="#A0AEC0"
        keyboardType="numeric"
        value={minutos}
        onChangeText={setMinutos}
      />

      {/* Formulario para ingresar los segundos */}
      <Text style={styles.label}>Segundos:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa los segundos"
        placeholderTextColor="#A0AEC0"
        keyboardType="numeric"
        value={segundos}
        onChangeText={setSegundos}
      />

      {/* Botón para generar la clave */}
      <TouchableOpacity style={styles.button} onPress={manejarGenerarClave}>
        <Text style={styles.buttonText}>Generar Clave</Text>
      </TouchableOpacity>

      {/* Mostrar las claves generadas */}
      <FlatList
        data={claves}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Usuario:</Text>
            <Text style={styles.resultValue}>{item.usuario}</Text>
            <Text style={styles.resultText}>Clave Generada:</Text>
            <Text style={styles.resultValue}>{item.clave}</Text>
            <Text style={styles.resultText}>Tiempo Restante:</Text>
            <Text style={styles.resultValue}>{formatearTiempo(item.tiempo)}</Text>
          </View>
        )}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#2C5282",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#F7FAFC",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    fontSize: 16,
    color: "#4A5568",
  },
  button: {
    backgroundColor: "#3182CE",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2C5282",
  },
  resultValue: {
    fontSize: 18,
    color: "#4A5568",
    marginTop: 5,
  },
});