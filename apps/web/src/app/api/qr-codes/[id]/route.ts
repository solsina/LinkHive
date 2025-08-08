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

    const { data: qrCode, error } = await supabaseAdmin
      .from('qr_codes')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
      }
      console.error('Error fetching QR code:', error);
      return NextResponse.json({ error: 'Failed to fetch QR code' }, { status: 500 });
    }

    return NextResponse.json(qrCode);
  } catch (error) {
    console.error('Error in GET /api/qr-codes/[id]:', error);
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
      margin,
      is_active 
    } = body;

    // Check if QR code exists and belongs to user
    const { data: existingQRCode, error: fetchError } = await supabaseAdmin
      .from('qr_codes')
      .select('*')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !existingQRCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    // Validate type if provided
    if (type) {
      const validTypes = ['url', 'text', 'email', 'phone', 'wifi'];
      if (!validTypes.includes(type)) {
        return NextResponse.json({ error: 'Invalid QR code type' }, { status: 400 });
      }
    }

    // Validate size if provided
    if (size) {
      const validSizes = [128, 256, 512, 1024];
      if (!validSizes.includes(size)) {
        return NextResponse.json({ error: 'Invalid size' }, { status: 400 });
      }
    }

    // Validate error correction if provided
    if (error_correction) {
      const validErrorCorrections = ['L', 'M', 'Q', 'H'];
      if (!validErrorCorrections.includes(error_correction)) {
        return NextResponse.json({ error: 'Invalid error correction level' }, { status: 400 });
      }
    }

    // Validate margin if provided
    if (margin !== undefined) {
      if (margin < 0 || margin > 8) {
        return NextResponse.json({ error: 'Margin must be between 0 and 8' }, { status: 400 });
      }
    }

    // Validate colors if provided
    if (foreground_color || background_color) {
      const colorRegex = /^#[0-9A-F]{6}$/i;
      if (foreground_color && !colorRegex.test(foreground_color)) {
        return NextResponse.json({ error: 'Invalid foreground color format' }, { status: 400 });
      }
      if (background_color && !colorRegex.test(background_color)) {
        return NextResponse.json({ error: 'Invalid background color format' }, { status: 400 });
      }
    }

    const updateData = {
      name: name || existingQRCode.name,
      content: content || existingQRCode.content,
      type: type || existingQRCode.type,
      size: size || existingQRCode.size,
      foreground_color: foreground_color || existingQRCode.foreground_color,
      background_color: background_color || existingQRCode.background_color,
      include_logo: include_logo !== undefined ? include_logo : existingQRCode.include_logo,
      logo_url: logo_url !== undefined ? logo_url : existingQRCode.logo_url,
      error_correction: error_correction || existingQRCode.error_correction,
      margin: margin !== undefined ? margin : existingQRCode.margin,
      is_active: is_active !== undefined ? is_active : existingQRCode.is_active,
      updated_at: new Date().toISOString(),
    };

    const { data: updatedQRCode, error } = await supabaseAdmin
      .from('qr_codes')
      .update(updateData)
      .eq('id', params.id)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error updating QR code:', error);
      return NextResponse.json({ error: 'Failed to update QR code' }, { status: 500 });
    }

    return NextResponse.json(updatedQRCode);
  } catch (error) {
    console.error('Error in PUT /api/qr-codes/[id]:', error);
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

    // Check if QR code exists and belongs to user
    const { data: existingQRCode, error: fetchError } = await supabaseAdmin
      .from('qr_codes')
      .select('id')
      .eq('id', params.id)
      .eq('user_id', userId)
      .single();

    if (fetchError || !existingQRCode) {
      return NextResponse.json({ error: 'QR code not found' }, { status: 404 });
    }

    const { error } = await supabaseAdmin
      .from('qr_codes')
      .delete()
      .eq('id', params.id)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deleting QR code:', error);
      return NextResponse.json({ error: 'Failed to delete QR code' }, { status: 500 });
    }

    return NextResponse.json({ message: 'QR code deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/qr-codes/[id]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
