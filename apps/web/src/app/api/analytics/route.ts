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
    const timeRange = searchParams.get('timeRange') || '30d';
    const profileId = searchParams.get('profileId');

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

    // Build query conditions
    let query = supabaseAdmin
      .from('analytics')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .lte('created_at', now.toISOString());

    if (profileId) {
      query = query.eq('profile_id', profileId);
    }

    const { data: analytics, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching analytics:', error);
      return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }

    // Process analytics data
    const processedData = processAnalyticsData(analytics, timeRange);

    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error in GET /api/analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function processAnalyticsData(analytics: any[], timeRange: string) {
  // Group by event type
  const eventCounts = analytics.reduce((acc, event) => {
    acc[event.event_type] = (acc[event.event_type] || 0) + 1;
    return acc;
  }, {});

  // Group by date for time series
  const dailyData = analytics.reduce((acc, event) => {
    const date = new Date(event.created_at).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = {
        date,
        views: 0,
        clicks: 0,
        unique_visitors: new Set(),
      };
    }
    
    if (event.event_type === 'profile_view') {
      acc[date].views++;
      acc[date].unique_visitors.add(event.visitor_id);
    } else if (event.event_type === 'link_click') {
      acc[date].clicks++;
      acc[date].unique_visitors.add(event.visitor_id);
    }
    
    return acc;
  }, {});

  // Convert unique_visitors sets to counts
  Object.values(dailyData).forEach((day: any) => {
    day.unique_visitors = day.unique_visitors.size;
  });

  // Get top performing profiles
  const profileStats = analytics.reduce((acc, event) => {
    if (event.profile_id) {
      if (!acc[event.profile_id]) {
        acc[event.profile_id] = {
          profile_id: event.profile_id,
          profile_name: event.profile_name || 'Unknown',
          views: 0,
          clicks: 0,
        };
      }
      
      if (event.event_type === 'profile_view') {
        acc[event.profile_id].views++;
      } else if (event.event_type === 'link_click') {
        acc[event.profile_id].clicks++;
      }
    }
    return acc;
  }, {});

  // Get top performing links
  const linkStats = analytics.reduce((acc, event) => {
    if (event.link_id && event.event_type === 'link_click') {
      if (!acc[event.link_id]) {
        acc[event.link_id] = {
          link_id: event.link_id,
          link_title: event.link_title || 'Unknown',
          clicks: 0,
        };
      }
      acc[event.link_id].clicks++;
    }
    return acc;
  }, {});

  // Calculate totals
  const totalViews = eventCounts.profile_view || 0;
  const totalClicks = eventCounts.link_click || 0;
  const totalUniqueVisitors = new Set(analytics.map(event => event.visitor_id)).size;
  const clickThroughRate = totalViews > 0 ? (totalClicks / totalViews * 100).toFixed(2) : 0;

  return {
    summary: {
      total_views: totalViews,
      total_clicks: totalClicks,
      total_unique_visitors: totalUniqueVisitors,
      click_through_rate: parseFloat(clickThroughRate),
    },
    timeSeries: Object.values(dailyData).sort((a: any, b: any) => a.date.localeCompare(b.date)),
    topProfiles: Object.values(profileStats)
      .sort((a: any, b: any) => b.views - a.views)
      .slice(0, 10),
    topLinks: Object.values(linkStats)
      .sort((a: any, b: any) => b.clicks - a.clicks)
      .slice(0, 10),
    eventBreakdown: eventCounts,
  };
}
