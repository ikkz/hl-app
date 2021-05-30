import { Video } from 'expo-av';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { useRoute } from '@react-navigation/core';

import { Task } from '../interface';
import { commonStyles } from '../util/common-style';

export const TaskScreen: React.FC = () => {
  const { params } = useRoute();
  const task: Task = (params as any)?.['task'];
  return (
    <View style={styles.page}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            识别结果：{task.result ?? '暂未识别完成'}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>创建于：{task.create_time}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>
            完成于：{task.complete_time ?? '暂未识别完成'}
          </ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title>视频回放：</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <Video
        style={commonStyles.flex1}
        source={{
          uri: task.video,
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        shouldPlay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
});
