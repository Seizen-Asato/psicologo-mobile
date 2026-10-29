import * as Device from "expo-device";
import { Platform } from "react-native";

// ⚠️ Actualizar cuando cambie la IP de la PC.
// Verificar con: ipconfig (buscar "Dirección IPv4" del adaptador activo)
const LAN_IP = "192.168.100.36";
const PORT = "5008";

let BASE_URL;

if (Platform.OS === "android" && !Device.isDevice) {
  // Emulador Android (10.0.2.2 mapea al localhost de la PC host)
  BASE_URL = `http://10.0.2.2:${PORT}/api`;
} else if (Platform.OS === "web") {
  // Web (corre en el navegador de la misma PC)
  BASE_URL = `http://localhost:${PORT}/api`;
} else {
  // Dispositivo físico (debe estar en la misma red Wi-Fi que la PC)
  BASE_URL = `http://${LAN_IP}:${PORT}/api`;
}

export { BASE_URL };
