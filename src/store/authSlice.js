import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user    = action.payload;
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

export const mapSupabaseUser = (sbUser) => {
  if (!sbUser) return null;
  return {
    id:    sbUser.id,
    email: sbUser.email,
    name:  sbUser.user_metadata?.name ?? sbUser.email.split('@')[0],
  };
};
