import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

interface UserStats {
  totalPages: number;
  totalLinks: number;
  totalQRCodes: number;
  totalShortLinks: number;
  totalViews: number;
  totalClicks: number;
}

interface AppState {
  // User data
  user: {
    id: string | null;
    email: string | null;
    name: string | null;
    avatar: string | null;
    subscription: {
      plan: 'free' | 'pro' | 'enterprise';
      status: 'active' | 'inactive' | 'cancelled';
      expiresAt: Date | null;
    } | null;
  };

  // UI state
  ui: {
    sidebarOpen: boolean;
    theme: 'light' | 'dark' | 'system';
    loading: boolean;
    searchQuery: string;
  };

  // Notifications
  notifications: Notification[];
  unreadCount: number;

  // Stats
  stats: UserStats | null;

  // Actions
  setUser: (user: Partial<AppState['user']>) => void;
  setUI: (ui: Partial<AppState['ui']>) => void;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLoading: (loading: boolean) => void;
  setSearchQuery: (query: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setStats: (stats: UserStats) => void;
  updateStats: (updates: Partial<UserStats>) => void;
  reset: () => void;
}

const initialState = {
  user: {
    id: null,
    email: null,
    name: null,
    avatar: null,
    subscription: null,
  },
  ui: {
    sidebarOpen: false,
    theme: 'system' as const,
    loading: false,
    searchQuery: '',
  },
  notifications: [],
  unreadCount: 0,
  stats: null,
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setUser: (user) =>
        set((state) => ({
          user: { ...state.user, ...user },
        })),

      setUI: (ui) =>
        set((state) => ({
          ui: { ...state.ui, ...ui },
        })),

      toggleSidebar: () =>
        set((state) => ({
          ui: { ...state.ui, sidebarOpen: !state.ui.sidebarOpen },
        })),

      setTheme: (theme) =>
        set((state) => ({
          ui: { ...state.ui, theme },
        })),

      setLoading: (loading) =>
        set((state) => ({
          ui: { ...state.ui, loading },
        })),

      setSearchQuery: (query) =>
        set((state) => ({
          ui: { ...state.ui, searchQuery: query },
        })),

      addNotification: (notification) =>
        set((state) => {
          const newNotification: Notification = {
            ...notification,
            id: Math.random().toString(36).substring(2, 15),
            timestamp: new Date(),
            read: false,
          };

          const updatedNotifications = [newNotification, ...state.notifications];
          const unreadCount = updatedNotifications.filter((n) => !n.read).length;

          return {
            notifications: updatedNotifications.slice(0, 50), // Keep only last 50 notifications
            unreadCount,
          };
        }),

      markNotificationAsRead: (id) =>
        set((state) => {
          const updatedNotifications = state.notifications.map((notification) =>
            notification.id === id ? { ...notification, read: true } : notification
          );
          const unreadCount = updatedNotifications.filter((n) => !n.read).length;

          return {
            notifications: updatedNotifications,
            unreadCount,
          };
        }),

      markAllNotificationsAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            read: true,
          })),
          unreadCount: 0,
        })),

      removeNotification: (id) =>
        set((state) => {
          const updatedNotifications = state.notifications.filter(
            (notification) => notification.id !== id
          );
          const unreadCount = updatedNotifications.filter((n) => !n.read).length;

          return {
            notifications: updatedNotifications,
            unreadCount,
          };
        }),

      clearNotifications: () =>
        set(() => ({
          notifications: [],
          unreadCount: 0,
        })),

      setStats: (stats) =>
        set(() => ({
          stats,
        })),

      updateStats: (updates) =>
        set((state) => ({
          stats: state.stats ? { ...state.stats, ...updates } : null,
        })),

      reset: () => set(initialState),
    }),
    {
      name: 'linkhive-app-store',
      partialize: (state) => ({
        ui: {
          theme: state.ui.theme,
          sidebarOpen: state.ui.sidebarOpen,
        },
        notifications: state.notifications,
        unreadCount: state.unreadCount,
      }),
    }
  )
);
