import { renderHook } from '@testing-library/react';
import { useLocalStorage } from '~/hooks/use-local-storage';

describe('useLocalStorage', () => {
  const KEY = 'test-key';

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return null if no value is stored', () => {
    const { result } = renderHook(() => useLocalStorage<string>(KEY));
    expect(result.current.getValue()).toBeNull();
  });

  it('should store and retrieve a value', () => {
    const { result } = renderHook(() => useLocalStorage<number>(KEY));

    result.current.setValue(42);

    expect(localStorage.getItem(KEY)).toBe('42');
    expect(result.current.getValue()).toBe(42);
  });

  it('should remove the value', () => {
    const { result } = renderHook(() => useLocalStorage<string>(KEY));

    result.current.setValue('hello');
    expect(localStorage.getItem(KEY)).toBe('"hello"');

    result.current.removeValue();
    expect(localStorage.getItem(KEY)).toBeNull();
  });

  it('should handle JSON parse error gracefully', () => {
    localStorage.setItem(KEY, 'invalid json');

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage<object>(KEY));
    expect(result.current.getValue()).toBeNull();
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error reading localStorage key`),
      expect.any(SyntaxError)
    );

    warnSpy.mockRestore();
  });

  it('should handle localStorage.setItem error gracefully', () => {
    const error = new Error('setItem error');
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw error;
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage<string>(KEY));
    result.current.setValue('test');

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error writing localStorage key`),
      error
    );

    warnSpy.mockRestore();
    vi.restoreAllMocks();
  });

  it('should handle localStorage.removeItem error gracefully', () => {
    const error = new Error('removeItem error');
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw error;
    });
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage<string>(KEY));
    result.current.removeValue();

    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(`Error removing localStorage key`),
      error
    );

    warnSpy.mockRestore();
    vi.restoreAllMocks();
  });
});
