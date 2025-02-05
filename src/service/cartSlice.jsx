import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], //----> Each item: { id, name, price, quantity, ... }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);
            if (existingItem) {
                //----> If it already exists, just increment quantity
                existingItem.quantity += 1;
            } else {
                //----> else add the new item
                state.items.push({ ...product, quantity: 1 });
            }
        },
        removeFromCart(state, action) {
            const id = action.payload;
            state.items = state.items.filter((item) => item.id !== id);
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;
            } else if (existingItem && quantity === 0) {
                //----> If quantity is set to 0, remove item
                state.items = state.items.filter((item) => item.id !== id);
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
