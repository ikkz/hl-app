import React from 'react';
import { RefreshControl, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { Avatar, Button, ListItem, Text } from 'react-native-elements';
import useAsyncFn from 'react-use/lib/useAsyncFn';
import useMount from 'react-use/lib/useMount';

import { useNavigation } from '@react-navigation/core';

import { useAuth } from '../hooks/use-auth';
import { Task } from '../interface';
import { commonStyles } from '../util/common-style';
import { request } from '../util/request';

export const UserScreen: React.FC = () => {
  const { navigate } = useNavigation();

  const { user, clearJwt } = useAuth((model) => [
    model.loginned,
    model.user,
    model.clearJwt,
  ]);

  const [{ loading, value }, refresh] = useAsyncFn(async () => {
    try {
      const response = await request.get('/task');
      if (response.data.code) {
        throw Error();
      }
      return response.data.data as Task[];
    } catch (error) {
      ToastAndroid.show('获取任务失败', 2000);
    }
  });

  useMount(refresh);

  return (
    <View style={styles.page}>
      <View style={styles.flexLine}>
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
      <View style={commonStyles.flex1}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refresh} />
          }
        >
          {value
            ? value.map((task) => (
                <ListItem
                  key={task.id}
                  bottomDivider
                  onPress={() =>
                    navigate('Task', {
                      task,
                    })
                  }
                >
                  <ListItem.Content>
                    <ListItem.Title>{task.create_time}</ListItem.Title>
                    <ListItem.Subtitle>
                      {task.complete_time
                        ? `成功转换于${task.complete_time}`
                        : '后台识别中，请耐心等待'}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  flexLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  userName: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 20,
  },
});
