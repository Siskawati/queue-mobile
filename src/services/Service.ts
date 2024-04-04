import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { axiosInstance } from "./AxiosInstance";

interface ServiceFunctionConfig<K> extends AxiosRequestConfig {
  onLoading?: () => void;
  onError: (Error: AxiosError) => void;
  onSuccess: (data: AxiosResponse<K>) => void;
  onFinally?: () => void;
}

export function getData<T, K>(
  url: string,
  params: T,
  config: ServiceFunctionConfig<K>
) {
  const { onLoading, onError, onSuccess, onFinally, ...restConfig } = config;

  onLoading && onLoading();
  return axiosInstance
    .get(url, {
      ...restConfig,
      params,
    })
    .then((res) => onSuccess(res))
    .catch((err: AxiosError) => {
      onError && onError(err);
    })
    .finally(() => {
      onFinally && onFinally();
    });
}

export function postData<T extends object, K>(
  url: string,
  data: T,
  config: ServiceFunctionConfig<K>
) {
  const { onLoading, onError, onSuccess, onFinally, ...restConfig } = config;

  onLoading && onLoading();
  return axiosInstance
    .post(url, data, restConfig)
    .then((res) => onSuccess(res))
    .catch((err: AxiosError) => {
      onError && onError(err);
    })
    .finally(() => {
      onFinally && onFinally();
    });
}
