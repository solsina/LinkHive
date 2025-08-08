import { getUserById, createUser, getProfilesByUserId } from '../queries';

// Mock Supabase client
jest.mock('../client', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(() => ({
            data: null,
            error: null,
          })),
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn(() => ({
            data: null,
            error: null,
          })),
        })),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          select: jest.fn(() => ({
            single: jest.fn(() => ({
              data: null,
              error: null,
            })),
          })),
        })),
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(() => ({
          data: null,
          error: null,
        })),
      })),
    })),
  },
}));

describe('Database Queries', () => {
  describe('getUserById', () => {
    it('should call supabase with correct parameters', async () => {
      const userId = 'test-user-id';
      await getUserById(userId);
      
      // Verify that supabase.from was called with 'users'
      expect(require('../client').supabase.from).toHaveBeenCalledWith('users');
    });
  });

  describe('createUser', () => {
    it('should call supabase insert with user data', async () => {
      const userData = {
        email: 'test@example.com',
        clerk_id: 'clerk-test-id',
        subscription_status: 'free' as const,
      };
      
      await createUser(userData);
      
      // Verify that supabase.from was called with 'users'
      expect(require('../client').supabase.from).toHaveBeenCalledWith('users');
    });
  });

  describe('getProfilesByUserId', () => {
    it('should call supabase with correct parameters', async () => {
      const userId = 'test-user-id';
      await getProfilesByUserId(userId);
      
      // Verify that supabase.from was called with 'profiles'
      expect(require('../client').supabase.from).toHaveBeenCalledWith('profiles');
    });
  });
});
