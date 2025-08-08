import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@linkhive/database';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      event_type, 
      profile_id, 
      link_id, 
      qr_code_id, 
      short_link_id,
      user_agent,
      ip_address,
      referrer,
      country,
      city,
      device_type,
      browser,
      os
    } = body;

    // Validate required fields
    if (!event_type) {
      return NextResponse.json({ error: 'Event type is required' }, { status: 400 });
    }

    // Create analytics event
    const eventData = {
      event_type,
      profile_id: profile_id || null,
      link_id: link_id || null,
      qr_code_id: qr_code_id || null,
      short_link_id: short_link_id || null,
      user_agent: user_agent || null,
      ip_address: ip_address || null,
      referrer: referrer || null,
      country: country || null,
      city: city || null,
      device_type: device_type || null,
      browser: browser || null,
      os: os || null,
      created_at: new Date().toISOString(),
    };

    const { data: event, error } = await supabaseAdmin
      .from('analytics')
      .insert(eventData)
      .select()
      .single();

    if (error) {
      console.error('Error creating analytics event:', error);
      return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
    }

    // Update counters based on event type
    if (profile_id) {
      if (event_type === 'profile_view') {
        await supabaseAdmin
          .from('profiles')
          .update({ view_count: supabaseAdmin.rpc('increment', { row: 1 }) })
          .eq('id', profile_id);
      }
    }

    if (link_id) {
      if (event_type === 'link_click') {
        await supabaseAdmin
          .from('links')
          .update({ click_count: supabaseAdmin.rpc('increment', { row: 1 }) })
          .eq('id', link_id);
      }
    }

    if (qr_code_id) {
      if (event_type === 'qr_scan') {
        await supabaseAdmin
          .from('qr_codes')
          .update({ scan_count: supabaseAdmin.rpc('increment', { row: 1 }) })
          .eq('id', qr_code_id);
      }
    }

    if (short_link_id) {
      if (event_type === 'short_link_click') {
        await supabaseAdmin
          .from('short_links')
          .update({ click_count: supabaseAdmin.rpc('increment', { row: 1 }) })
          .eq('id', short_link_id);
      }
    }

    return NextResponse.json({ success: true, event_id: event.id });
  } catch (error) {
    console.error('Error in POST /api/track:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get('profile_id');
    const linkId = searchParams.get('link_id');
    const qrCodeId = searchParams.get('qr_code_id');
    const shortLinkId = searchParams.get('short_link_id');
    const eventType = searchParams.get('event_type');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabaseAdmin
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (profileId) {
      query = query.eq('profile_id', profileId);
    }

    if (linkId) {
      query = query.eq('link_id', linkId);
    }

    if (qrCodeId) {
      query = query.eq('qr_code_id', qrCodeId);
    }

    if (shortLinkId) {
      query = query.eq('short_link_id', shortLinkId);
    }

    if (eventType) {
      query = query.eq('event_type', eventType);
    }

    const { data: events, error } = await query;

    if (error) {
      console.error('Error fetching analytics events:', error);
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error in GET /api/track:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
