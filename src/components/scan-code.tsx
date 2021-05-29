import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { useIsFocused } from '@react-navigation/native';

export const ScanCode: React.FC<{ onToken: (token: string) => void }> = ({
  onToken,
}) => {
  const isFocused = useIsFocused();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  const askForPermission = useCallback(async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }, []);

  if (hasPermission === null) {
    return (
      <View style={styles.page}>
        <Text style={styles.hintText}>点击下方按钮扫描设备二维码</Text>
        <Text style={styles.hintText}>如果您还未授权应用相关的必须权限</Text>
        <Text style={styles.hintText}>需要在弹出框中允许后才可以使用哦</Text>
        <Button title="开始识别" onPress={askForPermission} />
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.page}>
        <Text>没有权限访问摄像头</Text>
      </View>
    );
  }
  return isFocused ? (
    <Camera
      style={styles.camera}
      type={Camera.Constants.Type.back}
      barCodeScannerSettings={{
        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
      }}
      onBarCodeScanned={
        scanned
          ? undefined
          : ({ data, type }) => {
              if (type === BarCodeScanner.Constants.BarCodeType.qr) {
                setScanned(true);
                const continueScan = () => setScanned(false);
                if (data.startsWith('hld://')) {
                  Alert.alert(
                    '识别成功',
                    '是否连接到该设备？',
                    [
                      {
                        style: 'default',
                        text: '确认',
                        onPress: () => onToken(data),
                      },
                      {
                        style: 'cancel',
                        text: '取消',
                        onPress: continueScan,
                      },
                    ],
                    {
                      cancelable: false,
                    }
                  );
                } else {
                  Alert.alert(
                    '错误',
                    '不是设备二维码',
                    [
                      {
                        style: 'cancel',
                        text: '取消',
                        onPress: continueScan,
                      },
                    ],
                    {
                      cancelable: false,
                    }
                  );
                }
              }
            }
      }
    />
  ) : null;
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  button: {
    backgroundColor: 'black',
    height: 180,
    width: 360,
    textAlign: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
    height: '100%',
    textAlignVertical: 'center',
  },
  hintText: {
    marginBottom: 10,
  },
  container: {},
  camera: {
    width: '100%',
    height: '100%',
  },
});
