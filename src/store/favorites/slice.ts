import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  itemIds: string[];
  isOpen: boolean;
}

const initialState: FavoritesState = {
  itemIds: ['w1', 'w2', 'w3'],
  isOpen: false,
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavoritesDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    openFavorites: (state) => {
      state.isOpen = true;
    },
    closeFavorites: (state) => {
      state.isOpen = false;
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.itemIds.includes(id)) {
        state.itemIds = state.itemIds.filter((itemId) => itemId !== id);
      } else {
        state.itemIds.push(id);
      }
    },
    clearFavorites: (state) => {
      state.itemIds = [];
    },
  },
});

export const { toggleFavoritesDrawer, openFavorites, closeFavorites, toggleFavorite, clearFavorites } = favoritesSlice.actions;

export const selectFavoriteIds = (state: { favorites: FavoritesState }) => state.favorites.itemIds;
export const selectIsFavoritesOpen = (state: { favorites: FavoritesState }) => state.favorites.isOpen;

export default favoritesSlice.reducer;
