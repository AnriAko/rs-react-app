import type { AxiosError } from 'axios';
import type { SerializedError } from '@reduxjs/toolkit';
import { NullableString } from '~/types/nullable-string';

type RTKQueryError = {
  status?: number;
  data?: unknown;
};

export function handleApiError(
  error: unknown,
  options?: {
    onError?: (message: string) => void;
    clearOnSuccess?: boolean;
    log?: boolean;
  }
): NullableString {
  const { onError, clearOnSuccess = true, log = false } = options ?? {};

  if (!error) {
    if (clearOnSuccess) onError?.('');
    return null;
  }

  const message = extractMessage(error) ?? 'Unknown error occurred';

  if (log) console.error('[API ERROR]', error);
  onError?.(message);

  return message;
}

function extractMessage(error: unknown): NullableString {
  if (isRTKQueryError(error)) {
    const { status, data } = error;
    if (typeof data === 'string') return data;
    if (isObjectWithMessage(data)) return data.message;
    if (status) return `Request failed with status ${status}`;
  }

  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (isObjectWithMessage(data)) return data.message;
    return error.message;
  }

  if (isSerializedError(error)) {
    return error.message ?? null;
  }

  return null;
}

function isRTKQueryError(error: unknown): error is RTKQueryError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'data' in error
  );
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

function isSerializedError(error: unknown): error is SerializedError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  );
}

function isObjectWithMessage(data: unknown): data is { message: string } {
  return (
    typeof data === 'object' &&
    data !== null &&
    'message' in data &&
    typeof (data as { message?: unknown }).message === 'string'
  );
}
