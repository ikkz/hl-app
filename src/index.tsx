import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from './hooks/use-auth';
import { useInitApp } from './hooks/use-init-app';
import { DesktopScreen } from './screens/desktop';
import { HomeScreen } from './screens/home';
import { LoginScreen } from './screens/login';
import { UserScreen } from './screens/user';

const { Navigator, Screen } = createStackNavigator();

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '主页',
        }}
      />
    </HomeStack.Navigator>
  );
}

const DesktopStack = createStackNavigator();

function DesktopStackScreen() {
  return (
    <DesktopStack.Navigator>
      <DesktopStack.Screen
        name="Desktop"
        component={DesktopScreen}
        options={{
          title: '桌面端',
        }}
      />
    </DesktopStack.Navigator>
  );
}

const UserStack = createStackNavigator();

function UserStackScreen() {
  return (
    <UserStack.Navigator>
      <UserStack.Screen
        name="User"
        component={UserScreen}
        options={{
          title: '我的',
        }}
      />
    </UserStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

const TAB_ICON = new Map<string, string>([
  ['Home', 'home'],
  ['Desktop', 'iconfontdesktop'],
  ['User', 'user'],
]);

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          return (
            <Icon
              name={TAB_ICON.get(route.name)!}
              size={size}
              color={focused ? 'black' : color}
            />
          );
        },
      })}
      tabBarOptions={{
        style: { height: 55 },
        labelStyle: {
          paddingBottom: 6,
          color: 'black',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          title: '主页',
        }}
      />
      <Tab.Screen
        name="Desktop"
        component={DesktopStackScreen}
        options={{
          title: '桌面',
        }}
      />
      <Tab.Screen
        name="User"
        component={UserStackScreen}
        options={{
          title: '我的',
        }}
      />
    </Tab.Navigator>
  );
}

export const App: React.FC = () => {
  useInitApp();
  const { loginned } = useAuth((model) => [model.loginned]);

  return loginned ? (
    <NavigationContainer>
      <Navigator>
        <Screen
          name="Tab"
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Screen
          name="Live"
          component={View}
          options={{
            title: '实时识别',
          }}
        />
        <Screen name="Tests" component={View} options={{ title: '测试数据' }} />
        <Screen
          name="TestCase"
          component={View}
          options={{ title: '测试项目' }}
        />
      </Navigator>
    </NavigationContainer>
  ) : (
    <LoginScreen />
  );
};
