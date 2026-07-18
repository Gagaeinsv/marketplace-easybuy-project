import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ViewedProduct {
  id: string;
  name: string;
  price: number;
  mainImageUrl: string;
}

interface RecentlyViewedState {
  items: ViewedProduct[];
}

const initialState: RecentlyViewedState = {
  items: [],
};

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    addProductView: (state, action: PayloadAction<ViewedProduct>) => {
      // Remove if already exists to move it to the front
      state.items = state.items.filter(item => item.id !== action.payload.id);
      // Add to front
      state.items.unshift(action.payload);
      // Keep only last 10
      if (state.items.length > 10) {
        state.items.pop();
      }
    },
  },
});

export const { addProductView } = recentlyViewedSlice.actions;
export const selectRecentlyViewed = (state: { recentlyViewed: RecentlyViewedState }) => state.recentlyViewed.items;

export default recentlyViewedSlice.reducer;
