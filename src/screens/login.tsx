import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import useAsyncFn from 'react-use/lib/useAsyncFn';

import { useAuth } from '../hooks/use-auth';
import { request } from '../util/request';

const LoginCompoent: React.FC = () => {
  const { setJwt } = useAuth((model) => [model.setJwt]);
  const [tel, _setTel] = useState('15671398235');
  const setTel = (text: string) => {
    if (text.match(/^\d+$/) || !text.length) {
      _setTel(text);
    }
  };

  const [{ loading: sendCodeLoading }, sendCode] = useAsyncFn(async () => {
    try {
      const response = await request.post('/send-code', { tel });
      if (response.data?.code) {
        throw new Error();
      }
      ToastAndroid.show('发送成功', 2000);
    } catch (error) {
      ToastAndroid.show('发送验证码出错', 2000);
    }
  }, [tel]);

  const [code, _setCode] = useState('');

  const setCode = (text: string) => {
    if (text.match(/^\d+$/) || !text.length) {
      _setCode(text);
    }
  };

  const [{ loading: loginLoading }, login] = useAsyncFn(async () => {
    try {
      const response = await request.post('/auth', {
        username: tel,
        password: code,
      });
      if (response.data?.access_token) {
        setJwt(response.data.access_token);
        ToastAndroid.show('登录成功', 2000);
      }
    } catch (error) {
      ToastAndroid.show('登录失败', 2000);
    }
  }, [tel, code]);

  return (
    <View style={styles.page}>
      <Text style={styles.loginText}>登录</Text>
      <View style={styles.telField}>
        <View style={{ flex: 1 }}>
          <Input
            inputContainerStyle={{
              borderBottomColor: 'transparent',
            }}
            value={tel}
            onChangeText={setTel}
            textContentType="telephoneNumber"
            placeholder="请输入您的手机号码"
            leftIcon={{
              type: 'ant-design',
              name: 'phone',
            }}
            leftIconContainerStyle={{
              marginRight: 5,
            }}
            disabled={loginLoading}
          />
        </View>
        <Button
          title="发送验证码"
          type="outline"
          disabled={tel.length !== 11 || loginLoading}
          onPress={sendCode}
          loading={sendCodeLoading}
        />
      </View>
      <Input
        inputContainerStyle={{
          borderBottomColor: 'transparent',
        }}
        value={code}
        onChangeText={setCode}
        placeholder="请输入验证码"
        leftIcon={{
          type: 'ant-design',
          name: 'key',
        }}
        leftIconContainerStyle={{
          marginRight: 5,
        }}
        disabled={loginLoading}
      />
      <Button title="登录" loading={loginLoading} onPress={login} />
    </View>
  );
};

export const LoginScreen: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      const { status: s1 } = await Camera.requestPermissionsAsync();
      const { status: s2 } = await Audio.requestPermissionsAsync();
      setHasPermission(s1 === 'granted' && s2 === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>没有权限访问摄像头与麦克风，请前往设置页面允许。</Text>;
  }

  return <LoginCompoent />;
};

const styles = StyleSheet.create({
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  telField: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  input: {
    padding: 0,
    margin: 0,
  },
  page: {
    paddingTop: 100,
    paddingHorizontal: 45,
    width: '100%',
    height: '100%',
  },
});
