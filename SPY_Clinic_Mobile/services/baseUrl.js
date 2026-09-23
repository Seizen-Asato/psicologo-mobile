import * as Device from "expo-device";
import { Platform } from "react-native";

const API_URL_DEVICE = process.env.EXPO_PUBLIC_API_URL_DEVICE;
const API_URL_EMULATOR = process.env.EXPO_PUBLIC_API_URL_EMULATOR;
const API_URL_WEB = process.env.EXPO_PUBLIC_API_URL_WEB;

let baseUrl;

if (Platform.OS === "android" && !Device.isDevice) {
  baseUrl = API_URL_EMULATOR;
} else if (Platform.OS === "web") {
  baseUrl = API_URL_WEB;
} else {
  baseUrl = API_URL_DEVICE;
}

if (!baseUrl) {
  throw new Error(
    "Falta configurar la URL de la API. Revisa las variables EXPO_PUBLIC_API_URL_* en el archivo .env."
  );
}

const BASE_URL = baseUrl;

export { BASE_URL };
