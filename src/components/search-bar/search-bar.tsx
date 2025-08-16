'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function SearchBar() {
  const router = useRouter();
  const params = useSearchParams();

  const [limit, setLimit] = useState(Number(params.get('limit') ?? 20));
  const [page, setPage] = useState(Number(params.get('page') ?? 1));

  const handleSearch = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set('limit', limit.toString());
    newParams.set('page', page.toString());
    router.push(`/search?${newParams.toString()}`);
  };

  return (
    <div>
      <input value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
      <input value={page} onChange={(e) => setPage(Number(e.target.value))} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
