import { create } from "zustand";
import { axiosInstance } from "../utils/axios.utils";

export interface IUser {
    name: string;
    email: string;
    user_name: string;
    role: "teacher" | "student";
}

export interface IAuthStore {
    user: IUser | null;
    setUser: (user: IUser) => void;
    logout: () => void;
    isLoggedIn: boolean;
    loading?: boolean;
    error: string | null;
    login: (email: string, password: string) => void;
    checkUser: () => void;
    signup: (email: string, password: string, username: string, role: "teacher" | "student", name: string) => void;
}

export const useAuthStore = create<IAuthStore>((
    set,
    get
) => ({
    user: null,
    setUser: (user) => set({ user }),
    logout: () => {
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem("token");
    },
    login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.post("/api/auth/login", {
                email,
                password,
            });
            await localStorage.setItem("token", response.data.access_token);
            set({ loading: false, isLoggedIn: true });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Login failed",
                loading: false,
            });
        }
    },
    checkUser: async () => {
        if (get().user && get().isLoggedIn) return;
        set({ loading: true, error: null });
        try {
            const response = await axiosInstance.get("/api/auth/me", 
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    }
                }
            );
            set({ user: response.data, isLoggedIn: true, loading: false });
        } catch (error: any) {
            set({ loading: false });
        }
    },
    signup: async (email: string, password: string, username: string, role: "teacher" | "student", name: string) => {
        set({ loading: true, error: null });
        try {
            await axiosInstance.post("/api/auth/signup", {
                name,
                email,
                password,
                user_name: username,
                role,
            });
            set({ loading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Signup failed",
                loading: false,
            });
        }
    },
    isLoggedIn: false,
    error: null
}));