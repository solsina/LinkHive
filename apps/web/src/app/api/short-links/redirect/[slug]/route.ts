import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@linkhive/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Get short link data
    const { data: shortLink, error } = await supabaseAdmin
      .from('short_links')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !shortLink) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    // Check if link has expired
    if (shortLink.expires_at && new Date(shortLink.expires_at) < new Date()) {
      return NextResponse.json({ error: 'Short link has expired' }, { status: 410 });
    }

    // Check if password protected
    if (shortLink.is_password_protected) {
      const url = new URL(request.url);
      const password = url.searchParams.get('password');
      
      if (!password || password !== shortLink.password) {
        return NextResponse.json({ 
          error: 'Password required',
          requiresPassword: true 
        }, { status: 401 });
      }
    }

    // Track analytics if enabled
    if (shortLink.track_analytics) {
      const visitorId = request.headers.get('x-visitor-id') || generateVisitorId();
      const userAgent = request.headers.get('user-agent') || '';
      const referrer = request.headers.get('referer') || '';
      
      // Get IP address (considering proxy headers)
      const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                       request.headers.get('x-real-ip') || 
                       'unknown';

      // Track the click event
      await supabaseAdmin
        .from('analytics')
        .insert({
          user_id: shortLink.user_id,
          event_type: 'short_link_click',
          link_id: shortLink.id,
          visitor_id: visitorId,
          user_agent: userAgent,
          ip_address: ipAddress,
          referrer: referrer,
          link_title: shortLink.title,
          created_at: new Date().toISOString(),
        });

      // Update click count
      await supabaseAdmin
        .from('short_links')
        .update({ 
          click_count: supabaseAdmin.sql`click_count + 1`,
          updated_at: new Date().toISOString()
        })
        .eq('id', shortLink.id);
    }

    // Redirect to original URL
    return NextResponse.redirect(shortLink.original_url);
  } catch (error) {
    console.error('Error in GET /api/short-links/redirect/[slug]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateVisitorId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
