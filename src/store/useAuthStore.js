import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      // 1. Initial State
      user: null,
      token: null,
      isAuthenticated: false,

      // 2. Actions
      login: (userData, userToken) => 
        set({ 
          user: userData, 
          token: userToken, 
          isAuthenticated: true 
        }),

      logout: () => 
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        }),
        
      updateProfile: (updatedData) => 
        set((state) => ({
          user: { ...state.user, ...updatedData }
        })),
    }),
    {
      name: 'auth-storage', // Unique name for the localStorage key
      // storage: createJSONStorage(() => sessionStorage), // Uncomment this line if you want sessionStorage instead
    }
  )
);

export default useAuthStore;
