import { supabase } from './client';
import type { Database } from './types';

type Tables = Database['public']['Tables'];

// User mutations
export const upsertUser = async (user: Tables['users']['Insert']) => {
  const { data, error } = await supabase
    .from('users')
    .upsert(user, { onConflict: 'clerk_id' })
    .select()
    .single();
  
  return { data, error };
};

// Profile mutations
export const incrementProfileViews = async (profileId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ view_count: supabase.rpc('increment', { row_id: profileId, x: 1 }) })
    .eq('id', profileId)
    .select('view_count')
    .single();
  
  return { data, error };
};

export const incrementProfileClicks = async (profileId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ click_count: supabase.rpc('increment', { row_id: profileId, x: 1 }) })
    .eq('id', profileId)
    .select('click_count')
    .single();
  
  return { data, error };
};

// Link mutations
export const incrementLinkClicks = async (linkId: string) => {
  const { data, error } = await supabase
    .from('links')
    .update({ click_count: supabase.rpc('increment', { row_id: linkId, x: 1 }) })
    .eq('id', linkId)
    .select('click_count')
    .single();
  
  return { data, error };
};

export const reorderLinks = async (profileId: string, linkOrders: { id: string; order: number }[]) => {
  const updates = linkOrders.map(({ id, order }) => ({
    id,
    order,
  }));

  const { data, error } = await supabase
    .from('links')
    .upsert(updates, { onConflict: 'id' })
    .eq('profile_id', profileId)
    .select();
  
  return { data, error };
};

// QR Code mutations
export const incrementQRCodeScans = async (qrCodeId: string) => {
  const { data, error } = await supabase
    .from('qr_codes')
    .update({ scan_count: supabase.rpc('increment', { row_id: qrCodeId, x: 1 }) })
    .eq('id', qrCodeId)
    .select('scan_count')
    .single();
  
  return { data, error };
};

// Analytics mutations
export const trackEvent = async (event: Tables['analytics']['Insert']) => {
  const { data, error } = await supabase
    .from('analytics')
    .insert(event)
    .select()
    .single();
  
  return { data, error };
};

export const trackProfileView = async (profileId: string, userAgent?: string, ipAddress?: string) => {
  const event = {
    profile_id: profileId,
    event_type: 'view' as const,
    user_agent: userAgent || null,
    ip_address: ipAddress || null,
  };

  return trackEvent(event);
};

export const trackLinkClick = async (linkId: string, profileId: string, userAgent?: string, ipAddress?: string) => {
  const event = {
    link_id: linkId,
    profile_id: profileId,
    event_type: 'click' as const,
    user_agent: userAgent || null,
    ip_address: ipAddress || null,
  };

  return trackEvent(event);
};

export const trackQRCodeScan = async (qrCodeId: string, userAgent?: string, ipAddress?: string) => {
  const event = {
    qr_code_id: qrCodeId,
    event_type: 'scan' as const,
    user_agent: userAgent || null,
    ip_address: ipAddress || null,
  };

  return trackEvent(event);
};

// Subscription mutations
export const upsertSubscription = async (subscription: Tables['subscriptions']['Insert']) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .upsert(subscription, { onConflict: 'stripe_subscription_id' })
    .select()
    .single();
  
  return { data, error };
};

export const updateUserSubscriptionStatus = async (userId: string, status: string, plan?: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ 
      subscription_status: status,
      ...(plan && { subscription_status: plan })
    })
    .eq('id', userId)
    .select()
    .single();
  
  return { data, error };
};
