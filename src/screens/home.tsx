import 'react-native-get-random-values';

import CosXmlReactNative from 'cos-xml-react-native';
import { Video } from 'expo-av';
import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Button } from 'react-native-elements';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import { v4 as uuidV4 } from 'uuid';

import { useNavigation } from '@react-navigation/core';

import { BUCKET } from '../config';
import { useVideoInfo } from '../hooks/use-video-info';
import { request } from '../util/request';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { fileUri } = useVideoInfo((model) => [model.fileUri]);
  const [progress, setProgress] = useState(0);

  const [{ loading }, upload] = useAsyncFn(async () => {
    let video = '';
    try {
      const uploadResult = await CosXmlReactNative.upload(
        {
          fileUri,
          bucket: BUCKET,
          object: `video/${uuidV4()}.mp4`,
        },
        (processed, sum) => setProgress((100 * processed) / sum)
      );
      setProgress(0);
      video = uploadResult.Location;
    } catch (error) {
      ToastAndroid.show('上传失败！', 3000);
    }
    if (video) {
      try {
        await request.post('/task', {
          video,
        });
        ToastAndroid.show('创建任务成功！', 3000);
      } catch (error) {
        ToastAndroid.show('创建任务失败！', 3000);
      }
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
          shouldPlay
        />
      ) : null}
      <Button
        title={fileUri ? '重新录制' : '录制视频'}
        onPress={() => navigation.navigate('Record')}
      />
      <View style={styles.padding} />
      {fileUri ? (
        <Button
          title={
            loading
              ? `上传中 ${Number.parseInt(progress.toString())}%`
              : '上传识别'
          }
          onPress={upload}
          disabled={loading}
        />
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
