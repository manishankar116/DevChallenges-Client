import { create } from "zustand";
import {getUserProfile} from "../api/userProfile";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async (username) => {
    set({ loading: true, error: null });

    try {
      const data =  await getUserProfile(username);

      set({
        user: data,
        loading: false,
      });

      return data;
    } catch (error) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
}));