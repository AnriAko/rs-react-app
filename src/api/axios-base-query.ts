import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { isAxiosError, type AxiosRequestConfig } from 'axios';
import { api } from '~/api/axios';

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await api({ url, method, data, params });
      return { data: result.data };
    } catch (err) {
      if (isAxiosError(err)) {
        return {
          error: {
            status: err.response?.status ?? 500,
            data: err.response?.data ?? err.message,
          },
        };
      } else
        return {
          error: {
            status: 500,
            data: (err as Error).message ?? 'Unknown error',
          },
        };
    }
  };
