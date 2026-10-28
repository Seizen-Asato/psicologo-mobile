import * as Sharing from "expo-sharing";
import { RefObject } from "react";
import { Alert, Linking, View } from "react-native";
import { captureRef } from "react-native-view-shot";

const pedirAjustes = () => {
  Alert.alert(
    "No disponible",
    "No es posible compartir desde este dispositivo",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Abrir ajustes",
        onPress: () => Linking.openSettings(),
      },
    ],
  );
};

export const compartirTurno = async (cardRef: RefObject<View>) => {
  try {
    const disponible = await Sharing.isAvailableAsync();

    if (!disponible) {
      pedirAjustes();
      return;
    }

    const uri = await captureRef(cardRef.current, {
      format: "png",
      quality: 1,
    });

    await Sharing.shareAsync(uri, {
      mimeType: "image/png",
      dialogTitle: "Compartir turno",
    });
  } catch (error) {
    console.log("ERROR SHARE:", error);
    Alert.alert("Error", "No se pudo compartir el turno");
  }
};
