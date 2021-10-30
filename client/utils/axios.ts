import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { stringify } from 'qs';
import { identity, pickBy } from 'lodash';
import { isPlainObject } from './utils';
import { notificationRequstErrMsg, show401Modal } from './antd_util';
import { downloadBlob } from './helper';

interface IHeader {
  key: string;
  value: string;
}

export enum ContentType {
  default = 'application/x-www-form-urlencoded',
  json = 'application/json',
  formData = 'multipart/form-data',
}

const isDev = process.env.NODE_ENV === 'development';
const isBrower = (global as any).document;
const uheaderObj = {};
const uheader = Object.values(uheaderObj).length ? uheaderObj : undefined;

let baseURL = 'http://localhost:3000'; // http://localhost:3000; http://172.31.20.127:3000
if (!isDev) {
  if (isBrower) {
    baseURL = '/';
  } else {
    baseURL = 'http://xxx.xxx.xxx';
  }
}

class HttpRequest {
  axiosInstance: AxiosInstance;
  uuheader?: Record<string, any>;
  constructor() {
    this.axiosInstance = axios.create({
      // baseURL: process.env.API_URL || '', // http://localhost:7000
      baseURL,
      timeout: 60000,
      // transformRequest: [
      //   (data, headers) => {
      //     // eslint-disable-next-line no-param-reassign
      //     delete headers.common.Authorization;
      //     return data;
      //   },
      // ],
    });

    this.uuheader = uheader;

    this.axiosInstance.defaults.headers['Content-Type'] = ContentType.default;

    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Do something before request is sent
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response.request.responseType === 'blob') {
          // 请求地址包含「isOnLine=true」时不下载
          const isOnLine = (response.request.responseURL as string)?.includes('isOnLine=true');
          const disposition =
            response?.headers?.['content-disposition']?.split('filename=')?.pop() ||
            (response.request.responseURL as string).split('?')?.[0].split('/').pop();
          if (!disposition) {
            notificationRequstErrMsg('未获取到文件信息！');
          } else if (!isOnLine) {
            downloadBlob({
              blob: response.data,
              filename: decodeURIComponent(disposition),
            });
          }
          return { ...response, filename: decodeURIComponent(disposition) };
        }

        const { data = {} } = (response || {}) as any;
        if (data?.status !== 200) {
          notificationRequstErrMsg(getErrMsgSpecial(data) || '出错了');
        }

        if ((response.data as any)?.code === 401) {
          //
        }

        return data;
      },
      (error) => {
        const statusCode = error?.response?.status;
        let msg = error?.response?.data?.msg;
        if (!msg) {
          msg = getErrMsgByStatus(statusCode);
        }
        if (!msg) {
          msg = error?.message;
        }
        const msgDisplay = getErrMsgFromEn(msg) || '出错了';
        if (statusCode !== 401) {
          notificationRequstErrMsg(msgDisplay);
        }

        if (statusCode === 401) {
          show401Modal();
        }
        return Promise.reject(msgDisplay);
      },
    );
  }

  handleErrors = async (request: any) => {
    // return await request();

    try {
      return await request();
    } catch (error) {
      return { msg: error, code: -1 };
      // if (error.response) {
      //   throw new Error(error.response);
      // } else if (error.request) {
      //   throw new Error(error.request);
      // } else {
      //   throw new Error(error);
      // }
    }
  };

  setHeader(header: IHeader) {
    this.axiosInstance.defaults.headers.common[header.key] = header.value;
  }

  deleteHeader(key: string) {
    delete this.axiosInstance.defaults.headers.common[key];
  }

  setUserInfo({ uuheader, loginToken: token }: { uuheader?: Record<string, any>; loginToken?: string }) {
    if (uuheader) {
      this.uuheader = { ...(this.uuheader || {}), ...(uuheader || {}) };
    }
    if (token) {
      this.uuheader = { ...(this.uuheader || {}), loginToken: token };
    }
  }

  get<T>(
    url: string,
    query?: Record<string, string | number>,
    config?: AxiosRequestConfig,
  ): Promise<API.ApiResponse<T>> {
    let newUrl = url;
    const { uuheader, ...newQuery } = query || {};
    if (isPlainObject(newQuery) && Object.keys(newQuery).length) {
      // pickBy(data, identity) -- 去掉值为 null, undefined, '' 的
      newUrl = `${url}?${stringify(pickBy(newQuery, identity))}`;
    }
    return this.handleErrors(() => this.axiosInstance.get<T>(newUrl, config));
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<API.ApiResponse<T>> {
    let newData = data || {};
    const contentType = config?.headers['Content-Type'] || ContentType.default;
    if (contentType === ContentType.default) {
      newData = stringify(data);
    } else if (contentType === ContentType.formData && isPlainObject(data)) {
      newData = new FormData();
      Object.keys(data).forEach((key) => {
        newData.append(key, data[key]);
      });
    }

    return this.handleErrors(() => this.axiosInstance.post<T>(url, newData, config));
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<API.ApiResponse<T>> {
    const newData = data || {};
    return this.handleErrors(() => this.axiosInstance.put<T>(url, newData, config));
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<API.ApiResponse<T>> {
    return this.handleErrors(() => this.axiosInstance.delete<T>(url, config));
  }
}

// ** 一些特殊的英文错误显示成中文 **
function getErrMsgFromEn(msg: string) {
  if (typeof msg !== 'string') {
    return msg;
  }
  switch (true) {
    case msg?.includes('timeout of '):
      return '请求超时';
    case msg?.includes('Network Error'):
      return '网络错误';
    default:
      return msg;
  }
}

// ** 根据 status 状态码显示错误信息 **
function getErrMsgByStatus(status: number) {
  let message = '';
  switch (status) {
    case 400:
      message = '错误请求';
      break;
    case 401:
      message = '未授权，请登录';
      break;
    case 403:
      message = '拒绝访问';
      break;
    case 404:
      message = '请求错误，未找到该资源';
      break;
    case 405:
      message = '请求方法不允许';
      break;
    case 408:
      message = '请求超时';
      break;
    case 500:
      message = '服务器出错了';
      break;
    case 501:
      message = '网络未实现';
      break;
    case 502:
      message = 'Bad Gateway';
      break;
    case 503:
      message = '服务不可用';
      break;
    case 504:
      message = '网络超时';
      break;
    case 505:
      message = 'http版本不支持该请求';
      break;
    default:
  }

  return message;
}

type ErrorField = {
  field: string;
  message: string;
};
// ** 项目特殊 code 对应错误展示 **
function getErrMsgSpecial({ code, msg, data }: { code: number; msg: string; data: ErrorField[] }) {
  let returnMsg = '';
  if (code === 100511) {
    returnMsg = (data || [])
      .map((item: ErrorField) => item?.message)
      .filter((v) => !!v)
      .join('，');
  }

  if (!returnMsg) {
    returnMsg = msg;
  }
  return returnMsg;
}

const httpRequest = new HttpRequest();

export default httpRequest;
