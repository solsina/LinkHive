interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  cache?: RequestCache;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T = any>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    cache = 'default'
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    cache,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`/api${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new ApiError(
        data.error || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return {
      data,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    );
  }
}

// API functions for different endpoints
export const api = {
  // Pages
  getPages: () => apiRequest('/pages'),
  getPage: (id: string) => apiRequest(`/pages/${id}`),
  createPage: (data: any) => apiRequest('/pages', { method: 'POST', body: data }),
  updatePage: (id: string, data: any) => apiRequest(`/pages/${id}`, { method: 'PUT', body: data }),
  deletePage: (id: string) => apiRequest(`/pages/${id}`, { method: 'DELETE' }),

  // QR Codes
  getQRCodes: () => apiRequest('/qr-codes'),
  getQRCode: (id: string) => apiRequest(`/qr-codes/${id}`),
  createQRCode: (data: any) => apiRequest('/qr-codes', { method: 'POST', body: data }),
  updateQRCode: (id: string, data: any) => apiRequest(`/qr-codes/${id}`, { method: 'PUT', body: data }),
  deleteQRCode: (id: string) => apiRequest(`/qr-codes/${id}`, { method: 'DELETE' }),

  // Short Links
  getShortLinks: () => apiRequest('/short-links'),
  getShortLink: (id: string) => apiRequest(`/short-links/${id}`),
  createShortLink: (data: any) => apiRequest('/short-links', { method: 'POST', body: data }),
  updateShortLink: (id: string, data: any) => apiRequest(`/short-links/${id}`, { method: 'PUT', body: data }),
  deleteShortLink: (id: string) => apiRequest(`/short-links/${id}`, { method: 'DELETE' }),

  // Analytics
  getAnalytics: (params?: { timeRange?: string; profileId?: string }) => {
    const searchParams = new URLSearchParams();
    if (params?.timeRange) searchParams.append('timeRange', params.timeRange);
    if (params?.profileId) searchParams.append('profileId', params.profileId);
    
    const query = searchParams.toString();
    return apiRequest(`/analytics${query ? `?${query}` : ''}`);
  },

  // Billing
  getBilling: () => apiRequest('/billing'),
  createCheckoutSession: (priceId: string) => 
    apiRequest('/billing', { method: 'POST', body: { action: 'create_checkout_session', priceId } }),
  createPortalSession: () => 
    apiRequest('/billing', { method: 'POST', body: { action: 'create_portal_session' } }),
  cancelSubscription: () => 
    apiRequest('/billing', { method: 'POST', body: { action: 'cancel_subscription' } }),

  // Export
  exportData: (type: string, format: string, dateRange: string) =>
    apiRequest('/export', { 
      method: 'POST', 
      body: { type, format, dateRange },
      headers: { 'Accept': format === 'csv' ? 'text/csv' : 'application/json' }
    }),

  // Health check
  healthCheck: () => apiRequest('/health'),
};

export { ApiError };
export type { ApiResponse, ApiOptions };
