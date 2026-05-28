// Orders тепер зберігаються в Supabase.
// Цей slice більше не використовується — залишений щоб не ламати імпорти.
import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [] },
  reducers: {},
});

export default orderSlice.reducer;
