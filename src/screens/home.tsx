import CosXmlReactNative from 'cos-xml-react-native';
import { AVPlaybackStatus, Video } from 'expo-av';
import React, { useRef } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Button } from 'react-native-elements';
import useAsyncFn from 'react-use/lib/useAsyncFn';

import { useNavigation } from '@react-navigation/core';

import { useVideoInfo } from '../hooks/use-video-info';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { fileUri } = useVideoInfo((model) => [model.fileUri]);

  const [{ loading }, upload] = useAsyncFn(async () => {
    try {
    } catch (error) {
      ToastAndroid.show('上传失败！', 3000);
    }
  }, [fileUri]);

  return (
    <View style={styles.page}>
      {fileUri ? (
        <Video
          style={styles.video}
          source={{
            uri: fileUri,
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
      ) : null}
      <Button
        title={fileUri ? '重新录制' : '录制视频'}
        onPress={() => navigation.navigate('Record')}
      />
      <View style={styles.padding} />
      {fileUri ? (
        <Button title="上传识别" onPress={upload} loading={loading} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    padding: 50,
  },
  video: {
    height: 400,
    marginBottom: 25,
  },
  padding: {
    height: 25,
  },
});
