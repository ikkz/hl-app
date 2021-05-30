import { createModel } from 'hox';
import { useCallback, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import useMount from 'react-use/lib/useMount';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { request, requestConfig } from '../util/request';

const JWT_TOKEN_KEY = 'JWT_TOKEN_KEY';

export const useAuth = createModel(() => {
  const [jwt, _setJwt] = useState('');
  const [user, setUser] = useState('');

  const setJwt = useCallback((jwt: string) => {
    AsyncStorage.setItem(JWT_TOKEN_KEY, jwt);
    requestConfig.jwt = jwt;
    _setJwt(jwt);
  }, []);

  const clearJwt = useCallback(() => setJwt(''), []);

  useEffect(() => {
    (async () => {
      if (jwt) {
        try {
          const response = await request.get('/user');
          if (typeof response.data?.data === 'string') {
            setUser(response.data?.data);
          }
        } catch (error) {
          clearJwt();
        }
      }
    })();
  }, [jwt]);

  useMount(async () => {
    const jwtToken = await AsyncStorage.getItem(JWT_TOKEN_KEY);
    console.log('[hlapp] load jwt:', jwtToken);
    if (jwtToken) {
      setJwt(jwtToken);
    }
    requestConfig.onResponse = (response) => {
      if (response.status === 401) {
        ToastAndroid.show('请重新登录', 3000);
        clearJwt();
      }
    };
  });

  return { loginned: !!jwt, jwt, user, setJwt, clearJwt };
});
