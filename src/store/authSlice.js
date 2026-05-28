import { createSlice } from '@reduxjs/toolkit';

// Supabase управляє токенами сам — Redux тримає лише дані юзера для UI
const initialState = {
  user: null,   // { id, email, name }
  loading: true, // true поки перевіряємо сесію при старті
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user    = action.payload; // { id, email, name } або null
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user.name = action.payload.name;
      }
    },
    logout: (state) => {
      state.user    = null;
      state.loading = false;
    },
  },
});

export const { setUser, setLoading, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;

// ─── Helper: перетворює Supabase user → наш формат ──────────────
export const mapSupabaseUser = (sbUser) => {
  if (!sbUser) return null;
  return {
    id:    sbUser.id,
    email: sbUser.email,
    name:  sbUser.user_metadata?.name ?? sbUser.email.split('@')[0],
  };
};
