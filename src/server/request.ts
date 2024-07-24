import queryString from 'query-string';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Params {
  cacheTime?: number; // 缓存时间，单位为s。默认强缓存，0为不缓存
  params?: Record<string, any>;
}

interface Props extends Params {
  url: string;
  method: Method;
}

type Config = { next: { revalidate: number } } | { cache: 'no-store' } | { cache: 'force-cache' };

class Request {
  /**
   * 请求拦截器
   */
  interceptorsRequest({ url, method, params, cacheTime }: Props): any {
    // let requestPayload = ''; // 请求体数据

    // 请求头
    const headers = {
      authorization: 'Bearer ...'
    };

    /* 配置缓存 */
    const config: Config =
      cacheTime && cacheTime === 0 ? (cacheTime > 0 ? { next: { revalidate: cacheTime } } : { cache: 'no-store' }) : { cache: 'force-cache' };

    /* 判断请求方式 */
    if (method === 'GET' || method === 'DELETE') {
      // fetch对GET请求等，不支持将参数传在body上，只能拼接url
      if (params) {
        url = `${url}?${queryString.stringify(params)}`;
      }
    }
    // else {
    //   // 非form-data传输JSON数据格式
    //   if (!['[object FormData]', '[object URLSearchParams]'].includes(Object.prototype.toString.call(params))) {
    //     Object.assign(headers, { 'Content-Type': 'application/json' });
    //     requestPayload = JSON.stringify(params);
    //   }
    // }
    return {
      url,
      options: {
        method,
        headers,
        body: method !== 'GET' && method !== 'DELETE' ? params : undefined,
        ...config
      }
    };
  }
}

export const request = new Request();
