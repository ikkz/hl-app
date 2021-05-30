import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Text } from 'react-native-elements';

import { useAuth } from '../hooks/use-auth';

export const UserScreen: React.FC = () => {
  const { user, clearJwt } = useAuth((model) => [
    model.loginned,
    model.user,
    model.clearJwt,
  ]);

  return (
    <View>
      <View style={styles.avatarLine}>
        <Avatar
          size="medium"
          rounded
          avatarStyle={{ overlayColor: 'black' }}
          icon={{
            type: 'ant-design',
            name: 'user',
          }}
        />
        <Text style={styles.userName}>{user}</Text>
        <Button title="退出登录" type="outline" onPress={clearJwt} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  userName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
});
