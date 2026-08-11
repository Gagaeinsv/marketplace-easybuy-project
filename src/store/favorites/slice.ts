import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFavorites, addFavoriteApi, removeFavoriteApi } from './operations';

interface FavoritesState {
  itemIds: string[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const getInitialFavoriteIds = (): string[] => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('easybuy_favorite_ids');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
  }
  return [];
};

const initialState: FavoritesState = {
  itemIds: getInitialFavoriteIds(),
  isOpen: false,
  isLoading: false,
  error: null,
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
      if (typeof window !== 'undefined') {
        localStorage.setItem('easybuy_favorite_ids', JSON.stringify(state.itemIds));
      }
    },
    clearFavorites: (state) => {
      state.itemIds = [];
      if (typeof window !== 'undefined') {
        localStorage.removeItem('easybuy_favorite_ids');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Favorites
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.itemIds = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('easybuy_favorite_ids', JSON.stringify(action.payload));
        }
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Error fetching favorites';
      })
      // Add Favorite
      .addCase(addFavoriteApi.fulfilled, (state, action) => {
        state.itemIds = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('easybuy_favorite_ids', JSON.stringify(action.payload));
        }
      })
      // Remove Favorite
      .addCase(removeFavoriteApi.fulfilled, (state, action) => {
        state.itemIds = state.itemIds.filter((id) => id !== action.payload);
        if (typeof window !== 'undefined') {
          localStorage.setItem('easybuy_favorite_ids', JSON.stringify(state.itemIds));
        }
      });
  },
});

export const { toggleFavoritesDrawer, openFavorites, closeFavorites, toggleFavorite, clearFavorites } = favoritesSlice.actions;

export const selectFavoriteIds = (state: { favorites: FavoritesState }) => state.favorites.itemIds;
export const selectIsFavoritesOpen = (state: { favorites: FavoritesState }) => state.favorites.isOpen;
export const selectIsFavoritesLoading = (state: { favorites: FavoritesState }) => state.favorites.isLoading;

export default favoritesSlice.reducer;
