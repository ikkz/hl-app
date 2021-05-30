import { bind, merge, noop } from 'lodash-es';

export const requestConfig = {
  baseURL: 'http://thl.ketra.fun:5000',
  jwt: '',
  onResponse: noop,
};

const _fetch = async (method: string, url: string, body?: object) => {
  const response = await fetch(
    requestConfig.baseURL + url,
    merge(
      {
        method,
      },
      body
        ? {
            body: JSON.stringify(body),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        : null,
      {
        headers: {
          Authorization: `JWT ${requestConfig.jwt}`,
        },
      }
    )
  );
  requestConfig.onResponse(response);
  try {
    return Object.assign(response, { data: await response.json() });
  } catch (error) {}
  return response;
};

export const request = {
  get: bind(_fetch, undefined, 'get'),
  post: bind(_fetch, undefined, 'post'),
  delete: bind(_fetch, undefined, 'delete'),
};
