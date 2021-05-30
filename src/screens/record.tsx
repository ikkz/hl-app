import { Camera } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigation } from '@react-navigation/core';

import { useVideoInfo } from '../hooks/use-video-info';

export const RecordScreen: React.FC = () => {
  const cameraRef = useRef<Camera>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [recording, setRecording] = useState(false);
  const { setFileUri } = useVideoInfo();
  const navigation = useNavigation();

  const toggleCameraType = () =>
    setType((prevType) => {
      return prevType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back;
    });

  const onRecordPress = () => {
    if (recording) {
      cameraRef.current?.stopRecording();
    } else {
      cameraRef.current
        ?.recordAsync({
          mute: true,
          quality: Camera.Constants.VideoQuality['480p'],
        })
        .then(({ uri }) => setFileUri(uri))
        .then(() => navigation.goBack());
    }
    setRecording(!recording);
  };

  return (
    <View style={styles.page}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <Button
            title="切换摄像头"
            onPress={toggleCameraType}
            disabled={recording}
          />
          <View style={styles.space} />
          <Button
            title={recording ? '停止录制' : '开始录制'}
            onPress={onRecordPress}
          />
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: '100%',
    display: 'flex',
  },
  camera: {
    width: '100%',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    height: '100%',
    justifyContent: 'flex-end',
    marginHorizontal: 20,
    paddingBottom: 40,
  },
  space: {
    height: 20,
  },
});
