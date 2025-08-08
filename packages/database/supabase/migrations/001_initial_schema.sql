-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table (extends auth.users from Supabase Auth)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table (Link-in-Bio pages)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    theme TEXT DEFAULT 'modern',
    background TEXT DEFAULT 'gradient',
    profile_image_url TEXT,
    custom_domain TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    views_count INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create links table
CREATE TABLE IF NOT EXISTS public.links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    clicks_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create QR codes table
CREATE TABLE IF NOT EXISTS public.qr_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT DEFAULT 'url' CHECK (type IN ('url', 'wifi', 'text', 'email', 'phone')),
    size INTEGER DEFAULT 200,
    foreground_color TEXT DEFAULT '#000000',
    background_color TEXT DEFAULT '#FFFFFF',
    scans_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create short links table
CREATE TABLE IF NOT EXISTS public.short_links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    title TEXT,
    tags TEXT[],
    clicks_count INTEGER DEFAULT 0,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS public.analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    link_id UUID REFERENCES public.links(id) ON DELETE CASCADE,
    qr_code_id UUID REFERENCES public.qr_codes(id) ON DELETE CASCADE,
    short_link_id UUID REFERENCES public.short_links(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('view', 'click', 'scan')),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    country TEXT,
    city TEXT,
    device_type TEXT,
    browser TEXT,
    os TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    plan_type TEXT NOT NULL DEFAULT 'free' CHECK (plan_type IN ('free', 'pro', 'enterprise')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_slug ON public.profiles(slug);
CREATE INDEX IF NOT EXISTS idx_links_profile_id ON public.links(profile_id);
CREATE INDEX IF NOT EXISTS idx_qr_codes_user_id ON public.qr_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_short_links_user_id ON public.short_links(user_id);
CREATE INDEX IF NOT EXISTS idx_short_links_short_code ON public.short_links(short_code);
CREATE INDEX IF NOT EXISTS idx_analytics_user_id ON public.analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_profile_id ON public.analytics(profile_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON public.analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_links_updated_at BEFORE UPDATE ON public.links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_qr_codes_updated_at BEFORE UPDATE ON public.qr_codes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_short_links_updated_at BEFORE UPDATE ON public.short_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON public.subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.qr_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.short_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only access their own data
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (clerk_id = current_setting('request.jwt.claims', true)::json->>'sub');

-- Profiles policies
CREATE POLICY "Users can view own profiles" ON public.profiles FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can insert own profiles" ON public.profiles FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can update own profiles" ON public.profiles FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can delete own profiles" ON public.profiles FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
-- Public can view active profiles
CREATE POLICY "Public can view active profiles" ON public.profiles FOR SELECT USING (status = 'active');

-- Links policies
CREATE POLICY "Users can view own links" ON public.links FOR SELECT USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')));
CREATE POLICY "Users can insert own links" ON public.links FOR INSERT WITH CHECK (profile_id IN (SELECT id FROM public.profiles WHERE user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')));
CREATE POLICY "Users can update own links" ON public.links FOR UPDATE USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')));
CREATE POLICY "Users can delete own links" ON public.links FOR DELETE USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub')));
-- Public can view active links from active profiles
CREATE POLICY "Public can view active links" ON public.links FOR SELECT USING (active = true AND profile_id IN (SELECT id FROM public.profiles WHERE status = 'active'));

-- QR Codes policies
CREATE POLICY "Users can view own qr codes" ON public.qr_codes FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can insert own qr codes" ON public.qr_codes FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can update own qr codes" ON public.qr_codes FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can delete own qr codes" ON public.qr_codes FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Short Links policies
CREATE POLICY "Users can view own short links" ON public.short_links FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can insert own short links" ON public.short_links FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can update own short links" ON public.short_links FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can delete own short links" ON public.short_links FOR DELETE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
-- Public can access short links (for redirects)
CREATE POLICY "Public can view short links" ON public.short_links FOR SELECT USING (true);

-- Analytics policies
CREATE POLICY "Users can view own analytics" ON public.analytics FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can insert own analytics" ON public.analytics FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));

-- Subscriptions policies
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
CREATE POLICY "Users can update own subscriptions" ON public.subscriptions FOR UPDATE USING (user_id IN (SELECT id FROM public.users WHERE clerk_id = current_setting('request.jwt.claims', true)::json->>'sub'));
