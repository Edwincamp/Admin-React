import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { getAccessLogs } from "../services/api"; // Importa la función para obtener registros

const AccessLogScreen = ({ navigation, route }) => {
  const [isDoorOpen, setIsDoorOpen] = useState(false); // Estado para la puerta
  const [accessLogs, setAccessLogs] = useState([]); // Estado para los registros de aperturas
  const [registeredFingerprints, setRegisteredFingerprints] = useState([
    "Siddhartha",
    "Teresa",
    "Mauricio",
    "Edwin",
  ]);

  // Detecta si hay una nueva huella registrada y la agrega a la lista
  useEffect(() => {
    if (route.params?.newFingerprint) {
      const { name } = route.params.newFingerprint;
      setRegisteredFingerprints((prev) => [...prev, name]);
    }
  }, [route.params?.newFingerprint]);

  // Obtiene los registros de aperturas desde la API
  useEffect(() => {
    const fetchAccessLogs = async () => {
      try {
        const response = await getAccessLogs(); // Llama a la API
        setAccessLogs(response.logs); // Asigna solo la propiedad "logs" al estado
      } catch (error: any) {
        Alert.alert(
          "Error",
          error.message || "No se pudieron obtener los registros de aperturas"
        );
      }
    };

    fetchAccessLogs();
  }, []);

  const toggleDoorState = () => {
    setIsDoorOpen(!isDoorOpen); // Cambia el estado de la puerta
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bienvenido Paco</Text>
        {/* Icono del estado de la puerta */}
        <TouchableOpacity
          style={styles.doorStateContainer}
          onPress={toggleDoorState}
        >
          <Image
            source={
              isDoorOpen
                ? require("../images/open.png")
                : require("../images/closed.png")
            }
            style={styles.doorIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Tabla de registros */}
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>Número de Aperturas</Text>
        <ScrollView style={styles.tableScroll}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderText}>Fecha y Hora</Text>
              <Text style={styles.tableHeaderText}>Usuario</Text>
              <Text style={styles.tableHeaderText}>Código/Huella</Text>
            </View>
            {accessLogs.map((log, index) => (
              <View key={index} style={styles.tableRow}>
                {/* Formatea el timestamp */}
                <Text style={styles.tableCell}>
                  {new Date(log.timestamp).toLocaleString()}
                </Text>
                <Text style={styles.tableCell}>{log.user_name}</Text>
                <Text
                  style={[
                    styles.tableCell,
                    log.action === "Huella"
                      ? styles.methodHuella
                      : styles.methodCodigo,
                  ]}
                >
                  {log.action}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Huellas registradas */}
      <View style={styles.fingerprintContainer}>
        <Text style={styles.fingerprintTitle}>Huellas Registradas</Text>
        <ScrollView horizontal style={styles.fingerprintScroll}>
          {registeredFingerprints.map((user, index) => (
            <View key={index} style={styles.fingerprintItem}>
              <Image
                source={require("../images/dedo.png")}
                style={styles.fingerprintIcon}
              />
              <Text style={styles.fingerprintText}>Huella de {user}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Botón para agregar huella */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("FingerPrint")} // Navega a FingerPrintScreen
      >
        <Text style={styles.addButtonText}>Agregar huella</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6F0FA",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 8,
    textAlign: "center",
  },
  doorStateContainer: {
    marginTop: 16,
  },
  doorIcon: {
    width: 50,
    height: 50,
  },
  tableContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#CBD5E0",
  },
  tableTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 12,
    textAlign: "center",
  },
  tableScroll: {
    maxHeight: 200,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#CBD5E0",
    paddingBottom: 8,
    marginBottom: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    color: "#4A5568",
    fontSize: 16,
    minWidth: 120,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#E2E8F0",
  },
  tableCell: {
    flex: 1,
    color: "#4A5568",
    fontSize: 14,
    minWidth: 120,
  },
  methodHuella: {
    color: "#3182CE",
    fontWeight: "bold",
  },
  methodCodigo: {
    color: "#38A169",
    fontWeight: "bold",
  },
  fingerprintContainer: {
    marginBottom: 24,
  },
  fingerprintTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2C5282",
    marginBottom: 12,
    textAlign: "center",
  },
  fingerprintScroll: {
    flexDirection: "row",
  },
  fingerprintItem: {
    backgroundColor: "#EBF8FF",
    borderRadius: 25,
    padding: 12,
    borderWidth: 1,
    borderColor: "#BEE3F8",
    alignItems: "center",
    width: 120,
    marginRight: 12,
  },
  fingerprintIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  fingerprintText: {
    color: "#2C5282",
    fontWeight: "500",
    fontSize: 14,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#3182CE",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default AccessLogScreen;
