import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'needtoknow-auth',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    autoRefreshToken: true,
    detectSessionInUrl: true
  }
});

// Helper class for working with user auth state locally
export class LocalAuth {
  private static readonly USER_KEY = 'needtoknow-user';

  // Store user in localStorage
  static setUser(user: { id: string; email: string; isPremium: boolean }) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  // Get user from localStorage
  static getUser() {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  // Remove user from localStorage
  static removeUser() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  // Check if user is logged in
  static isLoggedIn() {
    return !!this.getUser();
  }

  // Check if user is premium
  static isPremium() {
    const user = this.getUser();
    return user ? user.isPremium : false;
  }
}

// Auth service for working with Supabase or local auth
export const authService = {
  // Sign up with email and password
  async signUp(email: string, password: string) {
    try {
      // For local-first development, we'll use fake authentication
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      // Store the user locally
      if (data.user) {
        LocalAuth.setUser({
          id: data.user.id,
          email: data.user.email || '',
          isPremium: false,
        });
      }

      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  // Sign in with email and password
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Store the user locally
      if (data.user) {
        LocalAuth.setUser({
          id: data.user.id,
          email: data.user.email || '',
          isPremium: false,
        });
      }

      return { user: data.user, session: data.session };
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  },

  // Sign out the user
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // Remove the user from local storage
      LocalAuth.removeUser();

    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  },

  // Get the current user
  async getUser() {
    try {
      // First try to get from Supabase
      const { data, error } = await supabase.auth.getUser();

      if (data.user) {
        return data.user;
      }

      // If no Supabase user, try local storage
      return LocalAuth.getUser();
    } catch (error) {
      console.error('Error getting user:', error);
      // Fallback to local storage
      return LocalAuth.getUser();
    }
  },

  // Check if the user is logged in
  isLoggedIn() {
    return LocalAuth.isLoggedIn();
  },

  // Check if the user is premium
  isPremium() {
    return LocalAuth.isPremium();
  },

  // For development: mock login
  mockLogin(isPremium = false) {
    LocalAuth.setUser({
      id: 'mock-user-id',
      email: 'user@example.com',
      isPremium,
    });
  }
};
