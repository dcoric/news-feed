import axios from 'axios';
import { set } from 'lodash';
import { API_KEY, NEWS_COUNTRY } from './constants';
import { updateQueryStringParameter } from './utils/urlOperations';

// newsapi.org does not allow localhost in cors settings. To bypass this, we are using request proxy:
const CORS_PROXY_URL = process.env.NODE_ENV === 'development' ? 'https://cors-anywhere.citadel.red/' : '';
const API_ROUTE = `${CORS_PROXY_URL}https://newsapi.org/v2/`;

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
  constructor (options) {
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

  getStorageItem (name) {
    try {
      return localStorage.getItem(name) || sessionStorage.getItem(name);
    } catch (error) {
      console.error(error);
    }
  }

  setInterceptors () {
    this.axios.interceptors.request.use((config) => {
      const selectedCountry = sessionStorage.getItem(NEWS_COUNTRY) || 'GB';
      config.url = updateQueryStringParameter(config.url, 'country', selectedCountry.toLocaleLowerCase());
      // config.url = updateQueryStringParameter(config.url, 'apiKey', API_KEY);
      set(config, 'headers.Authorization', `Bearer ${API_KEY}`);
      return config;
    });
  }

  request (async, method, url, params = null, data = null, successCb = null, errorCb = null, headers = null, responseType = null, paramsSerializer = null) {
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

  get (url, params, successCb = null, errorCb = null, headers = null, paramsSerializer = null, responseType = null) {
    // if success or error callback is not set will return promise
    const async = !successCb || !errorCb;
    return this.request(async, 'get', url, params, null, successCb, errorCb, headers, responseType, paramsSerializer);
  }

  post (url, data, successCb = null, errorCb = null, headers = null, params = null, paramsSerializer = null, responseType = null) {
    const async = !successCb || !errorCb;
    return this.request(async, 'post', url, params, data, successCb, errorCb, headers, responseType, paramsSerializer);
  }

  put (url, data, successCb = null, errorCb = null, headers = null) {
    const async = !successCb || !errorCb;
    return this.request(async, 'put', url, null, data, successCb, errorCb, headers);
  }

  patch (url, data, successCb = null, errorCb = null, headers = null) {
    const async = !successCb || !errorCb;
    return this.request(async, 'patch', url, null, data, successCb, errorCb, headers);
  }

  delete (url, data = {}, successCb = null, errorCb = null) {
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
