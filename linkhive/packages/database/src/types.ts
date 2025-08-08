export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
          clerk_id: string;
          subscription_status: 'free' | 'pro' | 'enterprise';
          subscription_id: string | null;
          custom_domain: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          clerk_id: string;
          subscription_status?: 'free' | 'pro' | 'enterprise';
          subscription_id?: string | null;
          custom_domain?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
          clerk_id?: string;
          subscription_status?: 'free' | 'pro' | 'enterprise';
          subscription_id?: string | null;
          custom_domain?: string | null;
        };
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          theme: Json;
          background_image: string | null;
          profile_image: string | null;
          is_active: boolean;
          slug: string;
          custom_domain: string | null;
          created_at: string;
          updated_at: string;
          view_count: number;
          click_count: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          theme?: Json;
          background_image?: string | null;
          profile_image?: string | null;
          is_active?: boolean;
          slug: string;
          custom_domain?: string | null;
          created_at?: string;
          updated_at?: string;
          view_count?: number;
          click_count?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          theme?: Json;
          background_image?: string | null;
          profile_image?: string | null;
          is_active?: boolean;
          slug?: string;
          custom_domain?: string | null;
          created_at?: string;
          updated_at?: string;
          view_count?: number;
          click_count?: number;
        };
      };
      links: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          url: string;
          icon: string | null;
          order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          click_count: number;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          url: string;
          icon?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          click_count?: number;
        };
        Update: {
          id?: string;
          profile_id?: string;
          title?: string;
          url?: string;
          icon?: string | null;
          order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          click_count?: number;
        };
      };
      qr_codes: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          url: string;
          qr_code_data: string;
          design: Json;
          created_at: string;
          updated_at: string;
          scan_count: number;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          url: string;
          qr_code_data?: string;
          design?: Json;
          created_at?: string;
          updated_at?: string;
          scan_count?: number;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          url?: string;
          qr_code_data?: string;
          design?: Json;
          created_at?: string;
          updated_at?: string;
          scan_count?: number;
        };
      };
      analytics: {
        Row: {
          id: string;
          profile_id: string | null;
          link_id: string | null;
          qr_code_id: string | null;
          event_type: 'view' | 'click' | 'scan';
          user_agent: string | null;
          ip_address: string | null;
          country: string | null;
          city: string | null;
          referrer: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          link_id?: string | null;
          qr_code_id?: string | null;
          event_type: 'view' | 'click' | 'scan';
          user_agent?: string | null;
          ip_address?: string | null;
          country?: string | null;
          city?: string | null;
          referrer?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string | null;
          link_id?: string | null;
          qr_code_id?: string | null;
          event_type?: 'view' | 'click' | 'scan';
          user_agent?: string | null;
          ip_address?: string | null;
          country?: string | null;
          city?: string | null;
          referrer?: string | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_subscription_id: string;
          stripe_customer_id: string;
          status: 'active' | 'canceled' | 'past_due' | 'unpaid';
          plan: 'free' | 'pro' | 'enterprise';
          current_period_start: string;
          current_period_end: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_subscription_id: string;
          stripe_customer_id: string;
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          plan?: 'free' | 'pro' | 'enterprise';
          current_period_start: string;
          current_period_end: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_subscription_id?: string;
          stripe_customer_id?: string;
          status?: 'active' | 'canceled' | 'past_due' | 'unpaid';
          plan?: 'free' | 'pro' | 'enterprise';
          current_period_start?: string;
          current_period_end?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
