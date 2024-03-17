import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../interfaces/InitialState";
import { Item } from "../interfaces/Item";

const initialState: InitialState = {
    cartItems: [],
    quantity: 0,
    total: 0
}

export const storeReducer = createSlice({
    name: "store",
    initialState,
    reducers: {
        addToCart: (state: InitialState, action: PayloadAction<Item>) => {
            const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].quantity += 1
            } else {
                const item = {
                    ...action.payload, quantity: 1
                }
                state.cartItems.push(item);
            }
        },
        cartTotal: (state: InitialState) => {
            let quantity: number = 0;
            let total: number = 0;

            state.cartItems.forEach((item) => {
                quantity += item.quantity;
                total += item.quantity * item.price;
            })

            state.quantity = quantity;
            state.total = total;

        },
        decrease: (state: InitialState, action: PayloadAction<{ id: number }>) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (cartItem) 
                cartItem.quantity = cartItem.quantity - 1
            
        },
        increase: (state: InitialState, action: PayloadAction<{ id: number }>) => {
            const cartItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (cartItem) 
                cartItem.quantity = cartItem.quantity + 1
            
        },
        removeFromCart: (state: InitialState, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        },
        clearCart: (state: InitialState) => {
            return {
                ...state,
                cartItems: []
            }
        }
    }
})

export const { addToCart, cartTotal, decrease, removeFromCart, increase, clearCart } = storeReducer.actions;
export default storeReducer.reducer;