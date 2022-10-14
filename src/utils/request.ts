import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import { urlConfig } from "../config/index";
import { useBugStore } from "@/stores/bug";

const service: AxiosInstance = axios.create({
  baseURL: urlConfig.baseUrl,
  timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // console.log("请求拦截器-config", config);
    const token = localStorage.getItem("Authorization");

    if (token && config?.headers) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error: AxiosError) => {
    // console.log("请求拦截器-error", error);
    return Promise.reject();
  }
);

// 响应拦截器
// 需求：接口报错（404、405、500...）时，在 Pinia 中记录报错的接口名称和报错信息
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // console.log("响应拦截器-response", response);
    let requestUrl = "";
    if (response.config.url) {
      requestUrl = response.config.url;
    }

    let requestMsg = "";
    if (response.data.message && response.data?.code) {
      requestMsg = `(${response.data.code}) ${response.data.message}`;
    }

    // 在响应拦截器中使用使用实例。写在外面的话，Pinia 未挂载，会报错。
    const bugStore = useBugStore();

    if (response.data.code === 200) {
      // 修改 Pinia 数据
      bugStore.addBug({ url: requestUrl, msg: "" });
    } else {
      bugStore.addBug({ url: requestUrl, msg: requestMsg });
    }

    return response;
  },
  (error: AxiosError) => {
    // console.log("响应拦截器-error", error);
    let requestUrl = "";
    if (error && error.config && error.config.url) {
      requestUrl = error.config.url;
    }

    let requestMsg = "";
    if (error.message && error.response?.status && error.response.statusText) {
      requestMsg = `(${error.response.status} ${error.response.statusText}) ${error.message}`;
    }

    // 在响应拦截器中使用使用实例。写在外面的话，Pinia 未挂载，会报错。
    const bugStore = useBugStore();

    bugStore.addBug({ url: requestUrl, msg: requestMsg });

    return Promise.reject();
  }
);

export default service;
