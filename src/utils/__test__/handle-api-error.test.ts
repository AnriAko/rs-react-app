import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleApiError } from '../handle-api-error';
import type { AxiosError } from 'axios';
import type { SerializedError } from '@reduxjs/toolkit';

describe('handleApiError', () => {
  let onError: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onError = vi.fn();
  });

  it('returns null and clears error on success (falsy error)', () => {
    const result = handleApiError(null, { onError });
    expect(result).toBeNull();
    expect(onError).toHaveBeenCalledWith('');
  });

  it('handles RTK Query error with string data', () => {
    const error = {
      status: 404,
      data: 'Not Found',
    };

    const result = handleApiError(error, { onError });
    expect(result).toBe('Not Found');
    expect(onError).toHaveBeenCalledWith('Not Found');
  });

  it('handles RTK Query error with object containing message', () => {
    const error = {
      status: 500,
      data: { message: 'Server Error' },
    };

    const result = handleApiError(error, { onError });
    expect(result).toBe('Server Error');
    expect(onError).toHaveBeenCalledWith('Server Error');
  });

  it('handles RTK Query error with no message', () => {
    const error = {
      status: 400,
      data: {},
    };

    const result = handleApiError(error, { onError });
    expect(result).toBe('Request failed with status 400');
    expect(onError).toHaveBeenCalledWith('Request failed with status 400');
  });

  it('handles Axios error with data.message', () => {
    const axiosError = {
      isAxiosError: true,
      message: 'Network Error',
      response: {
        data: {
          message: 'Axios failure',
        },
      },
    } as unknown as AxiosError;

    const result = handleApiError(axiosError, { onError });
    expect(result).toBe('Axios failure');
    expect(onError).toHaveBeenCalledWith('Axios failure');
  });

  it('handles Axios error without response data.message', () => {
    const axiosError = {
      isAxiosError: true,
      message: 'No connection',
      response: {},
    } as unknown as AxiosError;

    const result = handleApiError(axiosError, { onError });
    expect(result).toBe('No connection');
    expect(onError).toHaveBeenCalledWith('No connection');
  });

  it('handles SerializedError with message', () => {
    const error: SerializedError = {
      name: 'CustomError',
      message: 'Serialized failure',
    };

    const result = handleApiError(error, { onError });
    expect(result).toBe('Serialized failure');
    expect(onError).toHaveBeenCalledWith('Serialized failure');
  });

  it('handles unknown error and logs it', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const result = handleApiError(42, { onError, log: true });

    expect(result).toBe('Unknown error occurred');
    expect(onError).toHaveBeenCalledWith('Unknown error occurred');
    expect(spy).toHaveBeenCalledWith('[API ERROR]', 42);

    spy.mockRestore();
  });

  it('does not call onError if not provided', () => {
    const result = handleApiError(
      {
        status: 400,
        data: 'Bad request',
      },
      {}
    );
    expect(result).toBe('Bad request');
  });
});
