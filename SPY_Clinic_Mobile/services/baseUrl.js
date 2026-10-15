import * as Device from "expo-device";
import { Platform } from "react-native";

let BASE_URL;

if (Platform.OS === "android" && !Device.isDevice) {
  // Emulador Android
  BASE_URL = "http://10.0.2.2:5008/api";
} else if (Platform.OS === "web") {
  // Web
  BASE_URL = "http://localhost:5008/api";
} else {
  // Dispositivo físico
  BASE_URL = "http://192.168.100.36:5008/api";
}

export { BASE_URL };
