import { create } from "zustand";
import {getUserProfile, getProfile} from "../api/userProfile";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async (username) => {
    set({ loading: true, error: null });

    try {
      const data = username ? await getUserProfile(username) : await getProfile();

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