import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        value: [],
    },
    reducers: {
        add: (state, action) => {
            state.value.push(action.payload);
        },
        remove: (state, action) => {
            state.value.splice(action.payload, 1);
        }
    }
})

export const { add, remove } = cartSlice.actions;

export default cartSlice.reducer;