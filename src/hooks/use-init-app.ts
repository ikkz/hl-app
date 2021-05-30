import CosXmlReactNative from 'cos-xml-react-native';
import { createModel } from 'hox';
import { useEffect } from 'react';

import { request } from '../util/request';
import { useAuth } from './use-auth';

export function useInitApp() {
  const { jwt } = useAuth((model) => [model.jwt]);

  useEffect(() => {
    if (jwt) {
      CosXmlReactNative.initWithSessionCredentialCallback(
        {
          region: 'ap-shanghai',
        },
        async () => {
          // 请求临时密钥
          const responseJson = (await request.get('/sts'))?.data?.data;
          const credentials = responseJson.credentials;
          const expiredTime = responseJson.expiredTime;
          const sessionCredentials = {
            tmpSecretId: credentials.tmpSecretId,
            tmpSecretKey: credentials.tmpSecretKey,
            expiredTime: expiredTime,
            sessionToken: credentials.sessionToken,
          };
          return sessionCredentials;
        }
      );
    }
  }, [jwt]);
}
