import {
    CameraMode,
    CameraType,
    CameraView,
    useCameraPermissions,
} from "expo-camera";
import { useRef, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import * as MediaLibrary from 'expo-media-library';

export default function LiveRecognice() {
    const ref = useRef<CameraView>(null);
    const [uri, setUri] = useState<string | null>(null);
    const [mode, setMode] = useState<CameraMode>("video");
    const [facing, setFacing] = useState<CameraType>("back");
    const [recording, setRecording] = useState(false);

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

                <Pressable onPress={mode === "video" ? recordVideo : recordVideo}>
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
        left: 125,
        width: "65%",
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