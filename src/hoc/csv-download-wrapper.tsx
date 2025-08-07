import { useMemo } from 'react';

type Props = {
  data: Record<string, string>[];
  children: React.ReactNode;
};

export const CsvDownloadWrapper = ({ data, children }: Props) => {
  const filename = useMemo(() => {
    const count = data.length;
    return count > 0 ? `${count}_items.csv` : 'data.csv';
  }, [data]);

  const href = useMemo(() => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((key) => `"${(row[key] || '').replace(/"/g, '""')}"`)
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    return URL.createObjectURL(blob);
  }, [data]);

  return (
    <a href={href} download={filename}>
      {children}
    </a>
  );
};
