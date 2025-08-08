import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@linkhive/database';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: shortLinks, error } = await supabaseAdmin
      .from('short_links')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching short links:', error);
      return NextResponse.json({ error: 'Failed to fetch short links' }, { status: 500 });
    }

    return NextResponse.json(shortLinks);
  } catch (error) {
    console.error('Error in GET /api/short-links:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { original_url, custom_slug, title, description, tags, expires_at, password, is_password_protected, track_analytics, is_active } = body;

    // Validate required fields
    if (!original_url) {
      return NextResponse.json({ error: 'Original URL is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(original_url);
    } catch {
      return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
    }

    // Check if custom slug is unique (if provided)
    if (custom_slug) {
      const { data: existingLink } = await supabaseAdmin
        .from('short_links')
        .select('id')
        .eq('slug', custom_slug)
        .single();

      if (existingLink) {
        return NextResponse.json({ error: 'Custom slug already exists' }, { status: 409 });
      }
    }

    // Generate slug if not provided
    const slug = custom_slug || generateRandomSlug();

    const shortLinkData = {
      user_id: userId,
      original_url,
      slug,
      title: title || null,
      description: description || null,
      tags: tags || [],
      expires_at: expires_at || null,
      password: password || null,
      is_password_protected: is_password_protected || false,
      track_analytics: track_analytics !== false, // Default to true
      is_active: is_active !== false, // Default to true
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newShortLink, error } = await supabaseAdmin
      .from('short_links')
      .insert(shortLinkData)
      .select()
      .single();

    if (error) {
      console.error('Error creating short link:', error);
      return NextResponse.json({ error: 'Failed to create short link' }, { status: 500 });
    }

    return NextResponse.json(newShortLink, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/short-links:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function generateRandomSlug(): string {
  return Math.random().toString(36).substring(2, 8);
}
