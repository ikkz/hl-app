import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { ScanCode } from '../components/scan-code';
import { useSync } from '../hooks/create-sync-value';
import { useEmit } from '../hooks/use-hl-event';
import { useSocketIo } from '../hooks/use-socket-io';

export const DesktopScreen: React.FC = () => {
  const { deviceConnected, socket, initSocket } = useSocketIo();
  const [disbled] = useSync.Disabled();
  const [collect] = useSync.Collect();
  const [delay, setDelay] = useSync.Delay();
  const emitEvent = useEmit();
  return deviceConnected ? (
    <View style={styles.page}>
      <Button
        disabled={disbled}
        onPress={() => emitEvent('reco_btn')}
        title={collect ? '结束识别' : '开始识别'}
      />
      <Button
        onPress={() => socket?.close()}
        title="取消连接"
        style={{ backgroundColor: 'red' }}
      />
      <View style={styles.setting}>
        <Text>启动延迟：{delay}</Text>
        <Button onPress={() => setDelay(delay - 1)} title="-" />
        <Button onPress={() => setDelay(delay + 1)} title="+" />
      </View>
    </View>
  ) : (
    <ScanCode onToken={initSocket} />
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  setting: { display: 'flex', flexDirection: 'row' },
});
