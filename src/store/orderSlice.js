import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        items: JSON.parse(localStorage.getItem('orders')) || [],
    },
    reducers: {
        addOrder: (state, action) => {
            const newOrder = {
                id: Date.now(),
                ...action.payload,
                date: new Date().toLocaleDateString(),
                status: 'Pending',
            };
            state.items.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(state.items));
        },
        removeOrder: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem('orders', JSON.stringify(state.items));
        },
    },
});

export const { addOrder, removeOrder } = orderSlice.actions;
export default orderSlice.reducer;