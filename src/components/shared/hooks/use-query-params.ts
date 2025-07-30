import { useLocation } from 'react-router';

export function useQueryParams() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}
