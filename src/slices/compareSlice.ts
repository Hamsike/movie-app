import { createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type { Movie } from '../types';

interface CompareState {
  items: Movie[];
}

const initialState: CompareState = {
  items: [],
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action: PayloadAction<Movie>) => {
      const exists = state.items.some(m => m.id === action.payload.id);
      
      if (exists) {
        state.items = state.items.filter(m => m.id !== action.payload.id);
      } else {
        if (state.items.length >= 2) {
          state.items = state.items.slice(1);
        }
        state.items.push(action.payload);
      }
    },
    removeFromCompare: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(m => m.id !== action.payload);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;