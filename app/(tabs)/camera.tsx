import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import {
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View, Alert } from "react-native";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';
import { predictFruit } from '../../client/frutas';
import { getUserByName, insertPrediccion } from '../../utils/database';
import { useAuth } from "../../context/AuthContext";


const CameraScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const [mode, setMode] = useState<CameraMode>("picture");
  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const router = useRouter();
  const [prediction, setPrediction] = useState<string | null>(null);
  const { user } = useAuth();
  if (!user) {
    // Handle the case where user is null
    return null;
  }
  const usuario = getUserByName(user)as {id:number, name: string, password: string };

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          Necesitamos tus permisos para usar la camara
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) {
      await MediaLibrary.createAssetAsync(photo.uri);
      // Obtener las URIs existentes
      const existingData = await AsyncStorage.getItem('photoData');
      const photoData = existingData ? JSON.parse(existingData) : [];

      // Obtener la predicción de la fruta
      try {
        const result = await predictFruit(photo.uri);
        if (result.probability < 0.40) {
          setPrediction('noFruta');
        }
        setPrediction(result.prediction);


        // Obtener el usuario actual
        if (user&& result.probability > 0.40) {
          insertPrediccion(usuario.id, result.prediction, result.probability);
          console.log('Predicción guardada en la base de datos');
        }

        // Agregar la nueva URI y predicción
        photoData.push({ uri: photo.uri, prediction: result.prediction, probability: result.probability });

        // Guardar el array actualizado en AsyncStorage
        await AsyncStorage.setItem('photoData', JSON.stringify(photoData));

        // Actualizar el estado
        setUri(photo.uri);

        if (result.probability < 0.40) {
          Alert.alert(`Predicción: No es una Fruta`, 'Probabilidad: menor al umbral', [{ text: 'OK', onPress: () => router.push('/home') }]);
        }
        Alert.alert(`Predicción: ${result.prediction}`, `Probabilidad: ${result.probability.toFixed(2)}`, [{ text: 'OK', onPress: () => router.push('/home') }]);
      } catch (error) {
        Alert.alert('Error al predecir la fruta', '', [{ text: 'OK', onPress: () => router.push('/home') }]);
        console.error(error);
      }
    }
  };

  const recordVideo = async () => {
    if (recording) {
      setRecording(false);
      ref.current?.stopRecording();
      return;
    }
    setRecording(true);
    const video = await ref.current?.recordAsync();
    console.log({ video });
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "picture" ? "video" : "picture"));
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };
  return (
    <CameraView
      style={styles.camera}
      ref={ref}
      mode={mode}
      facing={facing}
      mute={false}
      responsiveOrientationWhenOrientationLocked
    >
      <View style={styles.shutterContainer}>
        <Pressable onPress={toggleMode}>
          {mode === "picture" ? (
            <AntDesign name="picture" size={32} color="white" />
          ) : (
            <Feather name="video" size={32} color="white" />
          )}
        </Pressable>
        <Pressable onPress={mode === "picture" ? takePicture : recordVideo}>
          {({ pressed }) => (
            <View
              style={[
                styles.shutterBtn,
                {
                  opacity: pressed ? 0.5 : 1,
                },
              ]}
            >
              <View
                style={[
                  styles.shutterBtnInner,
                  {
                    backgroundColor: mode === "picture" ? "white" : "red",
                  },
                ]}
              />
            </View>
          )}
        </Pressable>
        <Pressable onPress={toggleFacing}>
          <FontAwesome6 name="rotate-left" size={32} color="white" />
        </Pressable>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(59, 58, 58)",
    alignItems: "center",
    justifyContent: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
export default CameraScreen;