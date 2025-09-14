import axios from 'axios';
import { set } from 'lodash';
import { API_KEY, NEWS_COUNTRY } from './constants';
import { updateQueryStringParameter } from './utils/urlOperations';

// newsapi.org does not allow localhost in cors settings. To bypass this, we are using our own proxy server:
const PROXY_URL = process.env.REACT_APP_PROXY_URL || 'http://localhost:3001';
const API_ROUTE = process.env.NODE_ENV === 'development' ? `${PROXY_URL}/api/news/` : 'https://newsapi.org/v2/';

// The two 'no-cache' headers below prevent IE from caching AJAX GET requests
const defaultHeaders = {
  'Cache-Control': 'no-cache',
  Pragma: 'no-cache'
};
Object.freeze(defaultHeaders);

const defaultOptions = {
  baseURL: `${API_ROUTE}`
};

class AxiosService {
  private axios: any;
  private static instance: AxiosService;

  constructor (options?: any) {
    if (options) {
      this.axios = axios.create(options);
      this.setInterceptors();
      return this;
    }

    if (!AxiosService.instance) {
      AxiosService.instance = this;
      this.axios = axios.create(defaultOptions);
      this.setInterceptors();
    }

    return AxiosService.instance;
  }

  getStorageItem (name: string) {
    try {
      return localStorage.getItem(name) || sessionStorage.getItem(name);
    } catch (error) {
      console.error(error);
    }
  }

  setInterceptors () {
    this.axios.interceptors.request.use((config) => {
      const selectedCountry = sessionStorage.getItem(NEWS_COUNTRY) || 'GB';
      if (config.url) {
        config.url = updateQueryStringParameter(config.url, 'country', selectedCountry.toLocaleLowerCase());
        // config.url = updateQueryStringParameter(config.url, 'apiKey', API_KEY);
      }
      set(config, 'headers.Authorization', `Bearer ${API_KEY}`);
      return config;
    });
  }

  request (async: any, method: any, url: any, params = null, data = null, successCb = null, errorCb = null, headers = null, responseType = null, paramsSerializer = null): any {
    method = method.toLowerCase();
    const request = this.axios.request({
      url,
      data,
      params,
      method,
      headers,
      responseType,
      paramsSerializer
    });
    return async ? request : request.then(successCb).catch(errorCb);
  }

  get (url: any, params: any, successCb = null, errorCb = null, headers = null, paramsSerializer = null, responseType = null): any {
    // if success or error callback is not set will return promise
    const async = !successCb || !errorCb;
    return this.request(async, 'get', url, params, null, successCb, errorCb, headers, responseType, paramsSerializer);
  }

  post (url: any, data: any, successCb = null, errorCb = null, headers = null, params = null, paramsSerializer = null, responseType = null): any {
    const async = !successCb || !errorCb;
    return this.request(async, 'post', url, params, data, successCb, errorCb, headers, responseType, paramsSerializer);
  }

  put (url: any, data: any, successCb = null, errorCb = null, headers = null): any {
    const async = !successCb || !errorCb;
    return this.request(async, 'put', url, null, data, successCb, errorCb, headers);
  }

  patch (url: any, data: any, successCb = null, errorCb = null, headers = null): any {
    const async = !successCb || !errorCb;
    return this.request(async, 'patch', url, null, data, successCb, errorCb, headers);
  }

  delete (url: any, data: any = {}, successCb = null, errorCb = null): any {
    const async = !successCb || !errorCb;
    return this.request(async, 'delete', url, null, data, successCb, errorCb);
  }
}

const axiosInstance = new AxiosService();
Object.freeze(axiosInstance);

export default axiosInstance;

export {
  axiosInstance,
  AxiosService,
  defaultHeaders
};
