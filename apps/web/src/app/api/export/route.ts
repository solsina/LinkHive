import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@linkhive/database';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'analytics'; // analytics, pages, qr_codes, short_links
    const format = searchParams.get('format') || 'json'; // json, csv
    const timeRange = searchParams.get('timeRange') || '30d';
    const profileId = searchParams.get('profile_id');

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    switch (timeRange) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    let data: any[] = [];
    let filename = '';

    switch (type) {
      case 'analytics':
        let query = supabaseAdmin
          .from('analytics')
          .select(`
            *,
            profiles:profile_id(title, slug),
            links:link_id(title, url),
            qr_codes:qr_code_id(name, content),
            short_links:short_link_id(title, original_url)
          `)
          .gte('created_at', startDate.toISOString())
          .order('created_at', { ascending: false });

        if (profileId) {
          query = query.eq('profile_id', profileId);
        }

        const { data: analyticsData, error: analyticsError } = await query;
        if (analyticsError) {
          console.error('Error fetching analytics data:', analyticsError);
          return NextResponse.json({ error: 'Failed to fetch analytics data' }, { status: 500 });
        }
        data = analyticsData || [];
        filename = `analytics_${timeRange}_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'pages':
        const { data: pagesData, error: pagesError } = await supabaseAdmin
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (pagesError) {
          console.error('Error fetching pages data:', pagesError);
          return NextResponse.json({ error: 'Failed to fetch pages data' }, { status: 500 });
        }
        data = pagesData || [];
        filename = `pages_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'qr_codes':
        const { data: qrData, error: qrError } = await supabaseAdmin
          .from('qr_codes')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (qrError) {
          console.error('Error fetching QR codes data:', qrError);
          return NextResponse.json({ error: 'Failed to fetch QR codes data' }, { status: 500 });
        }
        data = qrData || [];
        filename = `qr_codes_${new Date().toISOString().split('T')[0]}`;
        break;

      case 'short_links':
        const { data: shortLinksData, error: shortLinksError } = await supabaseAdmin
          .from('short_links')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });

        if (shortLinksError) {
          console.error('Error fetching short links data:', shortLinksError);
          return NextResponse.json({ error: 'Failed to fetch short links data' }, { status: 500 });
        }
        data = shortLinksData || [];
        filename = `short_links_${new Date().toISOString().split('T')[0]}`;
        break;

      default:
        return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
    }

    if (format === 'csv') {
      const csvContent = convertToCSV(data);
      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="${filename}.csv"`,
        },
      });
    } else {
      return NextResponse.json(data, {
        headers: {
          'Content-Disposition': `attachment; filename="${filename}.json"`,
        },
      });
    }
  } catch (error) {
    console.error('Error in GET /api/export:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';

  const headers = Object.keys(data[0]);
  const csvRows = [headers.join(',')];

  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      if (value === null || value === undefined) {
        return '';
      }
      if (typeof value === 'object') {
        return JSON.stringify(value).replace(/"/g, '""');
      }
      return String(value).replace(/"/g, '""');
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}
