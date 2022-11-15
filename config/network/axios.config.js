import axios from 'axios';

const API_KEY = "e9f46924771c772a7dd12eb24e227d6b";

const _axios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

_axios.interceptors.request.use(
  function (config) {
    return {
      ...config,
      params: {
        api_key: API_KEY,
        ...config.params,
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  function (response) {
    if (process.env.NODE_ENV === 'development') {
      console.log(response.data);
    }
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default _axios;
