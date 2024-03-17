import { Item } from "./Item";

export interface InitialState {
    cartItems: Item[],
    total: number,
    quantity: number
}