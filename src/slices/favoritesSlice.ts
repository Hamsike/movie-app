import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Movie } from "../types";

interface FavoritesState {
    items: Movie[]
}

const initialState: FavoritesState = {
    items: []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addToFavorites(state, action: PayloadAction<Movie>) {
            const exists = state.items.some(item => item.id === action.payload.id)
            if (!exists) {
                state.items.push(action.payload)
            }
        },

        removeFromFavorites(state, action: PayloadAction<Movie>) {
            state.items.filter(item => item.id !== action.payload.id)
        },

        clearFavorites: (state) => {
            state.items = [];
        },
    }
})

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer
