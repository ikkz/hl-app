import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { ScanCode } from '../components/scan-code';
import { useSync } from '../hooks/create-sync-value';
import { useEmit } from '../hooks/use-hl-event';
import { useSocketIo } from '../hooks/use-socket-io';

export const DesktopScreen: React.FC = () => {
  const { deviceConnected, socket, initSocket } = useSocketIo();
  const [startStopDisabled] = useSync.StartStopDisabled();
  const [collect] = useSync.Collect();
  const [uploadDisabled] = useSync.UploadDisabled();
  const emitEvent = useEmit();
  return deviceConnected ? (
    <View style={styles.page}>
      <Button
        disabled={startStopDisabled}
        onPress={() => emitEvent('reco_btn')}
        title={collect ? '结束识别' : '开始识别'}
      />
      <View style={styles.space} />
      <Button
        title="上传识别"
        disabled={uploadDisabled}
        onPress={() => emitEvent('upload')}
      />
      <View style={styles.space} />
      <Button
        onPress={() => socket?.close()}
        title="断开连接"
        style={{ backgroundColor: 'red' }}
      />
    </View>
  ) : (
    <ScanCode onToken={initSocket} />
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    padding: 60,
  },
  space: {
    height: 20,
  },
});
