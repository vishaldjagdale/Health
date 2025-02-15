import axios from "axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  signup: async (creadentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        creadentials
      );
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Signup successful");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        credentials,
        { withCredentials: true }
      );
      console.log(response.data);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoggingIn: false,
      });
      toast.success("Login successful");
      return { success: true };
    } catch (error) {
      set({ isLoggingIn: false });
      toast.error(error.response?.data?.message || "Login failed");
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("http://localhost:3000/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "An error accured");
    }
  },
}));
