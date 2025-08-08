import { supabase } from './client';
import type { Database } from './types';

type Tables = Database['public']['Tables'];

// User queries
export const getUserById = async (id: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  
  return { data, error };
};

export const getUserByClerkId = async (clerkId: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single();
  
  return { data, error };
};

export const createUser = async (user: Tables['users']['Insert']) => {
  const { data, error } = await supabase
    .from('users')
    .insert(user)
    .select()
    .single();
  
  return { data, error };
};

export const updateUser = async (id: string, updates: Tables['users']['Update']) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

// Profile queries
export const getProfilesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const getProfileBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      links (*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  
  return { data, error };
};

export const createProfile = async (profile: Tables['profiles']['Insert']) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();
  
  return { data, error };
};

export const updateProfile = async (id: string, updates: Tables['profiles']['Update']) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

// Link queries
export const getLinksByProfileId = async (profileId: string) => {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profileId)
    .order('order', { ascending: true });
  
  return { data, error };
};

export const createLink = async (link: Tables['links']['Insert']) => {
  const { data, error } = await supabase
    .from('links')
    .insert(link)
    .select()
    .single();
  
  return { data, error };
};

export const updateLink = async (id: string, updates: Tables['links']['Update']) => {
  const { data, error } = await supabase
    .from('links')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

export const deleteLink = async (id: string) => {
  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', id);
  
  return { error };
};

// QR Code queries
export const getQRCodesByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('qr_codes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  return { data, error };
};

export const createQRCode = async (qrCode: Tables['qr_codes']['Insert']) => {
  const { data, error } = await supabase
    .from('qr_codes')
    .insert(qrCode)
    .select()
    .single();
  
  return { data, error };
};

export const updateQRCode = async (id: string, updates: Tables['qr_codes']['Update']) => {
  const { data, error } = await supabase
    .from('qr_codes')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};

// Analytics queries
export const createAnalyticsEvent = async (event: Tables['analytics']['Insert']) => {
  const { data, error } = await supabase
    .from('analytics')
    .insert(event)
    .select()
    .single();
  
  return { data, error };
};

export const getAnalyticsByProfileId = async (profileId: string, days: number = 30) => {
  const { data, error } = await supabase
    .from('analytics')
    .select('*')
    .eq('profile_id', profileId)
    .gte('created_at', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false });
  
  return { data, error };
};

// Subscription queries
export const getSubscriptionByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  return { data, error };
};

export const createSubscription = async (subscription: Tables['subscriptions']['Insert']) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .insert(subscription)
    .select()
    .single();
  
  return { data, error };
};

export const updateSubscription = async (id: string, updates: Tables['subscriptions']['Update']) => {
  const { data, error } = await supabase
    .from('subscriptions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
};
