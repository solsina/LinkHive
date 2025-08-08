import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@linkhive/database';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: shortLink, error } = await supabaseAdmin
      .from('short_links')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
      }
      console.error('Error fetching short link:', error);
      return NextResponse.json({ error: 'Failed to fetch short link' }, { status: 500 });
    }

    return NextResponse.json(shortLink);
  } catch (error) {
    console.error('Error in GET /api/short-links/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { original_url, custom_slug, title, description, tags, expires_at, password, is_password_protected, track_analytics, is_active } = body;

    // Check if short link exists and belongs to user
    const { data: existingLink, error: fetchError } = await supabaseAdmin
      .from('short_links')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !existingLink) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    // Validate URL format if provided
    if (original_url) {
      try {
        new URL(original_url);
      } catch {
        return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
      }
    }

    // Check if custom slug is unique (if changed)
    if (custom_slug && custom_slug !== existingLink.slug) {
      const { data: conflictingLink } = await supabaseAdmin
        .from('short_links')
        .select('id')
        .eq('slug', custom_slug)
        .neq('id', params.id)
        .single();

      if (conflictingLink) {
        return NextResponse.json({ error: 'Custom slug already exists' }, { status: 409 });
      }
    }

    const updateData = {
      original_url: original_url || existingLink.original_url,
      slug: custom_slug || existingLink.slug,
      title: title !== undefined ? title : existingLink.title,
      description: description !== undefined ? description : existingLink.description,
      tags: tags || existingLink.tags,
      expires_at: expires_at !== undefined ? expires_at : existingLink.expires_at,
      password: password !== undefined ? password : existingLink.password,
      is_password_protected: is_password_protected !== undefined ? is_password_protected : existingLink.is_password_protected,
      track_analytics: track_analytics !== undefined ? track_analytics : existingLink.track_analytics,
      is_active: is_active !== undefined ? is_active : existingLink.is_active,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedShortLink, error } = await supabaseAdmin
      .from('short_links')
      .update(updateData)
      .eq('id', params.id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating short link:', error);
      return NextResponse.json({ error: 'Failed to update short link' }, { status: 500 });
    }

    return NextResponse.json(updatedShortLink);
  } catch (error) {
    console.error('Error in PUT /api/short-links/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if short link exists and belongs to user
    const { data: existingLink, error: fetchError } = await supabaseAdmin
      .from('short_links')
      .select('id')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !existingLink) {
      return NextResponse.json({ error: 'Short link not found' }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('short_links')
      .delete()
      .eq('id', params.id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting short link:', error);
      return NextResponse.json({ error: 'Failed to delete short link' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Short link deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/short-links/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
