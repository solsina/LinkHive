import { redirect } from 'next/navigation';
import { supabaseAdmin } from '@linkhive/database';

interface ShortLinkPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    password?: string;
  };
}

export default async function ShortLinkPage({ params, searchParams }: ShortLinkPageProps) {
  const { slug } = params;
  const { password } = searchParams;

  try {
    // Get short link data
    const { data: shortLink, error } = await supabaseAdmin
      .from('short_links')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error || !shortLink) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Not Found</h1>
            <p className="text-gray-600">This short link doesn't exist or has been deactivated.</p>
          </div>
        </div>
      );
    }

    // Check if link has expired
    if (shortLink.expires_at && new Date(shortLink.expires_at) < new Date()) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Link Expired</h1>
            <p className="text-gray-600">This short link has expired and is no longer available.</p>
          </div>
        </div>
      );
    }

    // Check if password protected
    if (shortLink.is_password_protected) {
      if (!password || password !== shortLink.password) {
        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center max-w-md mx-auto p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Password Protected</h1>
              <p className="text-gray-600 mb-6">
                This link is password protected. Please enter the password to continue.
              </p>
              <form method="GET" className="space-y-4">
                <input
                  type="hidden"
                  name="slug"
                  value={slug}
                />
                <div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        );
      }
    }

    // Track analytics if enabled
    if (shortLink.track_analytics) {
      const visitorId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      
      // Track the click event
      await supabaseAdmin
        .from('analytics')
        .insert({
          user_id: shortLink.user_id,
          event_type: 'short_link_click',
          link_id: shortLink.id,
          visitor_id: visitorId,
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
    redirect(shortLink.original_url);
  } catch (error) {
    console.error('Error in short link redirect:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600">An error occurred while processing your request.</p>
        </div>
      </div>
    );
  }
}
