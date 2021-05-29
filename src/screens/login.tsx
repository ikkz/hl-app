import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';

export const LoginScreen: React.FC = () => {
  const [tel, _setTel] = useState('15671398235');
  const setTel = (text: string) => {
    if (text.match(/^\d+$/) || !text.length) {
      _setTel(text);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.loginText}>登录</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'baseline',
        }}
      >
        <View style={{ flex: 1 }}>
          <Input
            inputContainerStyle={{
              borderBottomColor: 'transparent',
            }}
            style={styles.input}
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
          />
        </View>
        <Button title="发送验证码" type="outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 40,
  },
  fieldText: {},
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
