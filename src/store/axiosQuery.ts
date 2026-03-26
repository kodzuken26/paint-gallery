// services/axiosBaseQuery.ts
import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';

// Создаем экземпляр axios с базовыми настройками
const axiosInstance = axios.create({
  baseURL: 'https://test-front.framework.team/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Тип для аргументов запроса
interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig['method'];
  data?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
}

// Тип для возвращаемого значения
type AxiosBaseQueryResult = BaseQueryFn<AxiosBaseQueryArgs, unknown, unknown>;

// Кастомный baseQuery для RTK Query
export const axiosBaseQuery = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): AxiosBaseQueryResult => {
  return async ({ url, method = 'GET', data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};