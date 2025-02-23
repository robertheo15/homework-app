import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  users: {
    teacher: User | null;
    student: User | null;
  };
  currentUser: User | null;
  login: (user: User) => void;
  logout: () => void;
  deleteUser: (role: 'student' | 'teacher') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  users: {
    teacher: null,
    student: null,
  },
  currentUser: null,
  login: (user) => set((state) => ({
    users: {
      ...state.users,
      [user.role]: state.users[user.role] || user, // Only save if not exists
    },
    currentUser: user,
  })),
  logout: () => set((state) => ({
    users: state.users, // Keep users
    currentUser: null, // Only clear current user
  })),
  deleteUser: (role) => set((state) => ({
    users: {
      ...state.users,
      [role]: null,
    },
    currentUser: state.currentUser?.role === role ? null : state.currentUser,
  })),
}));