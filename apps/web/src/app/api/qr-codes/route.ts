import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@linkhive/database';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: qrCodes, error } = await supabaseAdmin
      .from('qr_codes')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching QR codes:', error);
      return NextResponse.json({ error: 'Failed to fetch QR codes' }, { status: 500 });
    }

    return NextResponse.json(qrCodes);
  } catch (error) {
    console.error('Error in GET /api/qr-codes:', error);
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
    const { 
      name, 
      content, 
      type, 
      size, 
      foreground_color, 
      background_color, 
      include_logo, 
      logo_url, 
      error_correction, 
      margin 
    } = body;

    // Validate required fields
    if (!name || !content || !type) {
      return NextResponse.json({ error: 'Name, content, and type are required' }, { status: 400 });
    }

    // Validate type
    const validTypes = ['url', 'text', 'email', 'phone', 'wifi'];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: 'Invalid QR code type' }, { status: 400 });
    }

    // Validate size
    const validSizes = [128, 256, 512, 1024];
    if (!validSizes.includes(size)) {
      return NextResponse.json({ error: 'Invalid size' }, { status: 400 });
    }

    // Validate error correction
    const validErrorCorrections = ['L', 'M', 'Q', 'H'];
    if (!validErrorCorrections.includes(error_correction)) {
      return NextResponse.json({ error: 'Invalid error correction level' }, { status: 400 });
    }

    // Validate margin
    if (margin < 0 || margin > 8) {
      return NextResponse.json({ error: 'Margin must be between 0 and 8' }, { status: 400 });
    }

    // Validate colors
    const colorRegex = /^#[0-9A-F]{6}$/i;
    if (!colorRegex.test(foreground_color) || !colorRegex.test(background_color)) {
      return NextResponse.json({ error: 'Invalid color format' }, { status: 400 });
    }

    const qrCodeData = {
      user_id: userId,
      name,
      content,
      type,
      size,
      foreground_color,
      background_color,
      include_logo: include_logo || false,
      logo_url: logo_url || null,
      error_correction,
      margin,
      scan_count: 0,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data: newQRCode, error } = await supabaseAdmin
      .from('qr_codes')
      .insert(qrCodeData)
      .select()
      .single();

    if (error) {
      console.error('Error creating QR code:', error);
      return NextResponse.json({ error: 'Failed to create QR code' }, { status: 500 });
    }

    return NextResponse.json(newQRCode, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/qr-codes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
