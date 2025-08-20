import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dataParam = searchParams.get('data');

    if (!dataParam) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    const data: Record<string, string>[] = JSON.parse(dataParam);

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    const headers = Object.keys(data[0]);

    const csv = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((key) => `"${(row[key] || '').replace(/"/g, '""')}"`)
          .join(',')
      ),
    ].join('\n');

    const filename = `${data.length}_items.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate CSV' },
      { status: 500 }
    );
  }
}
